/**
 * Pure campaign rules shared by the battle loop and Node tests.
 *
 * The functions in this module deliberately avoid React, browser APIs and
 * mutation so a frame can ask for a decision without changing game state.
 */

import {
  ESCORT_INTEGRITY_CROWN,
  ESCORT_SPEED_CROWN_SECONDS,
} from "./escort-director.mjs";

export const CROWN_IDS = Object.freeze(["victory", "secondary", "mastery"]);

const EMPTY_CROWN_SET = Object.freeze({
  victory: false,
  secondary: false,
  mastery: false,
});

const bool = (value) => value === true || value === 1 || value === "true";

/**
 * Accepts the legacy numeric format (0–3), the new keyed format, or an array.
 * Legacy counts are expanded in their historical order: victory, secondary,
 * mastery. A fresh object is always returned.
 */
export function normalizeCrownSet(value) {
  if (Number.isFinite(value)) {
    const count = Math.max(0, Math.min(3, Math.floor(value)));
    return {
      victory: count >= 1,
      secondary: count >= 2,
      mastery: count >= 3,
    };
  }

  if (Array.isArray(value)) {
    return {
      victory: bool(value[0]),
      secondary: bool(value[1]),
      mastery: bool(value[2]),
    };
  }

  if (value && typeof value === "object") {
    return {
      victory: bool(value.victory ?? value.win ?? value[0]),
      secondary: bool(
        value.secondary ?? value.speed ?? value.objective ?? value[1],
      ),
      mastery: bool(value.mastery ?? value.control ?? value[2]),
    };
  }

  return { ...EMPTY_CROWN_SET };
}

export function countCrowns(value) {
  const crowns = normalizeCrownSet(value);
  return CROWN_IDS.reduce((count, id) => count + Number(crowns[id]), 0);
}

/** Keep every crown earned across separate attempts. */
export function mergeCrownSets(previous, earned) {
  const oldCrowns = normalizeCrownSet(previous);
  const newCrowns = normalizeCrownSet(earned);
  return Object.fromEntries(
    CROWN_IDS.map((id) => [id, oldCrowns[id] || newCrowns[id]]),
  );
}

/** Normalize the complete localStorage `crowns` record mission by mission. */
export function normalizeCrownProgress(value, maxMission = 15) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const normalized = {};
  for (const [rawId, crowns] of Object.entries(value)) {
    const missionId = Number(rawId);
    if (
      !Number.isInteger(missionId) ||
      missionId < 1 ||
      missionId > maxMission
    )
      continue;
    normalized[missionId] = normalizeCrownSet(crowns);
  }
  return normalized;
}

const crown = (id, label, shortLabel) => ({ id, label, shortLabel });

/** Labels displayed before and after a mission. */
export function getCrownDefinitions(mission) {
  const victory = crown("victory", "Remporter la bataille", "VICTOIRE");

  switch (mission?.mode) {
    case "defense":
      return [
        victory,
        crown(
          "secondary",
          "Garder au moins 20 soldats dans la porte à l’aube",
          "GARDE",
        ),
        crown("mastery", "Ne perdre aucune position", "MAÎTRISE"),
      ];
    case "escort":
      return [
        victory,
        crown(
          "secondary",
          `Livrer le convoi avec au moins ${ESCORT_INTEGRITY_CROWN} % d’intégrité`,
          "INTÉGRITÉ",
        ),
        crown(
          "mastery",
          `Atteindre la sortie avant ${formatPar(ESCORT_SPEED_CROWN_SECONDS)}`,
          "RAPIDITÉ",
        ),
      ];
    case "evacuation":
      return [
        victory,
        crown(
          "secondary",
          `Évacuer avant ${formatPar(mission?.par)}`,
          "RAPIDITÉ",
        ),
        crown("mastery", "Conserver la forteresse de sortie", "SORTIE"),
      ];
    case "betrayal":
      return [
        victory,
        crown(
          "secondary",
          `Vaincre avant ${formatPar(mission?.par)}`,
          "RAPIDITÉ",
        ),
        crown("mastery", "Reprendre la garnison traîtresse", "JUSTICE"),
      ];
    case "dawn":
      return [
        victory,
        crown("secondary", "Recevoir l’Armée de l’Aube", "PRÉPARATION"),
        crown("mastery", "Ne perdre aucune position", "MAÎTRISE"),
      ];
    default:
      return [
        victory,
        crown(
          "secondary",
          `Terminer avant ${formatPar(mission?.par)}`,
          "RAPIDITÉ",
        ),
        crown("mastery", "Ne perdre aucune position", "MAÎTRISE"),
      ];
  }
}

