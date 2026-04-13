"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, notFound } from "next/navigation";
import { levels } from "@/lib/lessons";
import LessonEngine from "@/components/LessonEngine";
import LessonResultCard from "@/components/LessonResultCard";
import { isLessonCompleted } from "@/lib/storage";

interface LessonStats {
  wpm: number;
  accuracy: number;
  mistakes: number;
  elapsedSeconds: number;
}

export default function IndividualLessonPage({ params }: { params: Promise<{ level: string; section: string; lessonId: string }> }) {
  const { level: levelId, section: sectionId, lessonId: lessonParamId } = React.use(params);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [result, setResult] = useState<LessonStats | null>(null);

  const level = levels.find((l) => l.id === levelId);
  const section = level?.sections.find((s) => s.id === sectionId);
  const lesson = section?.lessons.find((l) => l.id === lessonParamId);

  useEffect(() => {
    if (!level || !section || !lesson) return;
    
    // Authorization Check: prevent routing to a locked lesson
    const allGlobalLessons: string[] = [];
    levels.forEach(lvl => {
      lvl.sections.forEach(sec => {
        sec.lessons.forEach(lsn => {
          allGlobalLessons.push(`${lvl.id}/${sec.id}/${lsn.id}`);
        });
      });
    });
    
    const key = `${level.id}/${section.id}/${lesson.id}`;
    const globalIdx = allGlobalLessons.indexOf(key);

    if (globalIdx > 0) {
      const prevLessonKey = allGlobalLessons[globalIdx - 1];
      if (!isLessonCompleted(prevLessonKey)) {
         router.replace(`/lessons/${level.id}`);
         return;
      }
    }
    
    setMounted(true);
  }, [level, section, lesson, router]);

  if (!level || !section || !lesson) return notFound();
  if (!mounted) return <div className="p-8 text-[#888]">Loading...</div>;

  const key = `${level.id}/${section.id}/${lesson.id}`;

  const handleComplete = (stats: LessonStats) => {
    setResult(stats);
  };

  const handleRestart = () => {
    setResult(null);
  };

  const handleBack = () => {
    router.push(`/lessons/${level.id}`);
  };

  return (
    <div className="max-w-[800px] w-full mx-auto py-12 px-4 font-sans text-white">
      <div className="mb-6 flex justify-between items-center">
        <Link href={`/lessons/${level.id}`} className="text-[#888] hover:text-white transition-colors text-[0.75rem] font-bold tracking-widest uppercase">
          ← Back to {section.title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]\s?/, '')}
        </Link>
        <div className="text-[0.65rem] font-bold tracking-[0.1em] text-[#555] uppercase">
          {level.title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]\s?[-\u2014]?\s?/, '')}
        </div>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black">{lesson.title}</h1>
      </div>

      {result ? (
        <div className="mt-8 flex justify-center">
           <LessonResultCard
            accuracy={result.accuracy}
            wpm={result.wpm}
            mistakes={result.mistakes}
            elapsedSeconds={result.elapsedSeconds}
            onRestart={handleRestart}
            onBack={handleBack}
          />
        </div>
      ) : (
        <LessonEngine
          content={lesson.content}
          lessonKey={key}
          onComplete={handleComplete}
          onBack={handleBack}
          showTips={lesson.showTips}
        />
      )}
    </div>
  );
}
