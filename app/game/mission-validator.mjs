export function validateMissionDefinitions(missions) {
  const errors = [];
  const missionIds = new Set();

  for (const [index, mission] of (missions || []).entries()) {
    const prefix = `mission ${mission?.id ?? index + 1}`;
    if (!Number.isInteger(mission?.id)) errors.push(`${prefix}: invalid id`);
    else if (missionIds.has(mission.id)) errors.push(`${prefix}: duplicate id`);
    else missionIds.add(mission.id);
    if (mission?.id !== index + 1)
      errors.push(`${prefix}: id does not match campaign index ${index + 1}`);

    const baseIds = new Set();
    for (const base of mission?.bases || []) {
      if (!Number.isInteger(base?.id)) errors.push(`${prefix}: invalid base id`);
      else if (baseIds.has(base.id))
        errors.push(`${prefix}: duplicate base ${base.id}`);
      else baseIds.add(base.id);
    }

    for (const road of mission?.roads || []) {
      if (
        !Array.isArray(road) ||
        road.length !== 2 ||
        !baseIds.has(road[0]) ||
        !baseIds.has(road[1]) ||
        road[0] === road[1]
      )
        errors.push(`${prefix}: invalid road ${JSON.stringify(road)}`);
    }

    for (const [field, ids] of [
      ["path", mission?.path],
      ["specialIds", mission?.specialIds],
    ]) {
      for (const id of ids || [])
        if (!baseIds.has(id)) errors.push(`${prefix}: ${field} references ${id}`);
    }
    const targetIsBaseId = ["defense", "boss", "seals"].includes(mission?.mode);
    if (targetIsBaseId && mission?.target != null && !baseIds.has(mission.target))
      errors.push(`${prefix}: target references ${mission.target}`);
    if (mission?.campId != null && !baseIds.has(mission.campId))
      errors.push(`${prefix}: campId references ${mission.campId}`);

    const connected = new Set(
      (mission?.roads || []).flatMap(([from, to]) => [`${from}:${to}`, `${to}:${from}`]),
    );
    for (let pathIndex = 1; pathIndex < (mission?.path?.length || 0); pathIndex++) {
      const from = mission.path[pathIndex - 1];
      const to = mission.path[pathIndex];
      if (!connected.has(`${from}:${to}`))
        errors.push(`${prefix}: path segment ${from}-${to} has no road`);
    }
  }

  return errors;
}
