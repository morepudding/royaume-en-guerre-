const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const ESCORT_INTEGRITY_CROWN = 70;
export const ESCORT_SPEED_CROWN_SECONDS = 90;

export const ESCORT_RAIDS = Object.freeze([
  Object.freeze({
    id: "crossroad",
    trigger: "moving-to-center",
    sourceId: 6,
    targetId: 3,
    units: 15,
    damage: 16,
    warning: 2.4,
    label: "EMBUSCADE AU RELAIS",
  }),
  Object.freeze({
    id: "rear-switch",
    trigger: "center-reached",
    sourceId: 6,
    fallbackSourceId: 1,
    targetId: 2,
    units: 18,
    damage: 19,
    warning: 2.6,
    label: "LES ORCS BASCULENT À L’ARRIÈRE",
  }),
  Object.freeze({
    id: "final-assault",
    trigger: "last-leg",
    sourceId: 1,
    targetId: 4,
    units: 25,
    damage: 24,
    warning: 3,
    label: "ASSAUT FINAL",
  }),
]);

export function createEscortDirectorState() {
  return {
    fired: {},
    pending: [],
    campNeutralized: false,
    departureAnnounced: false,
    arrivalAnnounced: false,
    finalAnnounced: false,
    nextRaidAfter: 0,
  };
}

export function createEscortRuntime() {
  return {
    caravanIndex: 0,
    caravanProgress: 0,
    caravanHealth: 100,
    caravanStatus: "waiting",
    caravanProtectedUntil: 0,
    caravanLastDamageAt: -1,
    caravanDamageFlash: 0,
    caravanArrivalAt: null,
    caravanArrivalReady: false,
    caravanRouteBrokenEver: false,
    campRepairGranted: false,
    escortDirector: createEscortDirectorState(),
  };
}

const ownerOf = (bases, id) => bases.find((base) => base.id === id)?.owner;

export function isConvoyNearRelay(mission, runtime, relayId) {
  const relayIndex = mission.path?.indexOf(relayId) ?? -1;
  if (relayIndex < 0) return false;
  return (
    relayIndex === runtime.caravanIndex ||
    (relayIndex === runtime.caravanIndex + 1 && runtime.caravanProgress >= 0.18)
  );
}

export function canRaidHitConvoy(mission, runtime, raid, relayId) {
  if (isConvoyNearRelay(mission, runtime, relayId)) return true;
  const relayIndex = mission.path?.indexOf(relayId) ?? -1;
  return raid?.id === "rear-switch" && relayIndex === runtime.caravanIndex - 1;
}

export function advanceEscortConvoy(runtime, mission, bases, deltaSeconds) {
  const next = { ...runtime };
  const path = mission.path || [];
  const finalIndex = Math.max(0, path.length - 1);
  const currentId = path[next.caravanIndex];
  const nextId = path[next.caravanIndex + 1];

  next.caravanHealth = clamp(next.caravanHealth, 0, 100);
  next.caravanDamageFlash = Math.max(
    0,
    (next.caravanDamageFlash || 0) - deltaSeconds * 1.7,
  );

  if (next.caravanHealth <= 0) {
    next.caravanStatus = "destroyed";
    return next;
  }
  if (next.caravanIndex >= finalIndex) {
    next.caravanStatus = "arrived";
    next.caravanProgress = 0;
    return next;
  }

  const currentSafe = ownerOf(bases, currentId) === "humans";
  const nextSafe = ownerOf(bases, nextId) === "humans";
  if (currentSafe && nextSafe) {
    next.caravanStatus = "moving";
    next.caravanProgress += (mission.convoySpeed || 0.056) * deltaSeconds;
    if (next.caravanProgress >= 1) {
      next.caravanIndex += 1;
      next.caravanProgress = 0;
      next.caravanStatus =
        next.caravanIndex >= finalIndex ? "arrived" : "waiting";
    }
  } else if (next.caravanProgress > 0 && currentSafe) {
    // A relay lost mid-crossing makes the convoy visibly fall back along the
    // same curve instead of teleporting or taking invisible damage.
    next.caravanStatus = "retreating";
    next.caravanProgress = Math.max(
      0,
      next.caravanProgress - (mission.convoyRetreatSpeed || 0.085) * deltaSeconds,
    );
    next.caravanRouteBrokenEver = true;
  } else {
    next.caravanStatus = "waiting";
    next.caravanProgress = 0;
    if (!currentSafe) next.caravanRouteBrokenEver = true;
  }
  return next;
}

