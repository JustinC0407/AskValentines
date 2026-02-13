export function getRandomPosition({
  viewportWidth,
  viewportHeight,
  elementWidth,
  elementHeight,
  margin = 12,
}) {
  const safeMaxX = Math.max(margin, viewportWidth - elementWidth - margin);
  const safeMaxY = Math.max(margin, viewportHeight - elementHeight - margin);
  const minX = margin;
  const minY = margin;

  const x = Math.floor(Math.random() * (safeMaxX - minX + 1)) + minX;
  const y = Math.floor(Math.random() * (safeMaxY - minY + 1)) + minY;

  return { x, y };
}
