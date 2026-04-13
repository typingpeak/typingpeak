SOURCE BUILD PLAN — LESSONS SYSTEM + SEO HOMEPAGE
PART 1 — Structured Build Plan for Lessons Page
🎯 Objective

Build a structured educational lessons system inside /lessons that:

Improves typing skill

Has beginner → advanced progression

Uses mini typing drills

Does NOT apply competitive scoring pressure

Reuses typing engine logic safely

🏗 Folder Structure
app/
 └ lessons/
    ├ page.tsx
    ├ home-row/
    │   └ page.tsx
    ├ top-row/
    │   └ page.tsx
    ├ bottom-row/
    │   └ page.tsx
    ├ words/
    │   └ page.tsx
    ├ accuracy/
    │   └ page.tsx
    ├ speed/
    │   └ page.tsx

lib/
 └ lessons.ts

📘 Lesson Categories (Phase 1)
Beginner

Home Row Basics

Finger Placement Guide

Top Row Practice

Bottom Row Practice

Intermediate

Common Words Drill

Numbers & Symbols Practice

Advanced

Accuracy Training Mode

Speed Training Mode

🧠 Lesson Behavior Rules

Lessons must:

Use shorter paragraphs (5–10 lines max)

Be repeatable

Focus on technique

Show accuracy

Hide Best WPM

Hide competitive pressure

Lessons should display:

Accuracy %

Mistakes

Characters typed

Live WPM (optional)

Lessons should NOT:

Store best score

Affect dashboard

Show leaderboard

Use Standard WPM as official metric

🧩 Implementation Strategy
Step 1 — Create lesson drills in lib/lessons.ts

Example structure:

export const lessons = {
  homeRow: [
    "asdf jkl; asdf jkl;",
    "jj ff kk dd ss ll aa ;;",
  ],
  topRow: [
    "qwerty qwerty qwerty",
  ],
  bottomRow: [
    "zxcvbn zxcvbn zxcvbn",
  ],
};

Step 2 — Create Reusable LessonTypingComponent

Inside:

components/LessonTyping.tsx


Differences from main engine:

No bestScore

No Standard WPM

No duration buttons

Optional fixed timer (or no timer)

Accuracy-focused feedback

Step 3 — Lessons Page UI

Main /lessons/page.tsx must include:

Clear explanation of lesson structure

Category sections

Clickable lesson cards

Clean educational layout

Ad block between sections (policy safe)

📈 Lesson UX Design

Lessons should feel:

Calm

Educational

Guided

Progressive

Not competitive.

PART 2 — Full SEO Homepage Content (Ready to Use)

Below is structured homepage content (SEO optimized).

You can paste this into:

app/page.tsx


and style it properly.

🏠 HOMEPAGE CONTENT
H1

Reach Your Peak Typing Speed with TypingPeak

Hero Paragraph

TypingPeak is a free online typing speed test and practice platform designed to help you measure, improve, and master your typing performance. Whether you are preparing for competitive exams, improving workplace efficiency, or simply aiming to increase your words per minute, TypingPeak gives you accurate, real-time feedback with transparent scoring.

What is WPM?

WPM stands for Words Per Minute. It measures how many words you can type in one minute.

TypingPeak follows the international standard formula:

1 word = 5 characters

This means your typing speed is calculated based on total characters typed divided by five, then divided by time in minutes.

There are two types of WPM shown:

Standard WPM — based on the full selected duration (30 / 60 / 120 seconds)

Live WPM — based on actual time used while typing

This hybrid model provides both consistency measurement and burst speed insight.

What is Accuracy?

Accuracy measures how many characters you typed correctly.

Formula:

Accuracy = (Correct Characters ÷ Total Typed Characters) × 100

High typing speed without accuracy reduces overall performance. TypingPeak ensures you focus on precision as well as speed.

How Typing Speed is Calculated

TypingPeak calculates performance using:

Character comparison system

Real-time mistake tracking

Live WPM computation

Standard WPM computation

Accuracy percentage

Word count

Character count

The scoring system is transparent and follows industry typing standards used in official typing certifications.

Why Improve Your Typing Speed?

Improving typing speed helps you:

Increase workplace productivity

Perform better in government typing exams

Improve coding speed

Reduce digital fatigue

Communicate faster

Complete tasks efficiently

Typing is a foundational digital skill in modern education and employment.

Features of TypingPeak

Free typing speed test

30s / 60s / 120s test options

Real-time highlighting

Hybrid WPM scoring

Accuracy tracking

Mistake counter

Font resize accessibility

Structured lessons

Mobile responsive design

Who Should Use TypingPeak?

Students

Job seekers

Government exam candidates

Programmers

Writers

Data entry professionals

Anyone wanting to improve typing performance

FAQ

Q: What is a good typing speed?
A: Average typing speed is around 35–45 WPM. Competitive typists exceed 70 WPM.

Q: Does TypingPeak inflate scores?
A: No. It uses standard 5-character word calculation.

Q: Is TypingPeak free?
A: Yes. The platform is free to use.

Q: Does TypingPeak store my data?
A: No personal data is stored in Phase 1. Only best score is saved locally in your browser.

Call to Action

Start your free typing speed test now and begin improving today.

[ Start Typing Test ]

END OF SOURCE SECTION