export function applyEscortDamage(runtime, amount, elapsed) {
  const protectedNow = elapsed < (runtime.caravanProtectedUntil || 0);
  const applied = Math.max(0, amount) * (protectedNow ? 0.35 : 1);
  return {
    runtime: {
      ...runtime,
      caravanHealth: clamp(runtime.caravanHealth - applied, 0, 100),
      caravanLastDamageAt: elapsed,
      caravanDamageFlash: 1,
      caravanRouteBrokenEver: true,
    },
    applied,
    protected: protectedNow,
  };
}

export function applyBannerEscortRescue(runtime, elapsed) {
  const repair = Math.min(22, Math.max(0, 100 - runtime.caravanHealth));
  return {
    ...runtime,
    caravanHealth: clamp(runtime.caravanHealth + repair, 0, 100),
    caravanProtectedUntil: Math.max(runtime.caravanProtectedUntil || 0, elapsed + 8),
    bannerRepair: repair,
  };
}

function triggerReached(raid, runtime, elapsed) {
  switch (raid.trigger) {
    case "moving-to-center":
      return runtime.caravanIndex >= 1 && runtime.caravanProgress >= 0.22;
    case "center-reached":
      return runtime.caravanIndex >= 2 || elapsed >= 48;
    case "last-leg":
      return runtime.caravanIndex >= 3 && runtime.caravanProgress >= 0.12;
    default:
      return false;
  }
}

export function advanceEscortDirector(state, context) {
  const { mission, runtime, bases, elapsed } = context;
  const next = {
    ...state,
    fired: { ...state.fired },
    pending: state.pending.map((event) => ({ ...event })),
  };
  const events = [];
  const campNeutralized = ownerOf(bases, mission.campId ?? 6) !== "orcs";

  if (
    ownerOf(bases, mission.path?.[1]) === "humans" &&
    !next.departureAnnounced
  ) {
    next.departureAnnounced = true;
    events.push({ type: "departure" });
  }

  if (campNeutralized && !next.campNeutralized) {
    next.campNeutralized = true;
    next.pending = next.pending.map((raid) => ({
      ...raid,
      units: Math.max(5, Math.ceil(raid.units * 0.45)),
      damage: Math.max(6, Math.ceil(raid.damage * 0.55)),
    }));
    events.push({ type: "camp-neutralized", repair: 18 });
  }

  const canScheduleRaid =
    next.pending.length === 0 && elapsed >= (next.nextRaidAfter || 0);
  for (const raid of ESCORT_RAIDS) {
    if (!canScheduleRaid) break;
    if (next.fired[raid.id] || !triggerReached(raid, runtime, elapsed)) continue;
    const weakened = next.campNeutralized;
    const sourceAvailable = ownerOf(bases, raid.sourceId) === "orcs";
    const sourceId = sourceAvailable ? raid.sourceId : raid.fallbackSourceId;
    if (sourceId == null || ownerOf(bases, sourceId) !== "orcs") continue;

    const scheduled = {
      ...raid,
      sourceId,
      units: weakened ? Math.max(6, Math.ceil(raid.units * 0.58)) : raid.units,
      damage: weakened ? Math.max(7, Math.ceil(raid.damage * 0.62)) : raid.damage,
      executeAt: elapsed + Math.max(1.5, raid.warning),
    };
    next.fired[raid.id] = true;
    next.pending.push(scheduled);
    if (raid.id === "final-assault") next.finalAnnounced = true;
    events.push({ type: "telegraph", raid: scheduled });
    break;
  }

  const remaining = [];
  for (const raid of next.pending) {
    if (elapsed >= raid.executeAt) {
      events.push({ type: "launch-raid", raid });
      next.nextRaidAfter = Math.max(next.nextRaidAfter || 0, elapsed + 5.5);
    }
    else remaining.push(raid);
  }
  next.pending = remaining;

  if (runtime.caravanStatus === "arrived" && !next.arrivalAnnounced) {
    next.arrivalAnnounced = true;
    events.push({ type: "arrival" });
  }

  return { state: next, events };
}
