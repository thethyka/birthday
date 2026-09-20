/**
 * CONNECTIONS — 4 groups of 4. She has to sort 16 tiles into the right groups.
 *
 * HOW TO WRITE A GOOD ONE (this is the whole game, please read):
 *
 * - Difficulty is `1` (easiest) to `4` (hardest). The colours go
 *   yellow -> green -> blue -> purple as it gets harder, same as NYT.
 * - Tiles should be SHORT. One or two words. Long tiles wrap badly on a phone.
 * - The trick is OVERLAP: at least a few tiles should look like they belong in
 *   a different group until you get the category name. A board where every tile
 *   obviously belongs to one group is boring and takes 20 seconds.
 * - Group 4 is where the joke lives. Make it a stretch, make it mean.
 *
 * The example below is filled in so you can see the shape. Replace all of it.
 * Keep the `4 groups x 4 items` structure exactly.
 */

export type ConnectionsGroup = {
  name: string;
  difficulty: 1 | 2 | 3 | 4;
  items: [string, string, string, string];
};

export const board: [
  ConnectionsGroup,
  ConnectionsGroup,
  ConnectionsGroup,
  ConnectionsGroup,
] = [
  {
    name: "People you gave scabies to",
    difficulty: 1,
    items: ["Bryce", "Karam", "Bianca", "Josh"],
  },
  {
    name: "Single",
    difficulty: 2,
    items: ["Ellie", "Caitlin", "Trent", "Sashy"],
  },

  {
    name: "Straight(mostly) white men you've not dated within the last 2 years",
    difficulty: 3,
    items: ["Luis", "Lachlan", "Kayden", "Nathan"],
  },
  {
    name: "stinky + smelly",
    difficulty: 4,
    items: ["Oscar", "Jake", "Dylan", "Poop"],
  },
];

/** Optional line shown once she finishes (or runs out of lives). */
export const afterword: string = "";
