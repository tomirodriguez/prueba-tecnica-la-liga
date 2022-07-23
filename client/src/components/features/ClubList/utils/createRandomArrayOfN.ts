export const createRandomArrayOfN = (n: number) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 5000));
