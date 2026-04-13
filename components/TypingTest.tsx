"use client";

import { getParagraph } from "@/lib/paragraphs";
import { useState, useEffect, useRef } from "react";


export default function TypingTest() {
  const [input, setInput] = useState("");
  const [duration, setDuration] = useState<15 | 30 | 60 | 120>(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState("");
  const [fontSize, setFontSize] = useState(18);
  const [mode, setMode] = useState<"free" | "strict">("free");
  const [mistakeIndices, setMistakeIndices] = useState<Set<number>>(new Set());
  const textareaRef = useRef<HTMLInputElement | null>(null);

  const getRealWordCount = () => {
    if (!input.trim()) return 0;
    return input.trim().split(/\s+/).length;
  };

  const getCharacterCount = () => {
    return input.length;
  };

  // Load best score per duration
  useEffect(() => {
    const saved = localStorage.getItem(`bestScore_${duration}`);
    if (saved) setBestScore(Number(saved));
    else setBestScore(null);
  }, [duration]);

  // Load paragraph on duration change (also runs on first load)
  useEffect(() => {
    const paragraph = getParagraph("mixed", duration);
    setCurrentParagraph(paragraph || "");
  }, [duration]);

  // Auto focus hidden input
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Timer logic
  useEffect(() => {
    if (!started || finished) return;

    if (timeLeft === 0) {
      setFinished(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, started, finished]);

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (finished) return;

      if (e.key === " " || e.key === "Backspace" || e.key.length === 1) {
        e.preventDefault();
      }

      if (!started) setStarted(true);

      if (e.key === "Backspace") {
        const lastIndex = input.length - 1;

        if (mode === "free") {
          // Allow backspace if any uncorrected mistake exists behind cursor
          const hasUncorrectedMistake = [...mistakeIndices].some(
            (i) => i < input.length && input[i] !== currentParagraph[i]
          );
          if (!hasUncorrectedMistake && lastIndex >= 0 && input[lastIndex] === currentParagraph[lastIndex]) {
            return; // Block — all behind cursor is clean
          }
        } else {
          // Strict mode — block backspace on correct characters only
          if (lastIndex >= 0 && !mistakeIndices.has(lastIndex) && input[lastIndex] === currentParagraph[lastIndex]) {
            return;
          }
        }

        setInput((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key.length !== 1) return;

      const currentIndex = input.length;
      const expectedChar = currentParagraph[currentIndex];

      if (mode === "strict") {
        if (e.key === expectedChar) {
          setInput((prev) => prev + e.key);
        } else {
          // Record mistake index and increment counter
          setMistakeIndices(prev => {
            const newSet = new Set(prev);
            newSet.add(currentIndex);
            return newSet;
          });
          setMistakes((prev) => prev + 1);
          // Do not append — stay at same index
        }
      } else {
        // Free mode
        if (e.key !== expectedChar) {
          setMistakeIndices(prev => {
            const newSet = new Set(prev);
            newSet.add(currentIndex);
            return newSet;
          });
          setMistakes((prev) => prev + 1);
        }
        setInput((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finished, started, mode, input, currentParagraph, mistakeIndices]);

  // Completion logic
  useEffect(() => {
    if (input === currentParagraph && input.length > 0) {
      setFinished(true);
    }
  }, [input, currentParagraph]);

  // Save best score per duration
  useEffect(() => {
    if (!finished) return;
    const standardWPM = calculateStandardWPM();
    const key = `bestScore_${duration}`;
    const saved = localStorage.getItem(key);
    if (!saved || standardWPM > Number(saved)) {
      localStorage.setItem(key, standardWPM.toString());
      setBestScore(standardWPM);
    }
  }, [finished]);

  // Reset state when page loads (fix refresh showing completed)
  useEffect(() => {
    setFinished(false);
    setStarted(false);
    setInput("");
    setTimeLeft(duration);
    setMistakes(0);
    setMistakeIndices(new Set());
  }, []);

  // Standard WPM (Full Duration)
  const calculateStandardWPM = () => {
    const minutes = duration / 60;
    return Math.round((input.length / 5) / minutes);
  };

  // Live WPM (Actual Time Used)
  const calculateLiveWPM = () => {
    const elapsed = duration - timeLeft;
    const minutes = elapsed / 60;
    if (minutes === 0) return 0;
    return Math.round((input.length / 5) / minutes);
  };

  const calculateAccuracy = () => {
    const totalTyped = input.length + (mode === "strict" ? mistakes : 0);
    if (totalTyped === 0) return 0;
    return Math.round(((totalTyped - mistakes) / totalTyped) * 100);
  };

  const restart = () => {
    setInput("");
    setTimeLeft(duration);
    setStarted(false);
    setFinished(false);
    setMistakes(0);
    setMistakeIndices(new Set());
    textareaRef.current?.focus();
  };

  const changeDuration = (newDuration: 15 | 30 | 60 | 120) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
    setInput("");
    setStarted(false);
    setFinished(false);
    setMistakes(0);
    setMistakeIndices(new Set());
  };

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
      {/* ===== HERO SECTION ===== */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.3rem 0.85rem", borderRadius: "999px",
            border: "1px solid #E8A838", fontSize: "0.78rem",
            color: "#E8A838", marginBottom: "1rem", fontWeight: 500,
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ADE80" }} />
          Live typing test
        </div>
        <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          How fast do<br />
          <span style={{ color: "#E8A838" }}>you really type?</span>
        </h1>
        <p style={{ marginTop: "0.75rem", color: "#888", fontSize: "0.9rem", lineHeight: 1.5 }}>
          Dual-metric scoring. No inflated numbers. Your actual<br />speed, measured honestly.
        </p>
      </div>

      {/* ===== CONTROLS BAR ===== */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
        {/* Duration + Mode */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
          {([15, 30, 60, 120] as const).map((time) => (
            <button
              key={time}
              disabled={started}
              onClick={() => changeDuration(time)}
              className={`pill-btn ${duration === time ? "active" : ""}`}
            >
              {time}s
            </button>
          ))}
          <span style={{ width: "1px", height: "18px", background: "#2A2A2A", margin: "0 0.5rem" }} />
          <button disabled={started} onClick={() => setMode("free")} className={`pill-btn ${mode === "free" ? "active" : ""}`}>Free</button>
          <button disabled={started} onClick={() => setMode("strict")} className={`pill-btn ${mode === "strict" ? "active" : ""}`}>Strict</button>
        </div>

        {/* Live Stats */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", fontSize: "0.82rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ color: "#666", fontSize: "0.9rem" }}>⏱</span>
            <span style={{ fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{timeLeft}</span>
          </div>
          <div style={{ width: "1px", height: "24px", background: "#2A2A2A" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#555", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "2px" }}>LIVE WPM</div>
            <div style={{ fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{calculateLiveWPM()}</div>
          </div>
          <div style={{ width: "1px", height: "24px", background: "#2A2A2A" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#555", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "2px" }}>ACCURACY</div>
            <div style={{ fontWeight: 700, color: "#4ADE80", fontVariantNumeric: "tabular-nums" }}>{calculateAccuracy()}%</div>
          </div>
        </div>
      </div>

      {/* ===== TYPING BOX ===== */}
      <div className="typing-box" onClick={() => textareaRef.current?.focus()}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: `${fontSize}px`,
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          {currentParagraph.split("").map((char, index) => {
            let color = "#555";
            if (index < input.length) {
              if (input[index] === char) {
                color = mistakeIndices.has(index) ? "#F87171" : "#4ADE80";
              } else {
                color = "#EF4444";
              }
            }
            const isCursor = !finished && index === input.length;
            return (
              <span key={index} style={{ color }} className={isCursor ? "tt-cursor" : ""}>
                {char}
              </span>
            );
          })}
        </div>
        {!started && !finished && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#555", fontSize: "0.85rem", pointerEvents: "none" }}>
            Click here and start typing...
          </div>
        )}
      </div>

      {/* Hidden Input */}
      <input ref={textareaRef} style={{ opacity: 0, position: "absolute", pointerEvents: "none" }} autoComplete="off" autoCorrect="off" spellCheck={false} />

      {/* ===== ACTION ROW ===== */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem" }}>
        <button
          disabled={started}
          onClick={() => {
            const paragraph = getParagraph("mixed", duration);
            setCurrentParagraph(paragraph || "");
            setInput("");
            setStarted(false);
            setFinished(false);
            setMistakes(0);
            setMistakeIndices(new Set());
            setTimeLeft(duration);
          }}
          className="ghost-btn"
        >
          ⟳ New Text
        </button>
        <span style={{ width: "1px", height: "16px", background: "#2A2A2A" }} />
        <button onClick={() => setFontSize((prev) => Math.max(14, prev - 2))} className="ghost-btn">A−</button>
        <button onClick={() => setFontSize((prev) => Math.min(40, prev + 2))} className="ghost-btn">A+</button>
        <span style={{ width: "1px", height: "16px", background: "#2A2A2A" }} />
        <button onClick={restart} className="ghost-btn">↻ RESET</button>
      </div>

      {/* ===== RESULTS (when finished) ===== */}
      {finished && (
        <div className="results-card">
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#E8A838", marginBottom: "1.25rem", textAlign: "center" }}>
            Test Complete!
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", textAlign: "center" }}>
            <div>
              <div style={{ color: "#555", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "4px" }}>STANDARD WPM</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>{calculateStandardWPM()}</div>
            </div>
            <div>
              <div style={{ color: "#555", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "4px" }}>LIVE WPM</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>{calculateLiveWPM()}</div>
            </div>
            <div>
              <div style={{ color: "#555", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "4px" }}>ACCURACY</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#4ADE80" }}>{calculateAccuracy()}%</div>
            </div>
            <div>
              <div style={{ color: "#555", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "4px" }}>MISTAKES</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#EF4444" }}>{mistakes}</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1rem", fontSize: "0.8rem", color: "#666" }}>
            <span>Words: {getRealWordCount()}</span>
            <span>Chars: {getCharacterCount()}</span>
            {bestScore !== null && (
              <span>Best ({duration}s): <span style={{ color: "#E8A838", fontWeight: 600 }}>{bestScore}</span></span>
            )}
          </div>
        </div>
      )}

      {/* ===== BEST SCORE (when not finished) ===== */}
      {!finished && bestScore !== null && (
        <div style={{ textAlign: "center", marginTop: "0.5rem", fontSize: "0.8rem", color: "#555" }}>
          Best WPM ({duration}s): <span style={{ color: "#E8A838", fontWeight: 600 }}>{bestScore}</span>
        </div>
      )}

      {/* ===== INFO CARDS ===== */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
        <div className="info-card">
          <h4 style={{ color: "#E8A838", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "0.5rem" }}>STANDARD WPM</h4>
          <p style={{ color: "#888", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
            (Correct chars / 5) ÷ <span style={{ color: "#E8A838" }}>full duration</span>. Your stamina score — penalizes stopping early.
          </p>
        </div>
        <div className="info-card">
          <h4 style={{ color: "#999", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "0.5rem" }}>LIVE WPM</h4>
          <p style={{ color: "#888", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
            (Correct chars / 5) ÷ <span style={{ color: "#E8A838" }}>time elapsed</span>. Your burst speed — <span style={{ color: "#E8A838" }}>updates in real time</span>.
          </p>
        </div>
      </div>

      {/* ===== ADVERTISEMENT PLACEHOLDER ===== */}
      <div className="w-full h-[100px] mt-10 flex items-center justify-center border-2 border-dashed border-[#333] bg-[#0f0f0f] text-[#555] font-bold tracking-widest text-[0.75rem] rounded-xl">
        ADVERTISEMENT SPACE
      </div>
    </div>
  );
}
