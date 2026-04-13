// ============================================================
// lib/storage.ts — TypingPeak localStorage helper
// Single key: "typingPeakData"
// ============================================================

// ---- Typing Test types ----

export interface TypingTestAttempt {
  wpm: number;
  accuracy: number;
  date: number; // epoch ms
}

export interface DurationBucket {
  attempts: TypingTestAttempt[];
  best: number; // best Standard WPM
}

export type Duration = "15" | "30" | "60" | "120";

export interface TypingTestData {
  durations: Record<Duration, DurationBucket>;
}

// ---- Lessons types ----

export interface LessonResult {
  wpm: number;
  accuracy: number;
}

export interface LessonsData {
  results: Record<string, LessonResult>; // key = "level/section/lessonId"
}

// ---- Root schema ----

export interface TypingPeakData {
  typingTest: TypingTestData;
  lessons: LessonsData;
}

// ---- Constants ----

const STORAGE_KEY = "typingPeakData";
const MAX_ATTEMPTS_PER_DURATION = 50;

// ---- Default factory ----

function createDefault(): TypingPeakData {
  return {
    typingTest: {
      durations: {
        "15": { attempts: [], best: 0 },
        "30": { attempts: [], best: 0 },
        "60": { attempts: [], best: 0 },
        "120": { attempts: [], best: 0 },
      },
    },
    lessons: {
      results: {},
    },
  };
}

// ============================================================
// Core read / write
// ============================================================

export function loadData(): TypingPeakData {
  if (typeof window === "undefined") return createDefault();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefault();

    const parsed: TypingPeakData = JSON.parse(raw);

    // Ensure every duration bucket exists (forward-compat)
    const durations = parsed.typingTest?.durations ?? {};
    for (const d of ["15", "30", "60", "120"] as const) {
      if (!durations[d]) {
        durations[d] = { attempts: [], best: 0 };
      }
    }
    parsed.typingTest = { durations: durations as Record<Duration, DurationBucket> };

    if (!parsed.lessons) {
      parsed.lessons = { results: {} };
    }
    if (!parsed.lessons.results) {
      parsed.lessons.results = {};
    }

    return parsed;
  } catch {
    return createDefault();
  }
}

export function saveData(data: TypingPeakData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ============================================================
// Typing Test helpers
// ============================================================

/**
 * Record a typing-test attempt for a given duration.
 * - Appends to the attempts array (max 50, oldest removed first).
 * - Updates `best` if the new wpm is higher.
 */
export function recordTypingTestAttempt(
  duration: Duration,
  attempt: TypingTestAttempt
): void {
  const data = loadData();
  const bucket = data.typingTest.durations[duration];

  bucket.attempts.push(attempt);

  // Cap at MAX_ATTEMPTS_PER_DURATION — remove oldest
  while (bucket.attempts.length > MAX_ATTEMPTS_PER_DURATION) {
    bucket.attempts.shift();
  }

  if (attempt.wpm > bucket.best) {
    bucket.best = attempt.wpm;
  }

  saveData(data);
}

/**
 * Get the best Standard WPM for a given duration.
 */
export function getTypingTestBest(duration: Duration): number {
  return loadData().typingTest.durations[duration].best;
}

/**
 * Get all stored attempts for a given duration.
 */
export function getTypingTestAttempts(duration: Duration): TypingTestAttempt[] {
  return loadData().typingTest.durations[duration].attempts;
}

// ============================================================
// Lessons helpers
// ============================================================

/**
 * Build a lesson key from its path segments.
 * e.g. ("beginner", "home-row", "1") → "beginner/home-row/1"
 */
export function lessonKey(
  level: string,
  section: string,
  lessonId: string
): string {
  return `${level}/${section}/${lessonId}`;
}

/**
 * Get the stored best result for a lesson, or null if not yet completed.
 */
export function getLessonResult(key: string): LessonResult | null {
  const result = loadData().lessons.results[key];
  return result ?? null;
}

/**
 * Save a lesson result — only if it's better than the current best.
 *
 * "Better" means:
 *   1. Higher accuracy wins.
 *   2. If accuracy is equal → higher WPM wins (tie-breaker).
 */
export function saveLessonResult(key: string, newResult: LessonResult): void {
  const data = loadData();
  const existing = data.lessons.results[key];

  if (!existing || isBetterResult(newResult, existing)) {
    data.lessons.results[key] = { wpm: newResult.wpm, accuracy: newResult.accuracy };
    saveData(data);
  }
}

/**
 * Check whether a lesson has been completed (accuracy ≥ 85%).
 */
export function isLessonCompleted(key: string): boolean {
  const result = getLessonResult(key);
  return result !== null && result.accuracy >= 85;
}

/**
 * Get all lesson results.
 */
export function getAllLessonResults(): Record<string, LessonResult> {
  return loadData().lessons.results;
}

/**
 * Calculate level stats from stored results.
 *
 * Returns:
 *  - completedCount: how many lessons in the level are completed
 *  - totalCount:     total lessons in the level
 *  - percentComplete: (completedCount / totalCount) × 100, rounded
 *  - avgWpm:         average best WPM across completed lessons
 *  - avgAccuracy:    average best accuracy across completed lessons
 */
export function getLevelStats(
  levelId: string,
  lessonKeys: string[]
): {
  completedCount: number;
  totalCount: number;
  percentComplete: number;
  avgWpm: number;
  avgAccuracy: number;
} {
  const results = loadData().lessons.results;
  const total = lessonKeys.length;

  let completedCount = 0;
  let wpmSum = 0;
  let accSum = 0;

  for (const key of lessonKeys) {
    // Only count keys belonging to this level
    if (!key.startsWith(levelId + "/")) continue;

    const result = results[key];
    if (result && result.accuracy >= 85) {
      completedCount++;
      wpmSum += result.wpm;
      accSum += result.accuracy;
    }
  }

  return {
    completedCount,
    totalCount: total,
    percentComplete: total > 0 ? Math.round((completedCount / total) * 100) : 0,
    avgWpm: completedCount > 0 ? Math.round(wpmSum / completedCount) : 0,
    avgAccuracy: completedCount > 0 ? Math.round(accSum / completedCount) : 0,
  };
}

// ============================================================
// Internal helpers
// ============================================================

/**
 * Returns true if `a` is strictly better than `b`.
 *   1. Higher accuracy wins.
 *   2. Equal accuracy → higher WPM wins.
 */
function isBetterResult(a: LessonResult, b: LessonResult): boolean {
  if (a.accuracy > b.accuracy) return true;
  if (a.accuracy === b.accuracy && a.wpm > b.wpm) return true;
  return false;
}
