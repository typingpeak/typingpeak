# TypingPeak — Active Character UI Checklist

(Strict Engineering Version)

---

## 1️⃣ Scope

Applies to:

* `/typing-test`
* `/lessons` typing component

Does NOT modify:

* Scoring formulas
* Timer logic
* Mistake tracking logic
* Hybrid WPM logic

Visual layer only.

---

## 2️⃣ Active Character Rules

### ✅ Single Active Index

* Track `currentIndex`
* Only one character may be active
* Active index updates on:

  * Key press
  * Backspace
  * Restart

---

## 3️⃣ Visual State Priority

Character state rendering order (highest priority first):

1. Active
2. Incorrect
3. Correct
4. Untyped

Active state overrides other states.

Active character must NOT:

* Show green
* Show red
* Show base gray only

---

## 4️⃣ Underline Indicator

Active character must:

* Have underline
* Underline thickness > normal text underline
* Use primary accent color
* Not affect line height
* Not shift layout

Movement rules:

* Correct key → move forward
* Incorrect key → move forward
* Backspace → move backward
* Restart → reset to index 0

---

## 5️⃣ Blinking Effect

Active character must:

* Have CSS-based animation
* Use subtle background pulse OR opacity pulse
* 400–600ms animation cycle
* Infinite loop
* No JS timers

Animation must:

* Be CSS keyframes
* Not trigger re-renders
* Not cause layout shift
* Not exceed safe flashing thresholds

---

## 6️⃣ No Traditional Cursor

Remove vertical blinking cursor.

Active highlight acts as cursor.

---

## 7️⃣ Performance Constraints

Must:

* Avoid re-rendering full paragraph on animation
* Avoid inline dynamic styles
* Avoid setInterval
* Avoid heavy animation libraries
* Use className conditional only

Recommended:

* Memoize character array
* Only recompute on input change
* Animation purely CSS-driven

---

## 8️⃣ Backspace Behavior

On backspace:

* Remove last typed character
* Recalculate mistakes
* Recalculate accuracy
* Move active index backward
* Active highlight follows correctly

---

## 9️⃣ Restart Behavior

On restart:

* Reset input
* Reset active index
* Remove all character states
* Keep same paragraph
* Refocus hidden input

---

## 🔟 Visual Consistency Rules

Active styling must be identical in:

* Typing Test
* Lessons mode

Do not create separate styling logic.

---

## 11️⃣ Accessibility Constraints

* No rapid flashing
* No red-green alternating animation
* Subtle animation only
* Animation toggle optional (future)

---

## 12️⃣ Validation Checklist Before Deploy

* [ ] Only one active character at all times
* [ ] Underline does not move layout
* [ ] No animation lag
* [ ] No typing delay introduced
* [ ] Backspace moves highlight correctly
* [ ] Restart resets highlight
* [ ] Works on mobile
* [ ] No layout shift

---

## Final Engineering Rule

Active Character Indicator must be:

* Lightweight
* CSS-driven
* Deterministic
* Fully synchronized with typing engine
* Zero impact on scoring logic
