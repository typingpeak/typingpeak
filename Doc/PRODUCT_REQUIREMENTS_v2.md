# TypingPeak — Product Requirements Document (PRD)

---

## 1. Product Summary

TypingPeak is a public competitive typing platform with structured lessons and hybrid WPM scoring.

The platform must provide:

- Accurate typing performance measurement
- Transparent scoring explanation
- Clean competitive UI
- Beginner-friendly lessons
- SEO-optimized structure
- Google AdSense-ready layout

---

# 2. Core Functional Requirements

---

## A. Typing Test Engine

### 1. Real-Time Typing System
- Character-by-character comparison
- Highlighting:
  - Green = correct
  - Red = incorrect
  - Faded-Red = corrected mistake (error history preserved)
  - Gray = untyped
  - Underlined + Blink = active / current character
- Hidden input to disable OS suggestions
- Active character underline indicator (replaces traditional blinking cursor)
- Auto-focus on page load

---

### 2. Duration Options
User must be able to select:

- 15 seconds
- 30 seconds
- 60 seconds
- 120 seconds

Rules:
- Duration buttons disabled once test starts
- Changing duration resets state
- Full duration used for Standard WPM calculation

---

### 3. Typing Modes

#### Free Mode (Used in Lessons)
- Backspace allowed
- Mistakes shown in red, corrected to faded-red
- Cursor follows typing position
- Live WPM only

#### Strict / Raw Mode (Reference — not in Phase 1 UI)
- Correct characters cannot be erased
- Must type correct character to proceed
- No backspace on mistakes

#### Competitive / Hybrid Mode (Typing Test)
- Free Mode input handling
- Dual WPM display (Standard + Live)
- Permanent faded-red for corrected mistakes
- Full duration enforced for Standard WPM

---

### 4. Scoring System

#### Standard WPM
Formula:
```
Standard WPM = (Total Correct Characters / 5) / Full Duration (minutes)
```

Used for:
- Competitive measurement
- Best score storage per duration (15 / 30 / 60 / 120)

---

#### Live WPM
Formula:
```
Live WPM = (Total Correct Characters / 5) / Actual Time Elapsed (minutes)
```

Used for:
- Burst speed display
- Motivational real-time feedback

---

#### Accuracy
Formula:
```
Accuracy = (Correct Characters / Total Typed) × 100
```

Note: Corrected mistakes still count against accuracy.

---

#### Mistakes
- Count incorrect characters
- Decrease if user backspaces wrong characters
- Reset on restart
- Corrected mistakes remain as faded-red

---

#### Word Count
- Count real words using space separation
- Display for reference only

---

#### Character Count
- Count all characters including spaces
- Used in WPM formula and display

---

### 5. Completion Behavior

Test ends when:
- Timer reaches 0, OR
- User fully types the paragraph

If paragraph is completed early:
- Test ends immediately
- Timer freezes
- Standard WPM uses full selected duration
- Live WPM uses actual elapsed time

---

### 6. Restart Function

Restart must:
- Clear input
- Reset timer
- Reset mistakes
- Reset active index to 0
- Remove finished state
- Keep same paragraph
- Refocus input

---

### 7. Random Paragraph System

- Categorized paragraph pools (Productivity, Technology, Academic)
- Duration-based dedicated pools:
  - 15s pool → short paragraphs
  - 30s pool → longer than 15s
  - 60s pool → longer than 30s
  - 120s pool → longest paragraphs
- Paragraphs must NOT repeat across duration pools
- New paragraph selected on page refresh
- Same paragraph preserved on restart
- No sentence repetition within a single paragraph
- All paragraphs must be complete, meaningful, and naturally written

---

## B. Lessons System

---

### 1. Lessons Page

Route:
`/lessons`

The Lessons page must include:

- Structured lesson categories
- Beginner to advanced progression
- Short practice drills
- Clear instructional text above each lesson
- Embedded mini typing exercises
- Clean layout optimized for readability
- Ad placements outside active typing zones

Purpose:
The Lessons page exists to help users systematically improve typing skills rather than compete for scores.

---

### 2. Lesson Categories

Phase 1 lesson categories:

**Beginner:**
- Home Row Basics
- Top Row Practice
- Bottom Row Practice
- Simple Words
- Short Sentences
- Beginner Review

**Intermediate:**
- Capital Letters
- Punctuation
- Word Flow
- Medium Paragraph
- Rhythm Practice
- Accuracy Training
- Speed Training

**Advanced:**
- Numbers & Symbols
- Mixed Case
- Technical Text
- Long Paragraph
- Speed Stability
- Advanced Review

Each category includes:
- A short explanation section
- A practice paragraph or drill
- Clear goal (accuracy or speed focus)
- Restart/reset option

---

### 3. Lesson Progression Structure

Level 1 — Beginner:
- Home row focus
- Accuracy-first drills
- Clear finger guidance

Level 2 — Intermediate:
- Full keyboard drills
- Common English word practice
- Controlled speed increase
- Punctuation and capitalization

Level 3 — Advanced:
- Mixed punctuation, numbers, symbols
- Longer timed drills
- Accuracy + speed combined

---

### 4. Lesson Typing Behavior

Lessons use **Free Mode only**:

- No countdown timer
- Elapsed time starts on first keypress
- Backspace allowed
- Cursor follows typing position
- Faded-red for corrected mistakes
- Mistakes permanently affect accuracy
- No Standard WPM
- Only Live WPM shown
- Current character underlined with subtle blink

---

### 5. Lesson Locking Rules

