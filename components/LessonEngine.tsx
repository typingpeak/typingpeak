"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { saveLessonResult } from "@/lib/storage";

// ============================================================
// Types
// ============================================================

interface LessonEngineProps {
  /** Lesson content string to type */
  content: string;
  /** Storage key e.g. "beginner/home-row/1" */
  lessonKey: string;
  /** Callback after result is saved */
  onComplete?: (stats: LessonStats) => void;
  /** Optional back-navigation handler */
  onBack?: () => void;
  /** Whether to show typing tips panel */
  showTips?: boolean;
}

interface LessonStats {
  wpm: number;
  accuracy: number;
  mistakes: number;
  elapsedSeconds: number;
}

// ============================================================
// Component
// ============================================================

export default function LessonEngine({
  content: rawContent,
  lessonKey,
  onComplete,
  onBack,
  showTips = false,
}: LessonEngineProps) {
  const content = rawContent.replace(/\n/g, ' ').replace(/  +/g, ' ').trim();
  // ---- State ----
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [mistakeIndices, setMistakeIndices] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0); // seconds

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ---- Derived ----
  const currentIndex = input.length;

  // ---- Elapsed timer (starts on first keypress) ----
  useEffect(() => {
    if (!started || finished || startTime === null) return;

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 200);

    return () => clearInterval(interval);
  }, [started, finished, startTime]);

  // ---- Auto-focus ----
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ---- Keyboard handler (Free Mode) ----
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (finished) return;

      // Prevent default for typing keys
      if (e.key === " " || e.key === "Backspace" || e.key.length === 1) {
        e.preventDefault();
      }

      // Start on first keypress
      if (!started) {
        setStarted(true);
        setStartTime(Date.now());
      }

      // ---- Backspace (Free Mode: always allowed) ----
      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        return;
      }

      // Ignore non-printable
      if (e.key.length !== 1) return;

      const idx = input.length;
      const expected = content[idx];

      // Track mistakes
      if (e.key !== expected) {
        setMistakeIndices((prev) => {
          const next = new Set(prev);
          next.add(idx);
          return next;
        });
        setMistakes((prev) => prev + 1);
      }

      // Always append in Free Mode
      setInput((prev) => prev + e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finished, started, input, content]);

  // ---- Completion detection ----
  useEffect(() => {
    if (input.length > 0 && input.length === content.length) {
      setFinished(true);
    }
  }, [input, content]);

  // ---- Save result on finish ----
  useEffect(() => {
    if (!finished || startTime === null) return;

    const stats = computeStats();
    saveLessonResult(lessonKey, { wpm: stats.wpm, accuracy: stats.accuracy });
    onComplete?.(stats);
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Compute stats ----
  const computeStats = useCallback((): LessonStats => {
    const elapsedMs = startTime ? Date.now() - startTime : 0;
    const elapsedSec = Math.max(elapsedMs / 1000, 1);
    const minutes = elapsedSec / 60;
    const wpm = minutes > 0 ? Math.round((input.length / 5) / minutes) : 0;

    const totalTyped = input.length;
    const accuracy = totalTyped > 0
      ? Math.round(((totalTyped - mistakes) / totalTyped) * 100)
      : 0;

    return {
      wpm,
      accuracy,
      mistakes,
      elapsedSeconds: Math.floor(elapsedSec),
    };
  }, [input, mistakes, startTime]);

  // ---- Live stats for display ----
  const liveWpm = useMemo(() => {
    if (!started || elapsed === 0) return 0;
    const minutes = elapsed / 60;
    return Math.round((input.length / 5) / minutes);
  }, [started, elapsed, input.length]);

  const liveAccuracy = useMemo(() => {
    const total = input.length;
    if (total === 0) return 0;
    return Math.round(((total - mistakes) / total) * 100);
  }, [input.length, mistakes]);

  // ---- Restart ----
  const restart = useCallback(() => {
    setInput("");
    setStarted(false);
    setFinished(false);
    setMistakes(0);
    setMistakeIndices(new Set());
    setStartTime(null);
    setElapsed(0);
    inputRef.current?.focus();
  }, []);

  // ---- Character rendering (memoized) ----
  const chars = useMemo(() => {
    return content.split("").map((char, index) => {
      const isActive = !finished && index === currentIndex;
      let cls = "le-char le-char-untyped"; // default: gray

      if (isActive) {
        cls = "le-char le-char-active";
      } else if (index < input.length) {
        if (input[index] === char) {
          cls = mistakeIndices.has(index)
            ? "le-char le-char-corrected"   // faded-red (was wrong, then corrected)
            : "le-char le-char-correct";    // green
        } else {
          cls = "le-char le-char-wrong";    // red
        }
      }

      return (
        <span key={index} className={cls}>
          {char}
        </span>
      );
    });
  }, [content, input, currentIndex, mistakeIndices, finished]);

  // ---- Format elapsed as mm:ss ----
  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // ---- Result screen (delegated to parent via onComplete) ----
  if (finished) {
    return null;
  }

  // ---- Typing view ----
  return (
    <div style={{ maxWidth: "780px", margin: "0 auto" }}>
      {/* Stats bar */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.9rem", fontSize: "0.82rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <span style={{ color: "#666", fontSize: "0.9rem" }}>⏱</span>
          <span style={{ fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
            {formatTime(elapsed)}
          </span>
        </div>
        <div style={{ width: "1px", height: "24px", background: "#2A2A2A" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#555", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "2px" }}>LIVE WPM</div>
          <div style={{ fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{liveWpm}</div>
        </div>
        <div style={{ width: "1px", height: "24px", background: "#2A2A2A" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#555", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "2px" }}>ACCURACY</div>
          <div style={{ fontWeight: 700, color: "#4ADE80", fontVariantNumeric: "tabular-nums" }}>{liveAccuracy}%</div>
        </div>
      </div>

      {/* Typing box */}
      <div
        ref={containerRef}
        className="typing-box"
        onClick={() => inputRef.current?.focus()}
      >
        <div
          style={{
            fontFamily: "var(--font-jetbrains, 'JetBrains Mono', 'Courier New', monospace)",
            fontSize: "18px",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          {chars}
        </div>

        {!started && (
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#555", fontSize: "0.85rem", pointerEvents: "none",
          }}>
            Click here and start typing...
          </div>
        )}
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />

      {/* Action row */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem" }}>
        <button onClick={restart} className="ghost-btn">↻ RESTART</button>
        {onBack && (
          <>
            <span style={{ width: "1px", height: "16px", background: "#2A2A2A" }} />
            <button onClick={onBack} className="ghost-btn">← BACK</button>
          </>
        )}
      </div>

      {/* Typing tips (only for specific beginner lessons) */}
      {showTips && (
        <div className="info-card" style={{ marginTop: "1.5rem" }}>
          <h4 style={{ color: "#E8A838", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
            TYPING TIP
          </h4>
          <ul style={{ color: "#888", fontSize: "0.8rem", lineHeight: 1.7, margin: 0, paddingLeft: "1.2rem" }}>
            <li>Place your fingers on the <span style={{ color: "#E8A838" }}>home row</span>: A S D F — J K L ;</li>
            <li>Keep your wrists relaxed and slightly elevated</li>
            <li>Focus on <span style={{ color: "#E8A838" }}>accuracy first</span>, speed follows naturally</li>
            <li>Use the correct finger for each key</li>
          </ul>
        </div>
      )}
    </div>
  );
}
