/**
 * Shared quadratic road geometry.
 *
 * Every moving or rendered road actor must use this module so painted paths,
 * armies, warnings, supplies and the royal convoy cannot drift apart.
 */

const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));

export function getRoadCurve(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.max(Math.hypot(dx, dy), 0.0001);
  const direction = ((17 * Number(from.id) + 31 * Number(to.id)) % 3) - 1;
  const bend = direction * Math.min(0.032, length * 0.12);

  return {
    start: { x: from.x, y: from.y },
    control: {
      x: (from.x + to.x) / 2 - (dy / length) * bend,
      y: (from.y + to.y) / 2 + (dx / length) * bend,
    },
    end: { x: to.x, y: to.y },
  };
}

export function getDirectedRoadCurve(roads, bases, fromId, toId) {
  const edge = roads.find(
    ([from, to]) =>
      (from === fromId && to === toId) || (from === toId && to === fromId),
  );
  const from = bases.find((base) => base.id === fromId);
  const to = bases.find((base) => base.id === toId);
  if (!edge || !from || !to) return null;

  const edgeFrom = bases.find((base) => base.id === edge[0]);
  const edgeTo = bases.find((base) => base.id === edge[1]);
  const curve = getRoadCurve(edgeFrom, edgeTo);
  if (edge[0] === fromId) return curve;
  return { start: curve.end, control: curve.control, end: curve.start };
}

export function pointOnRoad(curve, progress) {
  const t = clamp01(progress);
  const inverse = 1 - t;
  return {
    x:
      inverse * inverse * curve.start.x +
      2 * inverse * t * curve.control.x +
      t * t * curve.end.x,
    y:
      inverse * inverse * curve.start.y +
      2 * inverse * t * curve.control.y +
      t * t * curve.end.y,
  };
}

export function tangentOnRoad(curve, progress) {
  const t = clamp01(progress);
  return {
    x:
      2 * (1 - t) * (curve.control.x - curve.start.x) +
      2 * t * (curve.end.x - curve.control.x),
    y:
      2 * (1 - t) * (curve.control.y - curve.start.y) +
      2 * t * (curve.end.y - curve.control.y),
  };
}

export function roadLength(curve, steps = 12) {
  let length = 0;
  let previous = curve.start;
  for (let step = 1; step <= steps; step++) {
    const point = pointOnRoad(curve, step / steps);
    length += Math.hypot(point.x - previous.x, point.y - previous.y);
    previous = point;
  }
  return length;
}

export function canvasRoadCurve(curve, layout) {
  const project = (point) => ({
    x: layout.left + point.x * layout.width,
    y: layout.top + point.y * layout.height,
  });
  return {
    start: project(curve.start),
    control: project(curve.control),
    end: project(curve.end),
  };
}
