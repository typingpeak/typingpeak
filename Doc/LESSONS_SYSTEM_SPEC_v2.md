# TypingPeak Lessons System Specification

## Version
Phase 1 – Structured Learning System

---

# 1. Purpose

The Lessons system is designed as a **modern smooth learning tool**, separate from the competitive Typing Test page.

Lessons focus on:
- Skill building
- Accuracy improvement
- Progressive difficulty
- Structured learning

Lessons are NOT competitive mode.
Lessons do NOT use hybrid scoring.
Lessons do NOT use leaderboards.

---

# 2. Architecture (App Router)

Routes:

/lessons
/lessons/[level]
/lessons/[level]/[section]
/lessons/[level]/[section]/[lessonId]

Levels:
- beginner
- intermediate
- advanced

Each level contains:
- A stats header
- Multiple sections
- Sequentially locked lessons

---

# 3. File & Component Structure

- **lib/lessons.ts**: Contains all lesson content and hierarchy. Defines TypeScript types:
  ```ts
  type Lesson  = { id: string; title: string; content: string; showTips?: boolean };
  type Section = { id: string; title: string; lessons: Lesson[] };
  type Level   = { id: string; title: string; sections: Section[] };
  ```
- **lib/storage.ts**: Helper for reading/writing the `typingPeakData` schema in localStorage.
- **components/LessonEngine.tsx**: Reusable component implementing the lesson typing logic (free-mode engine and result screen).
- **app/lessons/** routes:
  - `/lessons/page.tsx` – Level overview (Beginner / Intermediate / Advanced cards).
  - `/lessons/[level]/page.tsx` – Level page (stats header + section cards).
  - `/lessons/[level]/[section]/page.tsx` – Section page (lesson cards with lock states).
  - `/lessons/[level]/[section]/[lessonId]/page.tsx` – Individual lesson page (typing interface).

---

# 4. Level Structure

## Beginner
Sections:
- home-row
- top-row
- bottom-row
- simple-words
- short-sentences
- beginner-review

Each section contains 1–4 sub-lessons.

---

## Intermediate
Sections:
- capital-letters
- punctuation
- word-flow
- medium-paragraph
- rhythm-practice
- accuracy-training
- speed-training

Each section contains 1–3 sub-lessons.

---

## Advanced
Sections:
- numbers-symbols
- mixed-case
- technical-text
- long-paragraph
- speed-stability
- advanced-review

Each section contains 1–2 sub-lessons.

---

# 5. Lesson Locking Rules

1. Lessons are locked sequentially.
2. A lesson unlocks only when the previous lesson is completed.
3. Completion requirement:
   **Accuracy ≥ 85%**
4. The 85% requirement must be clearly shown in the UI (e.g. grayed-out locked lesson card with "85% required" label or tooltip).
5. Sections unlock sequentially — all lessons in one section must be completed before the next section unlocks.
6. Locking applies independently inside each level.

---

# 6. Typing Modes

TypingPeak defines three typing modes. Lessons use **Free Mode only**.

### A. Free Mode (Used in Lessons)
- Mistakes are shown in red but can be backspaced.
- Corrected mistakes display as **faded-red** (visual error history is preserved).
- Cursor follows typing position.
- Backspace is allowed at all times.
- No Standard WPM — only Live WPM is shown.

### B. Raw / Strict Mode (Typing Test reference — not used in Lessons)
- Correct characters cannot be erased once typed.
- Mistakes immediately require a correct character before moving forward.
- No backspace on a mistake — must type the correct character to proceed.

### C. Competitive / Hybrid Mode (Future — not used in Lessons)
- Mixed behavior from Free and Strict modes.
- Not applicable to Lessons in Phase 1.

---

# 7. Lesson Page Behavior

Lessons use **Free Mode only**.

Behavior:

- No countdown timer.
- Elapsed time starts on first keypress.
- Full typing engine logic reused from Free Mode:
  - Permanent mistake tracking
  - Faded red for corrected mistakes
  - Backspace allowed
  - Cursor follows typing position
  - Mistakes permanently affect accuracy
- No Standard WPM.
- Only Live WPM is shown.
- Current character is highlighted with underline and subtle blinking to guide the user's focus.

---

# 8. Result Screen (On Completion)

When paragraph is fully typed, display:

- Accuracy %
- Typos (mistake count)
- Time Taken (elapsed seconds)
- Live WPM
- Restart button
- Back to Lessons button

No leaderboard.
No best-score banner.
No competitive messaging.

---

# 9. Visual Mistake States

| State | Color | Description |
|---|---|---|
| Correctly typed | Green | Character matched target |
| Incorrect | Red | Character did not match target |
| Corrected mistake | Faded-Red | Wrong character was backspaced; error is still logged |
| Untyped | Gray | Not yet reached |
| Active / Current | Underlined + Blink | Current character awaiting input |

---

# 10. Data Storage Rules

All data stored locally using localStorage.

Single storage object:

```json
{
  "typingTest": {
    "durations": {
      "15": { "attempts": [], "best": 0 },
      "30": { "attempts": [], "best": 0 },
      "60": { "attempts": [], "best": 0 },
      "120": { "attempts": [], "best": 0 }
    }
  },
  "lessons": {
    "results": {
      "beginner/home-row/1": { "wpm": 32, "accuracy": 93 },
      "beginner/home-row/2": { "wpm": 28, "accuracy": 89 }
    }
  }
}
```

Each attempt record shape (for typing test buckets):
```ts
{ wpm: number, accuracy: number, date: number }
```

---

## Lesson Result Storage Rules

- Store **only the best result per lesson**.
- Best result is determined by:
  1. Higher accuracy wins.
  2. If accuracy is equal → higher WPM wins (tie-breaker).
- On each lesson completion, update the stored result **only if** the new attempt is better by these criteria.
- Lesson attempt data is not stored beyond the best result — each attempt is ephemeral.
- Do NOT store multiple attempts per lesson.
- No attempt history needed for lessons.

---

# 11. Level Stats Header

Each level page must display:

- % Completed
- Average WPM
- Average Accuracy

## Calculation

### % Completed
(Completed lessons in level / Total lessons in level) × 100

### Average WPM
Average of stored best WPM values for completed lessons in that level.

### Average Accuracy
Average of stored best accuracy values for completed lessons in that level.

---

# 12. Typing Tips Rule

Typing tips appear ONLY in:

- beginner/home-row/1
- beginner/top-row/1
- beginner/bottom-row/1

Typing tips must NOT appear in:
- simple-words
- short-sentences
- intermediate lessons
- advanced lessons

---

# 13. UI Philosophy

Lessons must feel like:

- Modern
- Clean
- Smooth
- Non-competitive
- Structured learning tool

Avoid:
- Heavy competitive styling
- Leaderboard aesthetics
- Overly aggressive colors

UI-specific requirements:
- Highlight the current character with underline and subtle blink to improve focus.
- Show "≥ 85% accuracy required" label or tooltip on locked lesson cards.
- Use faded-red to communicate corrected mistakes without alarming the user.

---

# 14. Typing Test Storage Rules (For Reference)

Typing Test page stores:

- Last 50 attempts per duration (15 / 30 / 60 / 120)
- Best Standard WPM per duration (15 / 30 / 60 / 120)

If attempts exceed 50:
- Remove oldest entry

---

# 15. Important Engineering Constraints

- Do NOT modify hybrid WPM logic.
- Do NOT modify typing-test timer logic.
- Lessons must not break existing typing engine.
- Maintain separation of logic and UI.
- Use strict TypeScript.
- Avoid unnecessary re-renders.
- Production-ready standards only.
- LessonEngine component must be self-contained and reusable across all lesson pages.

---

# 16. Future Expansion (Phase 2+)

- Optional user accounts
- Cloud sync
- Global leaderboards
- Progress tracking across devices
- Lesson analytics

Not part of Phase 1.

---

End of Specification.
