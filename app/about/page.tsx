import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-6 py-20 lg:py-28 flex flex-col gap-24 text-[#EDEDED] font-sans selection:bg-[#FBBF24] selection:text-black">
      
      {/* HERO SECTION */}
      <section className="text-center max-w-[800px] mx-auto">
        <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-8">
          Built for <span className="text-[#FBBF24]">real speed.</span>
        </h1>
        <p className="text-xl text-[#888] leading-relaxed font-medium max-w-[650px] mx-auto">
          Most typing platforms inflate scores to make users feel good.<br />
          TypingPeak is built on the opposite principle — <span className="text-white">radical transparency.</span>
        </p>
      </section>

      {/* PROBLEM VS SOLUTION SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card: THE PROBLEM */}
        <div className="bg-[#121212] border border-[#222] rounded-2xl p-10 flex flex-col hover:border-[#333] transition-colors">
          <div className="text-xs font-bold tracking-[0.2em] text-[#EF4444] mb-4 uppercase">
            The Problem
          </div>
          <h2 className="text-3xl font-black mb-8 text-white">Typing sites that lie</h2>
          <ul className="flex flex-col gap-6 text-[#999] font-medium text-[0.95rem]">
             <li className="flex gap-4 items-start"><span className="text-[#EF4444] mt-0.5 font-bold">✕</span> Inflated burst-based scoring</li>
             <li className="flex gap-4 items-start"><span className="text-[#EF4444] mt-0.5 font-bold">✕</span> Ads placed inside the typing area</li>
             <li className="flex gap-4 items-start"><span className="text-[#EF4444] mt-0.5 font-bold">✕</span> Cluttered and distracting UI</li>
             <li className="flex gap-4 items-start"><span className="text-[#EF4444] mt-0.5 font-bold">✕</span> No transparency in scoring formulas</li>
          </ul>
        </div>

        {/* Right Card: THE SOLUTION */}
        <div className="bg-[#121212] border border-[#FBBF24]/30 rounded-2xl p-10 flex flex-col shadow-[0_0_40px_rgba(251,191,36,0.06)] hover:border-[#FBBF24]/50 transition-colors">
          <div className="text-xs font-bold tracking-[0.2em] text-[#FBBF24] mb-4 uppercase">
            The Solution
          </div>
          <h2 className="text-3xl font-black mb-8 text-white">Honest measurement</h2>
          <ul className="flex flex-col gap-6 text-[#999] font-medium text-[0.95rem]">
             <li className="flex gap-4 items-start"><span className="text-[#10B981] mt-0.5 font-bold">✓</span> Industry-standard scoring formulas</li>
             <li className="flex gap-4 items-start"><span className="text-[#10B981] mt-0.5 font-bold">✓</span> Accuracy-first system design</li>
             <li className="flex gap-4 items-start"><span className="text-[#10B981] mt-0.5 font-bold">✓</span> Structured lessons for real improvement</li>
             <li className="flex gap-4 items-start"><span className="text-[#10B981] mt-0.5 font-bold">✓</span> Completely distraction-free typing experience</li>
          </ul>
        </div>
      </section>

      {/* HYBRID ENGINE SECTION */}
      <section>
        <div className="mb-12 text-center">
          <div className="text-xs font-bold tracking-[0.2em] text-[#888] mb-4 uppercase">
            Scoring
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white">The Hybrid Engine</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-10 flex flex-col">
             <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">Standard WPM</h3>
             <div className="font-mono text-[0.85rem] bg-[#0A0A0A] text-[#FBBF24] p-4 rounded-xl mb-8 border border-[#1a1a1a]">
               (Correct Chars / 5) / Full Duration
             </div>
             <ul className="flex flex-col gap-4 text-[#888] text-[0.95rem] font-medium list-none">
               <li className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-[#444] rounded-full"></div> Measures consistency and stamina</li>
               <li className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-[#444] rounded-full"></div> Uses full selected duration (30 / 60 / 120 seconds)</li>
               <li className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-[#444] rounded-full"></div> Prevents inflated scores from early stopping</li>
             </ul>
          </div>
          
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-10 flex flex-col">
             <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">Live WPM</h3>
             <div className="font-mono text-[0.85rem] bg-[#0A0A0A] text-[#FBBF24] p-4 rounded-xl mb-8 border border-[#1a1a1a]">
               (Correct Chars / 5) / Time Elapsed
             </div>
             <ul className="flex flex-col gap-4 text-[#888] text-[0.95rem] font-medium list-none">
               <li className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-[#444] rounded-full"></div> Displays burst typing speed</li>
               <li className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-[#444] rounded-full"></div> Updates dynamically in real time</li>
               <li className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-[#444] rounded-full"></div> Motivational feedback metric</li>
             </ul>
          </div>
        </div>
      </section>

      {/* CORE PRINCIPLES SECTION */}
      <section>
         <div className="mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-[#888] mb-4 uppercase">
            Values
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">Core Principles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
           {[
             'Accuracy over gimmicks', 
             'Transparency over inflated scores', 
             'Structure over random practice', 
             'Performance over flashy design', 
             'Clean ad placement — outside typing area', 
             'Privacy first — no login required'
           ].map((value, i) => (
              <div key={i} className="flex items-center gap-5 bg-[#121212] hover:bg-[#151515] transition-colors border border-[#222] p-6 rounded-[1rem]">
                 <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2a2a2a] flex items-center justify-center text-[#FBBF24] font-bold text-[0.8rem] shrink-0 tracking-wider">
                   0{i+1}
                 </div>
                 <div className="font-bold text-[#EDEDED] text-[0.95rem] tracking-wide">{value}</div>
              </div>
           ))}
        </div>
      </section>

    </div>
  );
}
