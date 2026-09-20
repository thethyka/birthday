/**
 * THE QUOTE — one long phrase, revealed letter by letter.
 *
 * This is hangman, not Wordle. Tap a letter and every copy of it in the
 * sentence lights up; guess wrong too many times and it reveals itself
 * anyway. Long sentences are the whole point here — the joy is watching it
 * emerge, which is exactly the thing a 35-letter Wordle can't do.
 *
 * - Any length. Spaces and punctuation are shown for free, so she can see the
 *   shape of the sentence from the start.
 * - Long quotes wrap word-by-word, so this works on a phone as well as a
 *   laptop — it just looks best wide.
 */

export const quote = {
  /** Heading on the page. */
  title: "Hangman",

  /** Optional line of setup - who said it, or when. Empty shows nothing. */
  hint: "",

  /** The phrase itself. */
  text: "IN ANOTHER LIFE I HAVE TO BELIEVE I AM A JEDI",

  /** How many wrong letters she gets. 8 is forgiving; 6 has real teeth. */
  lives: 8,
};

/** Optional sign-off once it's revealed. */
export const afterword: string = "";
