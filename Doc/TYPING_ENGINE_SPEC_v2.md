# TypingPeak — Typing Engine Specification

---

# 1. Overview

The Typing Engine is the core logic system of TypingPeak.

It is responsible for:

- Capturing keyboard input
- Comparing typed characters
- Highlighting correctness
- Tracking mistakes
- Calculating accuracy
- Calculating Live WPM
- Calculating Standard WPM
- Managing timer
- Handling restart behavior

The engine must remain:

- Accurate
- Transparent
- Lightweight
- Industry-standard compliant

---

# 2. Typing Modes

TypingPeak defines three distinct typing modes. Each mode has different rules for error handling and backspace behavior.

---

## A. Free Mode (Used in Lessons)

Behavior:
- Mistakes are shown in **red** but can be backspaced and corrected.
- Corrected mistakes display as **faded-red** — the error is permanently logged even after correction.
- Cursor follows the current typing position.
- Backspace is allowed at all times.
- No Standard WPM — only Live WPM is shown.
- Used exclusively in the Lessons system.

---

## B. Raw / Strict Mode

Behavior:
- Correct characters **cannot be erased** once typed.
- Mistakes require a correct character before the user can move forward.
- No backspace is allowed on a mistake — user must type the correct character.
- Not currently used in Phase 1 but defined for future reference.

---

## C. Competitive / Hybrid Mode (Typing Test)

Behavior:
- Uses full Free Mode input handling during the test.
- Standard WPM uses full selected duration regardless of early completion.
- Live WPM uses actual elapsed time.
- Both WPM values are displayed simultaneously.
- Mistake tracking is permanent.
- Faded-red applies to corrected mistakes.

---

# 3. Character Processing Logic

For each key press:

1. Capture input
2. Compare against current paragraph index
3. Determine:
   - Correct
   - Incorrect
4. Update mistake counter dynamically
5. Recalculate accuracy
6. Recalculate WPM

Character visual states:

| State | Color | Description |
|---|---|---|
| Correct | Green | Typed character matches target |
| Incorrect | Red | Typed character does not match target |
| Corrected mistake | Faded-Red | Wrong character was backspaced; error remains logged |
| Untyped | Gray | Not yet reached |
| Active / Current | Underlined + Blink | Current character awaiting input |

Backspace behavior:
- Remove last character
- Recalculate mistakes
- Recalculate accuracy
- Move active index backward
- Active highlight follows correctly

---

# 4. Active Character Indicator

The current (active) character must:

- Have a visible underline using the primary accent color.
- Have a subtle CSS-based blinking animation (400–600ms cycle, infinite).
- Override all other color states — active state takes highest priority.
- Not shift layout or affect line height.
- Be driven purely by CSS keyframes — no JS timers or setInterval.

Visual state priority order (highest to lowest):
1. Active
2. Incorrect
3. Correct
4. Untyped

---

# 5. Timing System

Duration options:

- 15 seconds
- 30 seconds
- 60 seconds
- 120 seconds

Timer behavior:

- Starts on first key press
- Decreases every second
- Stops at 0
- Triggers "Test Completed" state
- Restart resets timer

### Completion Behavior

Test ends when:
- Timer reaches 0, OR
- User fully types the paragraph

If paragraph is completed early:
- Test stops immediately
- Timer freezes at elapsed time
- Standard WPM still uses full selected duration
- Live WPM uses actual elapsed time

---

# 6. WPM Calculation System

TypingPeak uses a Hybrid Scoring Model.

---

## A. Standard WPM (Official Score)

Formula:

```
Standard WPM = (Total Correct Characters / 5) / Full Duration (in minutes)
```

Explanation:

- 1 word = 5 characters (industry standard)
- Uses full selected duration (15 / 30 / 60 / 120 seconds)
- Applied even if user stops typing early or completes paragraph early
- Used for:
  - Competitive comparison
  - Best score tracking
  - Leaderboard (future)

Purpose:
Measures consistency and stamina. Stopping early lowers your score — by design.

---

## B. Live WPM (Burst Speed)

Formula:

```
Live WPM = (Total Correct Characters / 5) / Actual Time Elapsed (in minutes)
```

Explanation:

- Uses real time elapsed since first key press
- Shows typing burst speed
- Updates dynamically in real time
- Motivational feedback metric

Purpose:
Measures short-term typing speed.

---

# 7. Accuracy Calculation

Formula:

```
Accuracy = (Correct Characters / Total Typed Characters) × 100
```

Rules:

- Accuracy recalculates on every key press
- Backspace recalculates accuracy
- If no characters typed → Accuracy = 0%
- Corrected mistakes still count against accuracy (faded-red characters are not forgiven)

Purpose:
Measures typing precision.

---

# 8. Mistake Tracking

Mistakes are defined as:

Characters where typed character ≠ target character.

Rules:

- Increases when wrong character typed
- Decreases if wrong character deleted via backspace
- Reset on restart
- Corrected mistakes display as faded-red permanently

Mistakes do NOT directly subtract from WPM in Phase 1.

(Future: Net WPM may subtract errors.)

---

# 9. Word Count System

Real Word Count:

- Count words separated by spaces
- Used only for display
- Not used for official WPM calculation

Reason:
Official typing standards use character-based calculation.

---

# 10. Character Count

Character count includes:

- Letters
- Numbers
- Spaces
- Punctuation

Used for:
- WPM calculation
- Transparency display

---

# 11. Best Score Logic

Best WPM:

- Based on Standard WPM only
- Stored in localStorage per duration bucket (15 / 30 / 60 / 120)
- Updated only if new Standard WPM is higher than stored best
- Not reset on refresh
- Reset only if user clears storage

---

# 12. Restart Behavior

Restart must:

- Clear input
- Reset timer
- Reset mistakes
- Reset finished state
- Reset active character index to 0
- Keep same paragraph
- Refocus hidden input

---

# 13. Refresh Behavior

On page reload:

- Finished state must reset
- Timer must reset
- Paragraph must regenerate from pool
- Best score must persist from localStorage

---

# 14. Paragraph Selection Rules

- Categorized paragraph pools (Productivity, Technology, Academic)
- Duration-based pools — each duration has its own dedicated pool:
  - 15s pool → short paragraphs
  - 30s pool → longer than 15s
  - 60s pool → longer than 30s
  - 120s pool → longest paragraphs
- Paragraphs must NOT repeat across duration pools
- New paragraph selected on page refresh
- Same paragraph preserved on restart
- No sentence repetition within a single paragraph
- Paragraphs must be complete, meaningful, and naturally written

---

# 15. Performance Constraints

- Avoid expensive computations inside the render loop
- Keep highlight mapping efficient
- Use minimal state dependencies in useEffect
- Avoid nested useEffect
- Avoid unnecessary re-renders
- Active character animation must be CSS-driven — no JS timers
- Memoize character array; only recompute on input change

Typing must feel instant with zero lag.

---

# 16. Future Enhancements (Not Implemented Yet)

- Net WPM (Gross - errors per minute)
- Anti-cheat detection
- Server-side validation
- Streak tracking
- XP scoring
- Leaderboard logic
- Historical session storage
- 15s duration leaderboard bucket

---

# 17. Design Philosophy

TypingPeak prioritizes:

- Accuracy over inflated metrics
- Transparency over hidden formulas
- Industry-standard compliance
- Clean and predictable scoring
- Hybrid visibility (Live + Standard)

---

Typing Engine is the foundation of TypingPeak.

All future features must respect this scoring specification.
