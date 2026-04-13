"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { levels } from "@/lib/lessons";
import { getLevelStats, isLessonCompleted, getLessonResult } from "@/lib/storage";

export default function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = React.use(params);
  const [mounted, setMounted] = useState(false);
  const [globalStats, setGlobalStats] = useState({ percentComplete: 0, avgWpm: 0, avgAccuracy: 0 });
  const [lessonStates, setLessonStates] = useState<Record<string, { locked: boolean, completed: boolean, bestAcc: number }>>({});
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const level = levels.find((l) => l.id === levelId);

  useEffect(() => {
    setMounted(true);
    if (!level) return;

    // All global lessons to compute sequential logic
    const allGlobalLessons: string[] = [];
    levels.forEach(lvl => {
      lvl.sections.forEach(sec => {
        sec.lessons.forEach(lsn => {
          allGlobalLessons.push(`${lvl.id}/${sec.id}/${lsn.id}`);
        });
      });
    });

    const levelKeys = level.sections.flatMap(sec => sec.lessons.map(l => `${level.id}/${sec.id}/${l.id}`));
    const st = getLevelStats(level.id, levelKeys);
    setGlobalStats({ percentComplete: st.percentComplete, avgWpm: st.avgWpm, avgAccuracy: st.avgAccuracy });

    const newStates: Record<string, { locked: boolean, completed: boolean, bestAcc: number }> = {};
    level.sections.forEach(sec => {
      sec.lessons.forEach(lsn => {
        const key = `${level.id}/${sec.id}/${lsn.id}`;
        const globalIdx = allGlobalLessons.indexOf(key);
        const comp = isLessonCompleted(key);
        const result = getLessonResult(key);

        let locked = false;
        if (globalIdx > 0) {
          const prevLessonKey = allGlobalLessons[globalIdx - 1];
          if (!isLessonCompleted(prevLessonKey)) {
            locked = true;
          }
        }

        newStates[key] = { locked, completed: comp, bestAcc: result ? result.accuracy : 0 };
      });
    });

    setLessonStates(newStates);
  }, [level]);

  const toggleSection = (secId: string) => {
    setCollapsedSections(prev => ({ ...prev, [secId]: !prev[secId] }));
  };

  if (!level) return notFound();
  if (!mounted) return <div className="p-8 text-[#888]">Loading...</div>;

  return (
    <div className="max-w-[1024px] w-full mx-auto py-12 px-4 font-sans text-white">
      <div className="mb-6">
        <Link href="/lessons" className="text-[#888] hover:text-white transition-colors text-[0.75rem] font-bold tracking-widest uppercase">
          ← Back to Curriculum
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-black mb-6">{level.title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]\s?[-\u2014]?\s?/, '')}</h1>
        
        {/* Stats header */}
        <div className="flex items-center gap-12 border-b border-[#222] pb-6">
          <div>
            <div className="text-[0.65rem] font-extrabold tracking-[0.15em] text-[#666] uppercase mb-1">Completed</div>
            <div className="text-3xl font-black text-white">{globalStats.percentComplete}%</div>
          </div>
          <div>
            <div className="text-[0.65rem] font-extrabold tracking-[0.15em] text-[#666] uppercase mb-1">Avg WPM</div>
            <div className="text-3xl font-black text-white">{globalStats.avgWpm > 0 ? globalStats.avgWpm : '-'}</div>
          </div>
          <div>
            <div className="text-[0.65rem] font-extrabold tracking-[0.15em] text-[#666] uppercase mb-1">Avg Accuracy</div>
            <div className="text-3xl font-black text-white">{globalStats.avgAccuracy > 0 ? `${globalStats.avgAccuracy}%` : '-'}</div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-10">
        {level.sections.map((sec) => {
          const isCollapsed = collapsedSections[sec.id];

          return (
             <div key={sec.id} className="w-full">
                {/* Section Header */}
                <button 
                  onClick={() => toggleSection(sec.id)}
                  className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity focus:outline-none"
                >
                  <svg 
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                  <span className="text-[0.7rem] font-bold tracking-[0.15em] text-[#888] uppercase">
                    {sec.title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]\s?/, '')}
                  </span>
                </button>

                {/* Section Content */}
                {!isCollapsed && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sec.lessons.map((lsn) => {
                      const key = `${level.id}/${sec.id}/${lsn.id}`;
                      const st = lessonStates[key] || { locked: true, completed: false, bestAcc: 0 };
                      const path = `/lessons/${level.id}/${sec.id}/${lsn.id}`;
                      
                      return (
                        <div key={lsn.id}>
                          {st.completed ? (
                            // COMPLETED CARD
                            <div className="w-full h-[155px] bg-[#121212] border border-[#064e3b] hover:border-[#047857] rounded-xl p-5 flex flex-col justify-between transition-colors shadow-sm">
                              <div>
                                <div className="flex justify-between items-start mb-1">
                                  <div className="text-[0.55rem] font-bold tracking-[0.15em] text-[#666] uppercase">
                                    {sec.id.replace(/-/g, ' ')}
                                  </div>
                                  <div className="w-4 h-4 rounded-full border border-[#34D399] text-[#34D399] flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                  </div>
                                </div>
                                <div className="text-white font-bold text-[0.95rem] leading-snug mb-2 pr-6">{lsn.title}</div>
                                <div className="flex items-center gap-1.5 text-[#34D399] text-[0.65rem] font-bold uppercase tracking-widest">
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                  BEST: {st.bestAcc}%
                                </div>
                              </div>
                              <Link href={path} className="w-full block">
                                <div className="w-full bg-[#1c1c1c] hover:bg-[#252525] border border-[#2a2a2a] text-[#888] text-[0.65rem] font-bold py-[0.4rem] rounded-lg text-center tracking-widest transition-colors mt-2">
                                  RETRY
                                </div>
                              </Link>
                            </div>
                          ) : st.locked ? (
                            // LOCKED CARD
                            <div className="w-full h-[155px] bg-[#0A0A0A] border border-[#161616] opacity-[0.65] rounded-xl p-5 flex flex-col justify-between select-none shadow-none">
                              <div>
                                <div className="flex justify-between items-start mb-1">
                                  <div className="text-[0.55rem] font-bold tracking-[0.15em] text-[#444] uppercase">
                                    {sec.id.replace(/-/g, ' ')}
                                  </div>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </div>
                                <div className="text-[#555] font-bold text-[0.95rem] leading-snug">{lsn.title}</div>
                                <div className="text-[#EF4444] text-[0.65rem] font-bold uppercase tracking-widest mt-2">
                                  85% REQUIRED
                                </div>
                              </div>
                              <div className="w-full bg-[#111] border border-[#1a1a1a] text-[#444] flex items-center justify-center gap-1.5 text-[0.65rem] font-bold py-[0.4rem] rounded-lg text-center tracking-widest mt-2">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                LOCKED
                              </div>
                            </div>
                          ) : (
                            // UNLOCKED NEXT CARD
                            <div className="w-full h-[155px] bg-[#121212] border border-[#333] hover:border-[#444] rounded-xl p-5 flex flex-col justify-between transition-colors shadow-sm">
                              <div>
                                <div className="text-[0.55rem] font-bold tracking-[0.15em] text-[#888] mb-1 uppercase">
                                  ALL {sec.id.replace(/-/g, ' ')}
                                </div>
                                <div className="text-white font-bold text-[0.95rem] leading-snug">{lsn.title}</div>
                              </div>
                              <Link href={path} className="w-full block">
                                <div className="w-full bg-[#FBBF24] hover:bg-[#F59E0B] text-black flex items-center justify-center gap-1.5 text-[0.65rem] font-bold py-[0.4rem] rounded-lg text-center tracking-widest transition-colors mt-2">
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                  START
                                </div>
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
             </div>
          );
        })}
      </div>
      
      {/* ===== ADVERTISEMENT PLACEHOLDER ===== */}
      <div className="w-full h-[100px] mt-12 flex items-center justify-center border-2 border-dashed border-[#333] bg-[#0f0f0f] text-[#555] font-bold tracking-widest text-[0.75rem] rounded-xl">
        ADVERTISEMENT SPACE
      </div>
    </div>
  );
}
