# TypingPeak — Professional Typing Speed Test Platform

A fully built, production-ready typing speed test and structured learning platform.

**Live Demo:** https://typingpeak.vercel.app

---

## What is TypingPeak?

TypingPeak is a complete typing speed test and lesson platform built with Next.js 16, TypeScript, and Tailwind CSS. It includes a hybrid WPM scoring engine, 46 structured lessons, and a clean professional dark UI — ready to deploy in minutes.

---

## Features

### Typing Test Engine
- Real-time character-by-character comparison
- Hybrid WPM scoring — Standard WPM + Live WPM displayed simultaneously
- Green = correct, Red = incorrect, Faded-red = corrected mistake
- Active character underline with CSS blink animation
- Free Mode and Strict Mode
- Font resize controls (A- / A+)
- Best score saved per duration in localStorage

### Duration Options
- 15 seconds
- 30 seconds
- 60 seconds
- 120 seconds

### Lessons System
- 46 structured lessons across 3 levels
- Beginner (20 lessons) — Home Row, Top Row, Bottom Row, Simple Words, Short Sentences
- Intermediate (14 lessons) — Capitals, Punctuation, Word Flow, Paragraphs, Rhythm
- Advanced (12 lessons) — Numbers, Symbols, Technical Text, Long Paragraphs
- Sequential locking — 85% accuracy required to unlock next lesson
- Free Mode only — elapsed timer, Live WPM, result card on completion

### UI & Design
- Dark professional theme
- Yellow accent color (#FBBF24)
- Minimal clean layout — no clutter
- Mobile responsive
- AdSense placeholder containers ready
- No ads inside typing area

### SEO & Analytics
- Google Analytics ready (via environment variable)
- Google Search Console ready
- Sitemap.xml included
- 800+ words SEO content on homepage
- Proper H1/H2/H3 hierarchy

---

## How Scoring Works

TypingPeak uses a Hybrid Scoring System — two WPM metrics displayed simultaneously.

### Standard WPM (Official Score)
Formula: (Correct Characters / 5) / Full Duration (minutes)
- Uses the full selected duration (15s / 30s / 60s / 120s)
- Even if you finish early — full duration is used
- Stopping early lowers your score — by design
- This prevents score inflation from burst typing
- Used for competitive comparison and best score tracking

### Live WPM (Burst Speed)
Formula: (Correct Characters / 5) / Actual Time Elapsed (minutes)
- Uses only the time you actually spent typing
- Updates dynamically in real time
- Shows your burst typing speed
- Motivational feedback metric

### Why Two Metrics?

Most typing sites only show burst speed — which inflates your score.
TypingPeak shows both so you always know your real performance.

| Metric | Best For |
|---|---|
| Standard WPM | Competitive comparison, consistent measurement |
| Live WPM | Real-time feedback, burst speed awareness |

### Accuracy
Formula: (Correct Characters / Total Typed) × 100
- Recalculates on every keypress
- Corrected mistakes still count against accuracy
- Faded-red shows corrected mistake history

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Storage:** localStorage (no database needed)
- **Hosting:** Vercel (recommended)

---

## Quick Start

### 1. Download and extract the ZIP file

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in your values in `.env.local`

### 4. Run development server
```bash
npm run dev
```

### 5. Open browser
http://localhost:3000

---

## Deploy to Vercel (Free)

1. Push code to your GitHub repository
2. Go to vercel.com
3. Click New Project
4. Import your repository
5. Add environment variables from .env.example
6. Click Deploy
7. Your site is live in 2-3 minutes

---

## Customization Guide

### Change Site Name
Search and replace "TypingPeak" with your brand name across all files.

### Change Accent Color
Main yellow accent is `#FBBF24` — search and replace in Tailwind classes to change.

### Add Google Analytics
Add your GA Measurement ID to `.env.local`:NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

### Add New Paragraphs
Open `lib/paragraphs.ts` and add paragraphs to the relevant pool:
- `tiny` — for 15s tests
- `short` — for 30s tests
- `medium` — for 60s tests
- `long` — for 120s tests

### Add New Lessons
Open `lib/lessons.ts` and add lesson objects following the existing structure:
```ts
{
  id: "your-lesson-id",
  title: "Your Lesson Title",
  content: "Your lesson typing content here",
  showTips: false
}
```

### Change Colors
Open `tailwind.config.ts` and update color values.

---

## File Structure

typingpeak/
├── app/
│   ├── page.tsx                          # Homepage + Typing Test
│   ├── lessons/
│   │   ├── page.tsx                      # Lessons overview
│   │   ├── [level]/
│   │   │   ├── page.tsx                  # Level page
│   │   │   └── [section]/
│   │   │       └── [lessonId]/
│   │   │           └── page.tsx          # Individual lesson
│   ├── about/page.tsx                    # About page
│   ├── privacy/page.tsx                  # Privacy policy
│   └── contact/page.tsx                  # Contact page
├── components/
│   ├── Navbar.tsx                        # Navigation bar
│   ├── Footer.tsx                        # Footer
│   ├── TypingTest.tsx                    # Main typing engine
│   ├── LessonEngine.tsx                  # Lesson typing component
│   └── LessonResultCard.tsx              # Lesson result screen
├── lib/
│   ├── paragraphs.ts                     # Paragraph pools
│   ├── lessons.ts                        # Lesson content
│   └── storage.ts                        # localStorage helpers
├── docs/
│   ├── ARCHITECTURE.md                   # System architecture
│   ├── LESSONS_SYSTEM_SPEC_v2.md         # Lessons specification
│   ├── TYPING_ENGINE_SPEC_v2.md          # Engine specification
│   ├── UI_VISUAL_SYSTEM_SPEC.md          # Visual system
│   └── ACTIVE_CHARACTER_UI_CHECKLIST.md  # UI checklist
├── .env.example                          # Environment variables template
└── LICENSE.txt                           # License terms

---

## localStorage Schema

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
      "beginner/home-row/1": { "wpm": 32, "accuracy": 93 }
    }
  }
}
```

---

## License

See `LICENSE.txt` for full terms.

- **Standard License ($39)** — 1 project
- **Extended License ($149)** — unlimited projects

For extended license: support.typingpeak@gmail.com

---

## Support

For questions or issues contact:
support.typingpeak@gmail.com

---

Built with Next.js 16 + TypeScript + Tailwind CSS