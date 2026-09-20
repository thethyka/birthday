/**
 * SASHLE — three rounds of Wordle, each with a personal word.
 *
 * RULES:
 * - Any length from 3 to 9 letters. It does NOT have to be five — the board
 *   resizes itself, and the tiles shrink for longer words so they still fit
 *   on a phone.
 * - Spaces and punctuation are stripped automatically, so "M'LIGGA" is played
 *   as MLIGGA. A whole sentence won't work — 9 letters is the ceiling.
 * - Case doesn't matter, it gets uppercased.
 *
 * WHAT `caption` IS:
 *   The line that appears the moment she solves the word, explaining why that
 *   word is in here. It's the actual gift; the guessing is just wrapping
 *   paper. So for YOCHI, not "our fave!!" but something like "Bryce is still
 *   going on about owing you a sweet treat. He's good for it."
 *   One or two sentences. Specific beats sweet.
 *
 * CANDIDATES, pulled from your photos and the 2025 messages:
 *   PERTH  — home, and she's finally back in it
 *   YOCHI  — Bryce's "need some more yochi sweet treats"
 *   SCOTT / CORAL / REEF — the SAVE SCOTT REEF sign she's holding
 *   DISCO  — the club photos
 *   PARIS  — the puzzle photo
 *   BALI / GILI — the villa and the pools
 *
 * Note: the answers do ship inside the page, so someone who opened devtools
 * could read them. Fine for an audience of one, but don't say I didn't say so.
 */

export type SashleRound = {
  word: string; // 3-9 letters; spaces/punctuation are stripped
  /**
   * Optional. Leave it out for an in-joke — she already knows why it's funny,
   * and spelling it out underneath just deflates it. Worth adding only for a
   * word that carries something she might not know you'd clocked.
   */
  caption?: string;
};

export const rounds: SashleRound[] = [
  {
    word: "M'LIGGA",
  },
  {
    word: "LEGO",
  },
];
