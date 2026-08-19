import test from "node:test";
import assert from "node:assert/strict";

import {
  countCrowns,
  evaluateMissionCrowns,
  evaluateMissionOutcome,
  getCrownDefinitions,
  mergeCrownSets,
  normalizeCrownProgress,
  normalizeCrownSet,
} from "../app/game/mission-rules.mjs";

const base = (id, owner, extra = {}) => ({ id, owner, units: 20, ...extra });

test("legacy crown counts normalize without losing progress", () => {
  assert.deepEqual(normalizeCrownSet(0), {
    victory: false,
    secondary: false,
    mastery: false,
  });
  assert.deepEqual(normalizeCrownSet(2), {
    victory: true,
    secondary: true,
    mastery: false,
  });
  assert.deepEqual(normalizeCrownProgress({ 1: 3, 6: 1, nope: 3 }), {
    1: { victory: true, secondary: true, mastery: true },
    6: { victory: true, secondary: false, mastery: false },
  });
});

test("new crown objects remain independent and merge across attempts", () => {
  const firstAttempt = { victory: true, secondary: false, mastery: true };
  const secondAttempt = { victory: true, secondary: true, mastery: false };

  assert.equal(countCrowns(firstAttempt), 2);
  assert.deepEqual(mergeCrownSets(firstAttempt, secondAttempt), {
    victory: true,
    secondary: true,
    mastery: true,
  });
  assert.deepEqual(mergeCrownSets(1, { mastery: true }), {
    victory: true,
    secondary: false,
    mastery: true,
  });
  assert.deepEqual(normalizeCrownSet({ win: true, speed: true }), {
    victory: true,
    secondary: true,
    mastery: false,
  });
});

test("crown labels are scenario-specific", () => {
  assert.match(
    getCrownDefinitions({ mode: "defense", par: 75 })[1].label,
    /20 soldats/,
  );
  assert.match(
    getCrownDefinitions({ mode: "escort", par: 95 })[1].label,
    /70 % d’intégrité/,
  );
  assert.match(
    getCrownDefinitions({ mode: "escort", par: 95 })[2].label,
    /1:30/,
  );
  assert.match(
    getCrownDefinitions({ mode: "betrayal", par: 125 })[2].label,
    /traîtresse/,
  );
  assert.match(
    getCrownDefinitions({ mode: "conquest", par: 58 })[1].label,
    /0:58/,
  );
});

test("conquest and fog use explicit force elimination", () => {
  const humans = [base(0, "humans")];
  const contested = [...humans, base(1, "orcs")];

  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "conquest" },
      bases: humans,
      armies: [{ owner: "orcs", from: 1, to: 0 }],
    }),
    null,
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "conquest" },
      bases: contested,
    }),
    null,
  );
  assert.equal(
    evaluateMissionOutcome({ mission: { mode: "fog" }, bases: humans }),
    "won",
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "conquest" },
      bases: [base(1, "orcs")],
    }),
    "lost",
  );
});

test("defense wins on time and loses as soon as the gate falls", () => {
  const mission = { mode: "defense", target: 0, duration: 75 };

  assert.equal(
    evaluateMissionOutcome({
      mission,
      bases: [base(0, "humans"), base(1, "orcs")],
      elapsed: 74.9,
    }),
    null,
  );
  assert.equal(
    evaluateMissionOutcome({
      mission,
      bases: [base(0, "humans"), base(1, "orcs")],
      elapsed: 75,
    }),
    "won",
  );
  assert.equal(
    evaluateMissionOutcome({
      mission,
      bases: [base(0, "orcs")],
      elapsed: 12,
    }),
    "lost",
  );
});

test("escort cannot softlock after the player is eliminated", () => {
  const mission = { mode: "escort", path: [0, 2, 3] };

  assert.equal(
    evaluateMissionOutcome({
      mission,
      runtime: {
        caravanIndex: 2,
        caravanHealth: 40,
        caravanStatus: "arrived",
        caravanArrivalReady: true,
      },
      bases: [base(3, "humans")],
    }),
    "won",
  );
  assert.equal(
    evaluateMissionOutcome({
      mission,
      runtime: {
        caravanIndex: 2,
        caravanHealth: 80,
        caravanStatus: "arrived",
        caravanArrivalReady: false,
      },
      bases: [base(3, "orcs")],
    }),
    null,
  );
  assert.equal(
    evaluateMissionOutcome({
      mission,
      runtime: { caravanIndex: 1, caravanHealth: 0 },
      bases: [base(2, "humans")],
    }),
    "lost",
  );
  assert.equal(
    evaluateMissionOutcome({
      mission,
      runtime: { caravanIndex: 1, caravanHealth: 80 },
      bases: [base(1, "orcs")],
    }),
    "lost",
  );
});

