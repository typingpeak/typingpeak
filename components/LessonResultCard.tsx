"use client";

import React from "react";

interface LessonResultCardProps {
  accuracy: number;
  wpm: number;
  mistakes: number;
  elapsedSeconds: number;
  onRestart: () => void;
  onBack: () => void;
}

export default function LessonResultCard({
  accuracy,
  wpm,
  mistakes,
  elapsedSeconds,
  onRestart,
  onBack,
}: LessonResultCardProps) {
  const passed = accuracy >= 85;

  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-[420px] w-full mx-auto bg-[#121212] border border-[#222222] rounded-[1.5rem] p-8 flex flex-col items-center shadow-xl font-sans">
      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
          passed ? "bg-[#062c19] text-[#34D399]" : "bg-[#3b1515] text-[#EF4444]"
        }`}
      >
        {passed ? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        ) : (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
      </div>

      {/* Title */}
      <h2
        className={`text-[2rem] font-black tracking-tight mb-1 ${
          passed ? "text-[#34D399]" : "text-[#EF4444]"
        }`}
      >
        {passed ? "Passed!" : "Keep Practicing"}
      </h2>
      <p className="text-[#888888] font-medium text-[0.95rem] mb-8 text-center">
        {passed
          ? "Lesson complete. Great work."
          : "You need \u2265 85% accuracy to pass."}
      </p>

      {/* Primary Stats (Accuracy / WPM) */}
      <div className="grid grid-cols-2 gap-4 w-full mb-4">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-6 flex flex-col items-center justify-center">
          <span className="text-[#666666] text-[0.65rem] font-bold tracking-[0.1em] mb-1 uppercase">
            Accuracy
          </span>
          <span className="text-4xl font-black text-[#ffffff]">
            {accuracy}%
          </span>
        </div>
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-6 flex flex-col items-center justify-center">
          <span className="text-[#666666] text-[0.65rem] font-bold tracking-[0.1em] mb-1 uppercase">
            WPM
          </span>
          <span className="text-4xl font-black text-[#ffffff]">{wpm}</span>
        </div>
      </div>

      {/* Secondary Stats (Typos / Time) */}
      <div className="flex items-center justify-center gap-6 text-[#777777] text-sm font-medium mb-8 w-full bg-[#161616] py-3 rounded-xl border border-[#222222]">
        <div>
          Typos:{" "}
          <span
            className={mistakes > 0 ? "text-[#F87171]" : "text-[#34D399]"}
          >
            {mistakes}
          </span>
        </div>
        <div className="w-[1px] h-4 bg-[#333333]"></div>
        <div>
          Time: <span className="text-[#eeeeee]">{formatTime(elapsedSeconds)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-3">
        {passed ? (
          <>
            <button
              onClick={onBack}
              className="w-full py-4 cursor-pointer bg-[#FBBF24] hover:bg-[#F59E0B] text-black font-bold rounded-xl text-[1rem] transition-colors"
            >
              Back to Lessons
            </button>
            <button
              onClick={onRestart}
              className="w-full py-4 cursor-pointer bg-[#222222] hover:bg-[#2a2a2a] text-[#aaaaaa] hover:text-white font-bold rounded-xl text-[1rem] transition-colors relative"
            >
              Practice Again
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onRestart}
              className="w-full py-4 cursor-pointer bg-[#FBBF24] hover:bg-[#F59E0B] text-black font-bold rounded-xl text-[1rem] transition-colors"
            >
              Practice Again
            </button>
            <button
              onClick={onBack}
              className="w-full py-4 cursor-pointer bg-[#222222] hover:bg-[#2a2a2a] text-[#aaaaaa] hover:text-white font-bold rounded-xl text-[1rem] transition-colors"
            >
              Back to Lessons
            </button>
          </>
        )}
      </div>
    </div>
  );
}
