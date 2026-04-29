# TypingPeak — Visual UI System Specification

(Phase 1 UI Refinement)

---

# 1. Overall Visual Identity

## Core Feel

TypingPeak UI must feel:

* Minimal
* Professional
* Calm
* Structured
* High-performance
* Transparent
* Modern SaaS style
* Educational but not playful

It should NOT feel:

* Gamified
* Color heavy
* Over-animated
* Cartoon-like
* Cluttered

---

# 2. Color System

## Primary Background

* Very light gray (not pure white)
* Example tone: `#f8fafc` style neutral
* Slight cool tone

Purpose:

* Reduce eye strain
* Keep focus on typing box

---

## Primary Accent Color

Blue tone (used consistently):

* Duration active button
* Progress bar
* Highlight accents
* Buttons
* Level number badge
* Icons

Blue must feel:

* Clean
* Professional
* Not neon
* Not oversaturated

---

## Text Colors

Hierarchy:

* Main Heading → Dark navy / near black
* Subheading → Medium gray
* Paragraph → Soft gray
* Muted info text → Light gray

---

## Status Colors (Typing Only)

* Correct → Green
* Incorrect → Red
* Untyped → Soft gray
* Cursor → White or subtle highlight

These must remain consistent with engine spec.

---

# 3. Layout Structure (Global)

Every page follows:

Navbar (minimal height)
↓
Hero / Title Section
↓
Main Functional Section (Typing or Lessons)
↓
Ad container (clearly separated)
↓
Information card / Explanation
↓
Footer (thin, quiet)

Everything is center-aligned with max width container.

No full-width clutter.

---

# 4. Test Page UI Structure

## A. Hero Section

Centered:

Small top badge:
“Transparent Scoring Engine”
(Subtle blue pill background)

Large Heading:
TypingPeak

Subheading:
Professional hybrid typing performance platform...

Typography:

* Bold for brand name
* Accent blue highlight inside word (Peak)

---

## B. Duration Selector

Position:
Above typing box.

Style:

* Rounded container
* 4 small pill buttons
* Active button filled with blue
* Inactive buttons light gray

Hover effect:
Subtle darker shade.

No animation.

---

## C. Stats Card (Right Side / Above Box)

Small floating card style:

Displays:

* Time
* Live WPM
* Accuracy

Style:

* Soft border
* Light background
* Slight shadow
* Rounded corners

Must not distract from typing area.

---

## D. Typing Box

Main focus.

Style:

* Large rounded rectangle
* Soft border
* Light gray background inside
* Plenty of padding
* Comfortable line height
* Slight shadow (very subtle)

Paragraph text:

* Medium size
* High readability
* Clear letter spacing
* No bold noise

Cursor should be subtle but visible.

---

## E. Restart Button

Circular minimal icon button below typing box.

Not a big CTA.

---

## F. Advertisement Block

Centered block:

Dashed border
Light gray background
Small label:
“ADVERTISEMENT SPACE”

Clearly separated from typing area.

Never inside typing box.

---

## G. Hybrid Scoring Explanation Card

Below ad.

Soft info card:

* Blue icon
* Title bold
* Small explanatory paragraph
* Clean spacing
* No heavy border

Feels educational and transparent.

---

# 5. Lessons Page UI Structure

## A. Hero Section

Small badge:
“Educational System”

Large heading:
Structured Learning

Subheading:
Progressive skill building. Achieve 85% accuracy...

---

## B. Total Progress Bar

Thin horizontal progress bar.

* Light gray background
* Blue fill
* Percentage text aligned right

Minimal height.
No animation needed.

---

## C. Level Blocks

Each Level:

Left side:
Colored number badge (1, 2, 3)

Right side:
Level name
Short description

Clear separation between levels.

---

## D. Section Headers (Home Row, Top Row, etc.)

Small arrow toggle style.

Section name bold.
Thin divider line.

---

## E. Lesson Cards

Grid layout.

Each card:

* Rounded corners
* Soft border
* Light background
* Small key hint text
* Title bold
* Action button area

Locked cards:

* Dashed border
* Muted text
* “Locked” label
* Slight opacity reduction

Unlocked card:

* Solid border
* Blue primary button
* Clear call-to-action

No heavy shadows.
No flashy gradients.

---

## F. Educational Tone

Lessons page must feel:

* Calm
* Structured
* Professional training system
* Not competitive

Avoid:

* WPM emphasis
* Large aggressive numbers
* Leaderboard styling

---

# 6. About Page Style

Should follow same visual language:

* Clean sections
* Informational cards
* Clear headings
* Balanced whitespace
* No heavy graphics

Professional SaaS documentation feel.

---

# 7. Typography Rules

Use:

* Clean sans-serif font
* Consistent scale

Hierarchy example:

H1 → Large bold
H2 → Medium bold
H3 → Semi-bold
Body → Regular
Muted → Small gray

Line spacing generous.
No cramped text.

---

# 8. Spacing System

Use consistent vertical rhythm:

Large section spacing.
Medium card spacing.
Small internal spacing.

Avoid crowded layout.

White space is intentional.

---

# 9. Interaction Rules

* No excessive animation
* No bounce effects
* No flashy transitions
* Minimal hover feedback
* Clean state change

Typing performance must feel instant.

---

# 10. AdSense Safety Visual Rule

Ads must:

* Be boxed
* Clearly separated
* Never look like buttons
* Never match primary CTA style
* Never overlap typing area

---

# 11. Performance UI Rules

* Avoid layout shift
* Stats panel must not jump
* No resizing on key press
* No flicker
* Stable container height

---

# 12. Design Philosophy Summary

TypingPeak UI must communicate:

Precision
Trust
Transparency
Performance
Structured Learning

Not entertainment.
