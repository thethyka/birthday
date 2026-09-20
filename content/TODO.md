# Karam's todo list

The site is built. Everything below is content — nothing here blocks anything,
and the whole thing runs right now with placeholders in it.

`npm run dev`, then http://localhost:3000

---

## ✅ Done — no action needed

- 12 new photos in `public/groupImages/`, 39 in the gallery total
- No byte-duplicates; you'd already trimmed the ones that came through twice
- Robyn gone, and you've confirmed she's not in any photo
- Puzzle image cropped from IMG_2256 (Paris) → `public/tilePuzzle/puzzle.jpg`,
  **4x4 = 16 pieces** as asked
- Video page deleted
- Repaint (Sunset After Dark), nav restructured, lock progress in the header
- **Six** games built and playable
- Unlock flow + envelope fanfare, gated on **any 3 of 6**
- Connections board finished — all 16 tiles distinct, it plays
- All 8 remaining `copy.ts` fields written (marked DRAFT — overwrite freely)
- Draft afterwords for Connections and Word Search (swap if not your voice)
- Song picker at the door; gallery lazy-loads, swipes, and closes on Esc

---

## The only thing left: write the letter

**File:** `content/letter.md`

The whole site is built to deliver this. Write below the `---` line; last
year's is quoted above it for reference.

- [ ] Write it

## Games — ✅ all done

### `content/connections.ts` — ✅ done

All four groups in, 16 distinct tiles, afterword drafted. Nothing to do unless
you want to reword the afterword.

### `content/wordsearch.ts` — ✅ done

Your 12 words are in and the grid generates cleanly. One thing to decide:
"INTERDENTAL LISP" is 15 letters, which forces a 15x15 grid — playable on a
phone but the cells get small. Drop it and the grid shrinks to ~12x12 and feels
much roomier. Your call, it works either way.

### `content/quote.ts` — ✅ done

Hangman, with the gallows. 35 letters, 8 wrong guesses. No afterword, on
purpose — she said the thing, she doesn't need it explained back.

### `content/sashle.ts` — ✅ done

M'LIGGA + LEGO, no captions. Captions are optional now: right call for an
in-joke, since she already knows why it's funny. Add one only if a word
carries something she might not know you'd clocked.

### Everything else

Nothing needed. All six games are done.

## 2. Copy — ✅ done

All of `content/copy.ts` is filled in. The eight I wrote are marked `// DRAFT`;
read them once and overwrite anything that doesn't sound like you.
`galleryTitle` is currently the joke option ("Evidence") — swap to "Photos" if
you want it straight.

---

## 4. Still open

- [ ] **Gallery split** into "Last year" / "This year"? Not built — say the word.
      Your 2026 photos are exactly the year those 2025 letters were waiting
      through, so splitting them would land.
- [ ] **A current photo of you** for the letter → `public/people/Karam/`
      (optional, replaces the 2025 one)