test("evacuation and relic have explicit success and failure thresholds", () => {
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "evacuation", target: 70 },
      runtime: { evacuated: 70 },
      bases: [base(6, "humans")],
    }),
    "won",
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "evacuation", target: 70 },
      runtime: { evacuated: 65 },
      bases: [base(1, "orcs")],
    }),
    "lost",
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "relic", target: 100 },
      runtime: { humanScore: 100, orcScore: 99 },
      bases: [base(0, "humans")],
    }),
    "won",
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "relic", target: 100 },
      runtime: { humanScore: 99, orcScore: 100 },
      bases: [base(0, "humans")],
    }),
    "lost",
  );
});

test("boss and bridge objectives cannot be bypassed", () => {
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "boss", target: 1, specialIds: [3, 4, 5] },
      bases: [
        base(0, "humans"),
        base(1, "humans"),
        base(3, "orcs"),
        base(4, "humans"),
        base(5, "humans"),
      ],
    }),
    null,
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "boss", target: 1, specialIds: [3, 4, 5] },
      bases: [
        base(0, "humans"),
        base(1, "humans"),
        base(3, "humans"),
        base(4, "humans"),
        base(5, "humans"),
      ],
    }),
    "won",
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "bridge", target: 40 },
      runtime: { bridge: 39 },
      bases: [base(0, "humans")],
    }),
    null,
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "bridge", target: 40 },
      runtime: { bridge: 40 },
      bases: [base(0, "humans"), base(1, "orcs")],
    }),
    null,
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "bridge", target: 40 },
      runtime: { bridge: 40 },
      bases: [base(0, "humans")],
    }),
    "won",
  );
});

test("seals, betrayal, and dawn gate victory on mandatory events", () => {
  const humansOnly = [base(0, "humans")];

  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "seals", target: 1 },
      runtime: { sealsOpened: false },
      bases: [...humansOnly, base(1, "orcs", { invulnerable: true })],
    }),
    null,
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "seals", target: 1 },
      runtime: { sealsOpened: true },
      bases: [...humansOnly, base(1, "humans")],
    }),
    "won",
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "betrayal" },
      runtime: { betrayalDone: false },
      bases: humansOnly,
    }),
    null,
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "betrayal" },
      runtime: { betrayalDone: true },
      bases: humansOnly,
    }),
    "won",
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "dawn" },
      runtime: { dawnDone: false },
      bases: humansOnly,
    }),
    null,
  );
  assert.equal(
    evaluateMissionOutcome({
      mission: { mode: "dawn" },
      runtime: { dawnDone: true },
      bases: humansOnly,
    }),
    "won",
  );
});

test("defense crowns replace the impossible speed condition", () => {
  assert.deepEqual(
    evaluateMissionCrowns({
      mission: { mode: "defense", target: 0, par: 75 },
      runtime: { lostHumanBase: false },
      bases: [base(0, "humans", { units: 23 })],
      elapsed: 75.5,
      outcome: "won",
    }),
    { victory: true, secondary: true, mastery: true },
  );
});

test("escort integrity and speed crowns are independent", () => {
  const integrityAttempt = evaluateMissionCrowns({
      mission: { mode: "escort", path: [0, 2, 3] },
      runtime: { caravanHealth: 72 },
      bases: [base(0, "humans"), base(2, "humans"), base(3, "humans")],
      elapsed: 94,
      outcome: "won",
    });
  const speedAttempt = evaluateMissionCrowns({
      mission: { mode: "escort", path: [0, 2, 3] },
      runtime: { caravanHealth: 58 },
      bases: [base(0, "humans"), base(2, "humans"), base(3, "humans")],
      elapsed: 86,
      outcome: "won",
    });
  assert.deepEqual(integrityAttempt, {
    victory: true,
    secondary: true,
    mastery: false,
  });
  assert.deepEqual(speedAttempt, {
    victory: true,
    secondary: false,
    mastery: true,
  });
  assert.deepEqual(mergeCrownSets(integrityAttempt, speedAttempt), {
    victory: true,
    secondary: true,
    mastery: true,
  });
});

test("escort, evacuation, betrayal, and dawn crowns use their own state", () => {
  assert.deepEqual(
    evaluateMissionCrowns({
      mission: { mode: "evacuation", par: 100, specialIds: [6] },
      bases: [base(6, "orcs")],
      elapsed: 90,
      outcome: "won",
    }),
    { victory: true, secondary: true, mastery: false },
  );
  assert.deepEqual(
    evaluateMissionCrowns({
      mission: { mode: "betrayal", par: 125 },
      runtime: { betrayedBaseId: 3 },
      bases: [base(3, "humans")],
      elapsed: 130,
      outcome: "won",
    }),
    { victory: true, secondary: false, mastery: true },
  );
  assert.deepEqual(
    evaluateMissionCrowns({
      mission: { mode: "dawn" },
      runtime: { dawnReinforcement: "humans", lostHumanBase: true },
      bases: [base(0, "humans")],
      outcome: "won",
    }),
    { victory: true, secondary: true, mastery: false },
  );
});

test("a lost battle never awards crowns", () => {
  assert.deepEqual(
    evaluateMissionCrowns({
      mission: { mode: "conquest", par: 45 },
      runtime: { lostHumanBase: false },
      elapsed: 12,
      outcome: "lost",
    }),
    { victory: false, secondary: false, mastery: false },
  );
});