function formatPar(seconds) {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const minutes = Math.floor(total / 60);
  const remainder = String(total % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function ownerOf(bases, id) {
  return bases?.find((base) => base?.id === id)?.owner;
}

function baseById(bases, id) {
  return bases?.find((base) => base?.id === id);
}

/**
 * A faction remains alive while it owns a valid position or has an army on a
 * road. Invulnerable enemy sources do not keep the Horde alive for ordinary
 * elimination rules; scenario modes handle their protected objectives.
 */
export function hasFactionPresence(
  faction,
  bases = [],
  armies = [],
  { includeInvulnerable = faction !== "orcs" } = {},
) {
  return (
    bases.some(
      (base) =>
        base?.owner === faction && (includeInvulnerable || !base.invulnerable),
    ) || armies.some((army) => army?.owner === faction)
  );
}

/**
 * Return "won", "lost", or null when play must continue.
 *
 * Event missions explicitly gate victory on their mandatory event. This makes
 * defeating the initial Orc positions early a valid tactic without bypassing
 * the betrayal, dawn reinforcement, or seal sequence.
 */
export function evaluateMissionOutcome({
  mission,
  runtime = {},
  bases = [],
  armies = [],
  elapsed = 0,
} = {}) {
  if (!mission) return null;

  const humansAlive = hasFactionPresence("humans", bases, armies);
  const orcsAlive = hasFactionPresence("orcs", bases, armies);
  const targetId = mission.target ?? (mission.mode === "boss" ? 1 : 0);

  switch (mission.mode) {
    case "defense":
      if (ownerOf(bases, targetId) !== "humans") return "lost";
      return elapsed >= (mission.duration ?? 75) ? "won" : null;

    case "escort": {
      const pathLength = mission.path?.length ?? 0;
      if (runtime.caravanDestroyed || Number(runtime.caravanHealth) <= 0)
        return "lost";
      if (
        pathLength > 0 &&
        runtime.caravanIndex >= pathLength - 1 &&
        runtime.caravanStatus === "arrived"
      )
        return runtime.caravanArrivalReady === true ? "won" : null;
      return humansAlive ? null : "lost";
    }

    case "evacuation":
      if ((runtime.evacuated ?? 0) >= (mission.target ?? 70)) return "won";
      return humansAlive ? null : "lost";

    case "relic":
      if ((runtime.humanScore ?? 0) >= (mission.target ?? 100)) return "won";
      if ((runtime.orcScore ?? 0) >= (mission.target ?? 100)) return "lost";
      return humansAlive ? null : "lost";

    case "boss":
      if (
        ownerOf(bases, targetId) !== "orcs" &&
        (mission.specialIds?.every((id) => ownerOf(bases, id) !== "orcs") ??
          true)
      )
        return "won";
      return humansAlive ? null : "lost";

    case "bridge":
      if (!humansAlive) return "lost";
      return (runtime.bridge ?? 0) >= (mission.target ?? 40) && !orcsAlive
        ? "won"
        : null;

    case "seals":
      if (!humansAlive) return "lost";
      return runtime.sealsOpened && ownerOf(bases, targetId) !== "orcs"
        ? "won"
        : null;

    case "betrayal":
      if (!humansAlive) return "lost";
      return runtime.betrayalDone && !orcsAlive ? "won" : null;

    case "dawn":
      if (!humansAlive) return "lost";
      return runtime.dawnDone && !orcsAlive ? "won" : null;

    case "conquest":
    case "fog":
    default:
      if (!humansAlive) return "lost";
      return orcsAlive ? null : "won";
  }
}

/** Evaluate this attempt's three crowns without assuming they are sequential. */
export function evaluateMissionCrowns({
  mission,
  runtime = {},
  bases = [],
  elapsed = 0,
  outcome,
} = {}) {
  if (outcome !== "won" || !mission) return { ...EMPTY_CROWN_SET };

  const targetId = mission.target ?? 0;
  let secondary = false;
  let mastery = false;

  switch (mission.mode) {
    case "defense":
      secondary =
        ownerOf(bases, targetId) === "humans" &&
        (baseById(bases, targetId)?.units ?? 0) >= 20;
      mastery = !runtime.lostHumanBase;
      break;
    case "escort": {
      const health = Number.isFinite(runtime.caravanHealth)
        ? runtime.caravanHealth
        : 100;
      secondary = health >= ESCORT_INTEGRITY_CROWN;
      mastery = elapsed <= ESCORT_SPEED_CROWN_SECONDS;
      break;
    }
    case "evacuation": {
      secondary = elapsed <= (mission.par ?? Number.POSITIVE_INFINITY);
      const exitId = mission.specialIds?.[0];
      mastery = exitId != null && ownerOf(bases, exitId) === "humans";
      break;
    }
    case "betrayal": {
      secondary = elapsed <= (mission.par ?? Number.POSITIVE_INFINITY);
      mastery =
        runtime.betrayedBaseId != null &&
        ownerOf(bases, runtime.betrayedBaseId) === "humans";
      break;
    }
    case "dawn":
      secondary =
        runtime.dawnReinforcement === "humans" || runtime.dawnPrepared === true;
      mastery = !runtime.lostHumanBase;
      break;
    default:
      secondary = elapsed <= (mission.par ?? Number.POSITIVE_INFINITY);
      mastery = !runtime.lostHumanBase;
  }

  return { victory: true, secondary: Boolean(secondary), mastery: Boolean(mastery) };
}
