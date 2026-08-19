import test from "node:test";
import assert from "node:assert/strict";

import {
  ESCORT_INTEGRITY_CROWN,
  ESCORT_SPEED_CROWN_SECONDS,
  advanceEscortConvoy,
  advanceEscortDirector,
  applyBannerEscortRescue,
  applyEscortDamage,
  canRaidHitConvoy,
  createEscortDirectorState,
  createEscortRuntime,
} from "../app/game/escort-director.mjs";
import {
  getRoadCurve,
  getDirectedRoadCurve,
  pointOnRoad,
  tangentOnRoad,
} from "../app/game/route-geometry.mjs";

const mission = {
  id: 7,
  mode: "escort",
  path: [0, 2, 3, 4, 5],
  campId: 6,
  convoySpeed: 0.056,
};
const bases = (owners = {}) =>
  [0, 1, 2, 3, 4, 5, 6].map((id) => ({
    id,
    owner: owners[id] || (id === 0 ? "humans" : id === 1 || id === 6 ? "orcs" : "neutral"),
  }));

test("convoy waits for a secured relay and never loses invisible integrity", () => {
  const initial = createEscortRuntime();
  const waiting = advanceEscortConvoy(initial, mission, bases(), 12);
  assert.equal(waiting.caravanProgress, 0);
  assert.equal(waiting.caravanStatus, "waiting");
  assert.equal(waiting.caravanHealth, 100);

  const moving = advanceEscortConvoy(
    initial,
    mission,
    bases({ 2: "humans" }),
    5,
  );
  assert.equal(moving.caravanStatus, "moving");
  assert.ok(moving.caravanProgress > 0);
  assert.equal(moving.caravanHealth, 100);
});

test("a lost next relay makes the convoy retreat on its segment without damage", () => {
  const runtime = { ...createEscortRuntime(), caravanProgress: 0.6 };
  const next = advanceEscortConvoy(runtime, mission, bases(), 1);
  assert.equal(next.caravanStatus, "retreating");
  assert.ok(next.caravanProgress < 0.6 && next.caravanProgress > 0);
  assert.equal(next.caravanHealth, 100);
});

test("visible raid damage is clamped and the banner gives a bounded recovery", () => {
  const runtime = { ...createEscortRuntime(), caravanHealth: 31 };
  const hit = applyEscortDamage(runtime, 14, 22);
  assert.equal(hit.runtime.caravanHealth, 17);
  const rescued = applyBannerEscortRescue(hit.runtime, 24);
  assert.equal(rescued.caravanHealth, 39);
  assert.equal(rescued.caravanProtectedUntil, 32);

  const shielded = applyEscortDamage(rescued, 20, 27);
  assert.equal(shielded.protected, true);
  assert.equal(shielded.runtime.caravanHealth, 32);
  assert.equal(applyEscortDamage(shielded.runtime, 999, 40).runtime.caravanHealth, 0);
});

test("the axis-switch raid can hurt the convoy from the last crossed relay", () => {
  const runtime = { ...createEscortRuntime(), caravanIndex: 2 };
  assert.equal(
    canRaidHitConvoy(mission, runtime, { id: "rear-switch" }, 2),
    true,
  );
  assert.equal(canRaidHitConvoy(mission, runtime, { id: "crossroad" }, 2), false);
});

test("ambushes are telegraphed once for at least 1.5 seconds then launched once", () => {
  const runtime = {
    ...createEscortRuntime(),
    caravanIndex: 1,
    caravanProgress: 0.3,
  };
  let result = advanceEscortDirector(createEscortDirectorState(), {
    mission,
    runtime,
    bases: bases({ 2: "humans" }),
    elapsed: 20,
  });
  const warning = result.events.find((event) => event.type === "telegraph");
  assert.ok(warning);
  assert.ok(warning.raid.executeAt - 20 >= 1.5);

  result = advanceEscortDirector(result.state, {
    mission,
    runtime,
    bases: bases({ 2: "humans" }),
    elapsed: warning.raid.executeAt + 0.01,
  });
  assert.equal(result.events.filter((event) => event.type === "launch-raid").length, 1);
  const after = advanceEscortDirector(result.state, {
    mission,
    runtime,
    bases: bases({ 2: "humans" }),
    elapsed: warning.raid.executeAt + 8,
  });
  assert.equal(after.events.filter((event) => event.type === "launch-raid").length, 0);
});

