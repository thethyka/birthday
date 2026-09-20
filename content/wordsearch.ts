/**
 * WORD SEARCH — hide a pile of in-jokes in a grid.
 *
 * HOW IT WORKS:
 * - Add or remove words freely. The grid sizes itself to the longest one.
 * - Spaces and punctuation are stripped, so "CLOCK IT" is hidden as CLOCKIT
 *   and displayed in the list as you typed it.
 * - Words go in all 8 directions, including backwards and diagonally.
 * - The layout is seeded, so it's the same grid every time she loads it —
 *   refreshing won't scramble her progress.
 *
 * ONE THING TO KNOW:
 * "INTERDENTAL LISP" is 15 letters, which forces a 15x15 grid. That still
 * works on a phone but the cells get small. Drop it and the longest is
 * GUACAMOLE/LORBEENIS at 9, which lets the grid shrink to 12x12 and feel a lot
 * roomier. Your call — it plays either way.
 */

export const words: string[] = [
  "FROG",
  "GUACAMOLE",
  "INTERDENTAL LISP",
  "GESTALT",
  "SCABIES",
  "RABIES",
  "LAOGANMA",
  "CHEECH",
  "LIGMA",
  "AIDS",
  "CLOCK IT",
  "LORBEENIS",
];

/** Optional line shown once she's found them all. */
export const afterword: string = "";
