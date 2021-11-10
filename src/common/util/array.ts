export const range = (start, end) =>
  Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx);