- Sequential locking — next lesson unlocks only when previous is completed
- Completion requirement: **Accuracy ≥ 85%**
- 85% requirement clearly shown in UI on locked lesson cards
- Sections unlock sequentially
- Locking is independent per level

---

### 6. Result Screen (After Lesson)

Display:
- Accuracy %
- Typos (mistake count)
- Time Taken (elapsed seconds)
- Live WPM
- Restart button
- Back to Lessons button

No leaderboard, no best-score banner, no competitive messaging.

---

### 7. Lesson Data Storage

- Only best result stored per lesson
- Best = higher accuracy; tie-break = higher WPM
- Update stored result only if new attempt is better
- Attempt data is ephemeral — only best result marks progress
- No attempt history stored for lessons

---

### 8. File & Component Structure

- **lib/lessons.ts** — All lesson content with TypeScript types (`Lesson`, `Section`, `Level`)
- **lib/storage.ts** — localStorage helper for `typingPeakData` schema
- **components/LessonEngine.tsx** — Reusable free-mode typing component with result screen
- **app/lessons/page.tsx** — Level overview
- **app/lessons/[level]/page.tsx** — Level page with stats header
- **app/lessons/[level]/[section]/page.tsx** — Section page with lesson cards
- **app/lessons/[level]/[section]/[lessonId]/page.tsx** — Individual lesson typing interface

---

### 9. SEO Value of Lessons

The Lessons page must:

- Contain descriptive educational text
- Use structured headings (H1, H2, H3)
- Include keyword-rich content:
  - typing lessons for beginners
  - how to improve typing speed
  - typing accuracy exercises
  - touch typing practice
- Include at least 600–1000 words of educational content

---

### 10. Lesson UI Requirements

- Clean readable typography
- Font resize supported
- Mobile responsive layout
- No distracting animations
- Ad placements only between sections
- Clear visual separation from competitive typing mode

---

## C. Accessibility Requirements

- Font resize buttons (A- / A+)
- Mobile responsive layout
- Clear readable typography
- Active character underline does not cause layout shift
- No rapid flashing animations
- Dark mode ready (future)

---

## D. SEO Requirements

Home page must include:

- 800+ words explanation
- What is WPM?
- What is accuracy?
- How typing speed is calculated?
- Why typing matters?
- FAQ section

Lessons page must include:
- Descriptive educational content
- Structured headings (H1, H2, H3)
- Keyword-rich content

---

## E. AdSense Requirements

Ad placement areas:

- Top banner
- Right sidebar (desktop)
- Bottom content area
- Between lesson sections

Restrictions:

- No ads inside typing paragraph
- No ads blocking input
- No misleading click placement
- Ads must be visually separated from typing area

---

# 3. Data Storage Schema

```json
{
  "typingTest": {
    "durations": {
      "15":  { "attempts": [], "best": 0 },
      "30":  { "attempts": [], "best": 0 },
      "60":  { "attempts": [], "best": 0 },
      "120": { "attempts": [], "best": 0 }
    }
  },
  "lessons": {
    "results": {
      "beginner/home-row/1": { "wpm": 32, "accuracy": 93 }
    }
  }
}
```

Each typing test attempt record:
```ts
{ wpm: number, accuracy: number, date: number }
```

Storage limits:
- Max 50 attempts per duration bucket (15 / 30 / 60 / 120)
- Drop oldest entry when limit exceeded
- Best Standard WPM tracked separately per duration

---

# 4. Non-Functional Requirements

---

## Performance
- No lag during typing
- No unnecessary re-renders
- Efficient state updates
- Optimized React hooks
- Active character animation is CSS-driven only (no JS timers)

---

## Code Standards
- TypeScript strict typing
- No deprecated Next.js patterns
- App Router only
- Modular file structure
- Clean separation of logic and UI

---

## Scalability Readiness

Future-ready for:
- User accounts
- Database integration
- Leaderboard system
- Session history
- Performance analytics

---

# 5. Out of Scope (For Now)

- Payment gateway
- Subscription system
- Global multiplayer
- Server-based authentication
- Cloud database

---

# 6. Success Criteria

TypingPeak is considered Phase 1 complete when:

- Typing engine is stable across all 4 durations (15 / 30 / 60 / 120)
- Hybrid WPM works correctly
- Faded-red corrected mistake states work
- Active character underline indicator works
- Lessons page is functional with locking system
- SEO homepage is implemented
- Legal pages are complete
- Ad sections are prepared
- No refresh bugs
- Fully responsive on mobile

---

### Paragraph Length & Uniqueness Rules (STRICT)

#### 1. Duration-Based Length Scaling

- 15 seconds → Short paragraph (minimum length)
- 30 seconds → Longer than 15s
- 60 seconds → Longer than 30s
- 120 seconds → Longest paragraph

#### 2. Unique Paragraph Pools per Duration

- 15s pool
- 30s pool
- 60s pool
- 120s pool

Paragraphs must NOT repeat across duration pools.

#### 3. Paragraph Integrity Rules

Every paragraph must:
- Be complete and meaningful
- Contain natural sentence flow
- Maintain readability and realism

#### 4. No Sentence Repetition Inside Paragraph

Within a single paragraph:
- No sentence should repeat
- No duplicated phrases
- No artificial looping patterns

#### 5. Refresh Behavior

On page refresh:
- A new paragraph must be selected from the pool
- Previously shown paragraph must not repeat immediately

#### 6. Restart Behavior

On restart:
- The same paragraph must be preserved
- No regeneration during restart

---

TypingPeak must feel:
Professional, Competitive, Transparent, and Reliable.