test("the director never stacks multiple scripted warnings", () => {
  const advanced = {
    ...createEscortRuntime(),
    caravanIndex: 3,
    caravanProgress: 0.3,
  };
  const first = advanceEscortDirector(createEscortDirectorState(), {
    mission,
    runtime: advanced,
    bases: bases({ 2: "humans", 3: "humans", 4: "humans" }),
    elapsed: 70,
  });
  assert.equal(first.events.filter((event) => event.type === "telegraph").length, 1);
  assert.equal(first.state.pending.length, 1);

  const dueAt = first.state.pending[0].executeAt;
  const launched = advanceEscortDirector(first.state, {
    mission,
    runtime: advanced,
    bases: bases({ 2: "humans", 3: "humans", 4: "humans" }),
    elapsed: dueAt + 0.01,
  });
  assert.equal(launched.events.filter((event) => event.type === "launch-raid").length, 1);
  assert.equal(launched.events.filter((event) => event.type === "telegraph").length, 0);

  const cooldown = advanceEscortDirector(launched.state, {
    mission,
    runtime: advanced,
    bases: bases({ 2: "humans", 3: "humans", 4: "humans" }),
    elapsed: dueAt + 3,
  });
  assert.equal(cooldown.events.filter((event) => event.type === "telegraph").length, 0);
});

test("all three scenario raids fire exactly once in deterministic order", () => {
  let state = createEscortDirectorState();
  const raidIds = [];
  const phases = [
    { caravanIndex: 1, caravanProgress: 0.3 },
    { caravanIndex: 2, caravanProgress: 0 },
    { caravanIndex: 3, caravanProgress: 0.2 },
  ];
  let elapsed = 20;

  for (const phase of phases) {
    const runtime = { ...createEscortRuntime(), ...phase };
    const warned = advanceEscortDirector(state, {
      mission,
      runtime,
      bases: bases({ 2: "humans", 3: "humans", 4: "humans" }),
      elapsed,
    });
    const warning = warned.events.find((event) => event.type === "telegraph");
    assert.ok(warning);
    assert.ok(warning.raid.executeAt - elapsed >= 1.5);
    raidIds.push(warning.raid.id);

    const launched = advanceEscortDirector(warned.state, {
      mission,
      runtime,
      bases: bases({ 2: "humans", 3: "humans", 4: "humans" }),
      elapsed: warning.raid.executeAt + 0.01,
    });
    assert.equal(
      launched.events.filter((event) => event.type === "launch-raid").length,
      1,
    );
    state = launched.state;
    elapsed = state.nextRaidAfter + 0.01;
  }

  assert.deepEqual(raidIds, ["crossroad", "rear-switch", "final-assault"]);
  const exhausted = advanceEscortDirector(state, {
    mission,
    runtime: { ...createEscortRuntime(), caravanIndex: 4 },
    bases: bases({ 2: "humans", 3: "humans", 4: "humans", 5: "humans" }),
    elapsed: elapsed + 30,
  });
  assert.equal(exhausted.events.some((event) => event.type === "telegraph"), false);
});

test("neutralizing the camp weakens pending and future raids and repairs once", () => {
  const runtime = {
    ...createEscortRuntime(),
    caravanIndex: 1,
    caravanProgress: 0.3,
  };
  const armed = advanceEscortDirector(createEscortDirectorState(), {
    mission,
    runtime,
    bases: bases({ 2: "humans" }),
    elapsed: 20,
  });
  const originalUnits = armed.state.pending[0].units;
  const neutralized = advanceEscortDirector(armed.state, {
    mission,
    runtime,
    bases: bases({ 2: "humans", 6: "humans" }),
    elapsed: 20.4,
  });
  assert.equal(
    neutralized.events.filter((event) => event.type === "camp-neutralized").length,
    1,
  );
  assert.ok(neutralized.state.pending[0].units < originalUnits);
  const repeated = advanceEscortDirector(neutralized.state, {
    mission,
    runtime,
    bases: bases({ 2: "humans", 6: "humans" }),
    elapsed: 20.8,
  });
  assert.equal(
    repeated.events.filter((event) => event.type === "camp-neutralized").length,
    0,
  );
});

test("shared quadratic road geometry preserves endpoints and direction", () => {
  const from = { id: 2, x: 0.2, y: 0.7 };
  const to = { id: 3, x: 0.8, y: 0.3 };
  const curve = getRoadCurve(from, to);
  assert.deepEqual(pointOnRoad(curve, 0), { x: 0.2, y: 0.7 });
  assert.deepEqual(pointOnRoad(curve, 1), { x: 0.8, y: 0.3 });
  const middle = pointOnRoad(curve, 0.5);
  assert.ok(middle.x > 0.2 && middle.x < 0.8);
  const tangent = tangentOnRoad(curve, 0.5);
  assert.ok(tangent.x > 0);
  const reverse = getDirectedRoadCurve([[2, 3]], [from, to], 3, 2);
  assert.deepEqual(pointOnRoad(reverse, 0), { x: 0.8, y: 0.3 });
  assert.deepEqual(pointOnRoad(reverse, 1), { x: 0.2, y: 0.7 });
});

test("escort crown thresholds remain explicit constants", () => {
  assert.equal(ESCORT_INTEGRITY_CROWN, 70);
  assert.equal(ESCORT_SPEED_CROWN_SECONDS, 90);
});
