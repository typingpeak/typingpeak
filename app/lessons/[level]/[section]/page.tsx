"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { levels } from "@/lib/lessons";
import { isLessonCompleted } from "@/lib/storage";

export default function SectionPage({ params }: { params: Promise<{ level: string; section: string }> }) {
  const { level: levelId, section: sectionId } = React.use(params);
  const [mounted, setMounted] = useState(false);
  const [lessonStates, setLessonStates] = useState<Record<string, { locked: boolean, completed: boolean }>>({});

  const level = levels.find((l) => l.id === levelId);
  const section = level?.sections.find((s) => s.id === sectionId);

  useEffect(() => {
    setMounted(true);
    if (!level || !section) return;

    // Strict sequential global checking
    const allGlobalLessons: string[] = [];
    levels.forEach(lvl => {
      lvl.sections.forEach(sec => {
        sec.lessons.forEach(lsn => {
          allGlobalLessons.push(`${lvl.id}/${sec.id}/${lsn.id}`);
        });
      });
    });

    const newStates: Record<string, { locked: boolean, completed: boolean }> = {};

    section.lessons.forEach(lsn => {
      const key = `${level.id}/${section.id}/${lsn.id}`;
      const globalIdx = allGlobalLessons.indexOf(key);
      const isCompleted = isLessonCompleted(key);

      let locked = false;
      // Index 0 represents beginner/home-row/1 and is always unlocked
      if (globalIdx > 0) {
        const prevLessonKey = allGlobalLessons[globalIdx - 1];
        if (!isLessonCompleted(prevLessonKey)) {
          locked = true;
        }
      }

      newStates[lsn.id] = { locked, completed: isCompleted };
    });

    setLessonStates(newStates);
  }, [level, section]);

  if (!level || !section) return notFound();
  if (!mounted) return <div className="p-8 text-[#888]">Loading...</div>;

  return (
    <div className="max-w-[800px] w-full mx-auto py-12 px-4 font-sans text-white">
       <div className="mb-6">
        <Link href={`/lessons/${level.id}`} className="text-[#888] hover:text-white transition-colors text-[0.75rem] font-bold tracking-widest uppercase">
          ← Back to {level.title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]\s?[-\u2014]?\s?/, '')}
        </Link>
      </div>
      <div className="mb-10">
         <div className="text-[0.65rem] font-bold tracking-[0.1em] text-[#666] mb-1 uppercase.">SECTION VIEW</div>
        <h1 className="text-4xl font-black text-white">{section.title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]\s?/, '')}</h1>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {section.lessons.map((lsn, index) => {
          const st = lessonStates[lsn.id] || { locked: true, completed: false };
          const lessonNumber = index + 1;
          
          return (
            <div key={lsn.id}>
              {st.locked ? (
                 <div className="w-full h-full bg-[#0f0f0f] border border-[#1a1a1a] rounded-[1.25rem] p-6 opacity-60 flex flex-col justify-between min-h-[140px] shadow-sm select-none">
                    <div>
                      <div className="text-[0.65rem] font-bold tracking-[0.1em] text-[#555] mb-1 uppercase">Lesson {lessonNumber}</div>
                      <div className="text-[#666] font-bold text-lg leading-tight">{lsn.title}</div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                       <span className="text-[#EF4444] text-[0.65rem] font-bold tracking-widest bg-[#3b1515] px-2 py-0.5 rounded border border-[#6b2525]">85% REQUIRED</span>
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                 </div>
              ) : (
                <Link href={`/lessons/${level.id}/${section.id}/${lsn.id}`} className="block h-full cursor-pointer">
                  <div className={`w-full h-full border rounded-[1.25rem] p-6 transition-all min-h-[140px] flex flex-col justify-between shadow-md ${st.completed ? 'bg-[#121212] border-[#204a37] hover:border-[#34D399]' : 'bg-[#121212] border-[#222222] hover:border-[#FBBF24]'}`}>
                    <div>
                      <div className={`text-[0.65rem] font-bold tracking-[0.1em] mb-1 uppercase ${st.completed ? 'text-[#34D399]' : 'text-[#888]'}`}>LESSON {lessonNumber}</div>
                      <div className="text-lg font-bold text-white leading-tight">{lsn.title}</div>
                    </div>
                    
                    <div className="mt-6">
                      {st.completed ? (
                         <div className="flex items-center gap-1.5 text-[#34D399] text-[0.7rem] font-bold tracking-wider uppercase">
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                           Completed
                         </div>
                      ) : (
                        <div className="px-5 py-2.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-black text-[0.75rem] font-bold tracking-widest text-center rounded-xl flex items-center justify-center gap-2 transition-colors">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                          START
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
