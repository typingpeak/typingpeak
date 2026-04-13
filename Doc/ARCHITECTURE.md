# TypingPeak — Technical Architecture

---

# 1. Overview

TypingPeak is built as a modern, client-side optimized typing platform using:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- LocalStorage (for session persistence)
- Modular file structure

The architecture is designed to:

- Be scalable
- Support future backend integration
- Maintain performance during real-time typing
- Avoid unnecessary re-renders
- Separate UI from logic

---

# 2. Technology Stack

## Frontend Framework
Next.js (App Router)

Reason:
- SEO friendly
- Fast routing
- Modern React features
- Production ready

---

## Language
TypeScript

Reason:
- Type safety
- Prevents indexing errors
- Safer scaling
- Cleaner code contracts

---

## Styling
Tailwind CSS

Reason:
- Utility-first
- Fast development
- Responsive by default
- Clean structure

---

## State Management
React useState + useEffect

Reason:
- Lightweight
- No external dependency needed
- Controlled state flow

---

# 3. Project Structure

typingpeak/
│
├── app/
│ ├── page.tsx (Home Page)
│ ├── typing-test/
│ │ └── page.tsx (Typing Engine)
│ ├── lessons/
│ │ └── page.tsx (Lessons System)
│ ├── dashboard/
│ │ └── page.tsx
│ ├── privacy/
│ ├── contact/
│
├── components/
│ ├── Navbar.tsx
│ ├── FontControls.tsx
│ ├── StatsPanel.tsx
│ ├── ProgressBar.tsx (future)
│
├── lib/
│ ├── paragraphs.ts
│ ├── scoring.ts (future separation)
│ ├── typingEngine.ts (future separation)
│
├── docs/
│ ├── PROJECT_OVERVIEW.md
│ ├── PRODUCT_REQUIREMENTS.md
│ ├── ARCHITECTURE.md
│
└── public/


---

# 4. Core System Architecture

TypingPeak consists of 4 main systems:

---

## A. Typing Engine Module

Responsibilities:

- Capture keyboard input
- Compare characters
- Highlight correct/incorrect
- Track mistakes
- Calculate accuracy
- Calculate Live WPM
- Calculate Standard WPM
- Handle timer
- Handle restart logic

Important Rule:
Typing engine must remain lightweight and efficient.

---

## B. Paragraph System

Location:
`lib/paragraphs.ts`

Responsibilities:

- Categorized paragraph storage
- Duration-based selection
- Random selection
- Mixed category support
- No repetition within session (future)

Paragraph categories:

- Productivity
- Technology
- Academic

Paragraph sizes:

- Short (30s)
- Medium (60s)
- Long (120s)

---

## C. Lessons Module

Location:
`/app/lessons`

Responsibilities:

- Display structured lesson categories
- Provide educational content
- Embed practice drills
- Focus on accuracy improvement
- No competitive scoring pressure

Lessons reuse typing engine logic but without leaderboard or best-score tracking.

---

## D. Scoring System

Hybrid scoring architecture:

Standard WPM:
(Total Characters / 5) / Full Duration

Live WPM:
(Total Characters / 5) / Actual Time Used

Accuracy:
(Correct Characters / Total Typed) × 100

Mistakes:
Count of incorrect characters

Best Score:
Stores highest Standard WPM in localStorage


E. Career Calculator Module (Phase 3)

Responsibilities:

Receive Standard WPM from typing test

Accept age & career input

Compute productivity comparison

Calculate time-saved projection

Render professional result summary

Must NOT:

Modify typing engine logic

Interfere with scoring system

Store unnecessary session data


---

# 5. State Management Strategy

Local component state:

- input
- duration
- timeLeft
- started
- finished
- mistakes
- bestScore
- fontSize

LocalStorage used for:
- Best WPM persistence

Future upgrade:
Session history stored in database.

---

# 6. Performance Strategy

To ensure smooth typing:

- Avoid expensive computations inside render loop
- Keep highlight mapping efficient
- Use minimal state dependencies in useEffect
- Avoid nested useEffect
- Avoid unnecessary re-renders

Typing must feel instant with no lag.

---

# 7. Scalability Plan

Architecture must allow:

- Backend integration (Supabase / PostgreSQL)
- User authentication
- Leaderboard system
- Analytics tracking
- Server-side scoring validation

Separation of concerns:

UI Layer → Components
Logic Layer → lib/
Data Layer → future server/database

---

# 8. SEO Structure

Home page must:

- Use proper heading hierarchy (H1, H2, H3)
- Include long-form content
- Be crawlable
- Avoid heavy client-only rendering for main content

Lessons page must:
- Provide structured educational content
- Include keyword-rich sections

---

# 9. AdSense Compatibility Design

Ad placements must:

- Avoid typing interaction zones
- Not block input
- Be responsive
- Follow Google policy

Ad containers should be placed in layout or page-level wrapper, not inside typing engine component.

---

# 10. Architectural Principles

- Modular design
- Type safety
- Separation of logic and UI
- Scalable folder structure
- Performance-first mindset
- Clean code standards

---

TypingPeak architecture is built for long-term expansion while remaining lightweight in Phase 1.
