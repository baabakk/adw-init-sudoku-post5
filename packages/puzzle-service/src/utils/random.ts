/**
 * Random utility functions used by the puzzle generator.
 */

/**
 * Returns a random integer between min (inclusive) and max (exclusive).
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Shuffles an array in place using Fisher-Yates algorithm.
 */
export const shuffle = <T>(array: T[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
};
