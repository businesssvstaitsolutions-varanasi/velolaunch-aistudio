export function advanceMarqueeOffset(
  currentOffset: number,
  elapsedMilliseconds: number,
  cycleWidth: number,
  pixelsPerSecond: number,
) {
  if (!Number.isFinite(cycleWidth) || cycleWidth <= 0) return 0;
  if (!Number.isFinite(elapsedMilliseconds) || elapsedMilliseconds <= 0) return currentOffset;
  if (!Number.isFinite(pixelsPerSecond) || pixelsPerSecond <= 0) return currentOffset;

  const travelled = Math.abs(currentOffset) + (elapsedMilliseconds / 1000) * pixelsPerSecond;
  const wrappedDistance = travelled % cycleWidth;

  return wrappedDistance === 0 ? 0 : -wrappedDistance;
}

export function advanceMarqueeScrollPosition(
  currentScrollLeft: number,
  elapsedMilliseconds: number,
  cycleWidth: number,
  pixelsPerSecond: number,
) {
  if (!Number.isFinite(cycleWidth) || cycleWidth <= 0) return 0;
  if (!Number.isFinite(elapsedMilliseconds) || elapsedMilliseconds <= 0) return currentScrollLeft;
  if (!Number.isFinite(pixelsPerSecond) || pixelsPerSecond <= 0) return currentScrollLeft;

  return (currentScrollLeft + (elapsedMilliseconds / 1000) * pixelsPerSecond) % cycleWidth;
}
