"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { levels } from "@/lib/lessons";
import { getLevelStats } from "@/lib/storage";

export default function LessonsPage() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<Record<string, ReturnType<typeof getLevelStats>>>({});
  const [globalCompleted, setGlobalCompleted] = useState(0);

  useEffect(() => {
    setMounted(true);
    const s: Record<string, ReturnType<typeof getLevelStats>> = {};
    let g = 0;
    levels.forEach(lvl => {
      const keys = lvl.sections.flatMap(sec => sec.lessons.map(l => `${lvl.id}/${sec.id}/${l.id}`));
      const st = getLevelStats(lvl.id, keys);
      s[lvl.id] = st;
      g += st.completedCount;
    });
    setStats(s);
    setGlobalCompleted(g);
  }, []);

  if (!mounted) return <div className="p-8 text-[#888]">Loading...</div>;

  return (
    <div className="max-w-[800px] w-full mx-auto py-12 px-4 font-sans text-white">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-block border border-[#333] rounded-full px-4 py-1 text-[0.65rem] text-[#888] font-bold tracking-[0.1em] mb-4">
          CURRICULUM
        </div>
        <h1 className="text-5xl font-black text-[#FBBF24] tracking-tight mb-4">
          Structured<br />
          <span className="text-white">Lessons.</span>
        </h1>
        <p className="text-[#888] mb-6 font-medium text-[0.95rem]">
          Progressive skill building. Reach a <span className="font-bold text-white">85% accuracy</span> to unlock the next lesson.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-1 bg-[#222] rounded-full overflow-hidden">
            <div className="h-full bg-[#FBBF24] transition-all duration-500" style={{ width: `${(globalCompleted / 46) * 100}%` }}></div>
          </div>
          <div className="text-xs font-bold text-[#666] tracking-widest">{globalCompleted}/46</div>
        </div>
      </div>

      {/* Levels list */}
      <div className="flex flex-col gap-6">
        {levels.map((lvl) => {
          const st = stats[lvl.id] || { completedCount: 0, totalCount: 0, percentComplete: 0, avgWpm: 0, avgAccuracy: 0 };
          return (
            <Link key={lvl.id} href={`/lessons/${lvl.id}`} className="block">
              <div className="bg-[#121212] border border-[#222222] rounded-[1.5rem] p-8 hover:border-[#333333] hover:bg-[#151515] transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-black mb-1">{lvl.title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]\s?[-\u2014]?\s?/, '')}</h2>
                    <p className="text-[#888] text-sm">
                      {lvl.id === 'beginner' && "Build muscle memory, learn proper finger positioning, and improve accuracy."}
                      {lvl.id === 'intermediate' && "Focus on capitalization, punctuation, and complex words."}
                      {lvl.id === 'advanced' && "Code snippets, numbers, and symbols for professionals."}
                    </p>
                  </div>
                  <div className="bg-[#0f291e] text-[#34D399] text-[0.7rem] font-bold px-3 py-1.5 rounded-full border border-[#204a37] tracking-wider uppercase">
                    {st.completedCount} / {st.totalCount} completed
                  </div>
                </div>

                {/* Level Stats */}
                <div className="grid grid-cols-3 gap-4 border-t border-[#222] pt-6 mt-2">
                   <div>
                    <div className="text-[#666] text-[0.65rem] font-bold tracking-[0.1em] mb-1 uppercase">Completed</div>
                    <div className="text-2xl font-black text-white">{st.percentComplete}%</div>
                  </div>
                  <div>
                    <div className="text-[#666] text-[0.65rem] font-bold tracking-[0.1em] mb-1 uppercase">Avg WPM</div>
                    <div className="text-2xl font-black text-white">{st.avgWpm > 0 ? st.avgWpm : '-'}</div>
                  </div>
                  <div>
                    <div className="text-[#666] text-[0.65rem] font-bold tracking-[0.1em] mb-1 uppercase">Avg Accuracy</div>
                    <div className="text-2xl font-black text-white">{st.avgAccuracy > 0 ? `${st.avgAccuracy}%` : '-'}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
