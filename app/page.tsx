import React from 'react';
import Link from 'next/link';
import TypingTest from '@/components/TypingTest';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FBBF24] selection:text-black">
      <main className="max-w-[900px] mx-auto px-6 py-20 lg:py-24">
        
        {/* TYPING TEST EMBED */}
        <div className="w-full mb-12">
          <TypingTest />
        </div>

        {/* WHAT IS WPM? */}
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-6 text-white tracking-tight">What is WPM?</h2>
          <div className="text-[#999] leading-relaxed space-y-6 text-[1.05rem]">
            <p>
              When measuring your typing speed, the most universally accepted metric is <strong>Words Per Minute (WPM)</strong>. However, what most people don't realize is that a "word" in typing metrics isn't determined by dictionary definitions. Instead, the industry-standard formula dictates that exactly <strong>1 word equals 5 characters</strong> (including spaces and punctuation).
            </p>
            <p>
              This standardized method ensures consistency. If you type the word "antidisestablishmentarianism," you aren't credited for one single word—you are proportionally rewarded for the physical keystrokes you performed. A user who types complex technical jargon works harder per "word" than someone typing simple three-letter words, and the 5-character mathematical baseline levels that playing field completely.
            </p>
            <p>
              At TypingPeak, we utilize this standard and divide it into two primary readings: <strong>Standard WPM</strong> and <strong>Live WPM</strong>. The Live WPM provides mathematical feedback updating instantaneously based on your time elapsed, whereas Standard WPM grounds your final score across your duration, preventing you from gaming the system by stopping early. By monitoring these, you generate a highly accurate representation of your physical mechanical speed.
            </p>
          </div>
        </section>

        {/* WHAT IS ACCURACY? */}
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-6 text-white tracking-tight">What is Accuracy?</h2>
          <div className="text-[#999] leading-relaxed space-y-6 text-[1.05rem]">
            <p>
              While WPM measures raw speed, <strong>Accuracy</strong> represents your precision. The formula for accuracy is highly straightforward: it is the total number of correctly typed keystrokes divided by the total number of keystrokes attempted, expressed as a total percentage. If you press 100 keys and make 5 mistakes, your accuracy stands immediately at 95%.
            </p>
            <p>
              Why does this matter? Simply put, raw speed without accuracy generates compounding negative momentum. Every mistake requires a physical backspace correction, completely breaking your typing flow, throwing off your established rhythm, and consuming significantly more time than typing characters slowly but correctly the first time. Professionals often operate at an accuracy of 98% or higher, knowing inherently that slowing down to prevent typos actually results in a faster overall task completion rate.
            </p>
            <p>
              This is why TypingPeak enforces strict sequential progression thresholds. You cannot simply brute-force your way through our curriculum; forcing an 85% accuracy gate requirement builds fundamental touch-typing muscle memory correctly from the ground up.
            </p>
          </div>
        </section>

        {/* ADVERTISEMENT PLACEHOLDER */}
        <div className="w-full h-[120px] mb-20 flex items-center justify-center border-2 border-dashed border-[#333] bg-[#0f0f0f] text-[#555] font-bold tracking-widest text-sm rounded-xl">
          ADVERTISEMENT SPACE
        </div>

        {/* HOW TYPING SPEED IS CALCULATED */}
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-6 text-white tracking-tight">How Typing Speed is Calculated</h2>
          <div className="text-[#999] leading-relaxed space-y-6 text-[1.05rem]">
            <p>
              The digital landscape is flooded with typing platforms that mathematically inflate scores to validate their users. TypingPeak utilizes a strict <strong>Hybrid Scoring System</strong> that actively prevents artificial score boosting and ensures total transparency across your metrics.
            </p>
            <p>
              Here is precisely how the calculation differs:
            </p>
            <ul className="list-none space-y-5 mt-4">
              <li className="bg-[#121212] border border-[#222] p-6 rounded-xl">
                <strong className="text-[#FBBF24] block mb-2 text-lg">Standard WPM</strong> 
                Calculated using the formula <code className="bg-[#1a1a1a] text-white px-2 py-1 rounded text-sm mx-1">(Correct Characters / 5) / Full Selected Duration</code>. If you elect to run a 60-second test but stop typing violently at the 35-second mark out of frustration, the denominator remains firmly locked at 60 seconds. This aggressively prevents sprint-stop manipulation and strictly measures stamina.
              </li>
              <li className="bg-[#121212] border border-[#222] p-6 rounded-xl">
                <strong className="text-[#FBBF24] block mb-2 text-lg">Live WPM</strong> 
                Calculated dynamically during your active run via <code className="bg-[#1a1a1a] text-white px-2 py-1 rounded text-sm mx-1">(Correct Characters / 5) / Active Time Elapsed</code>. Because elapsed time is an actively moving numerator, this creates the motivational burst speed measurement seen directly above your typing box.
              </li>
            </ul>
          </div>
        </section>

        {/* WHY IMPROVE YOUR TYPING SPEED? */}
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-6 text-white tracking-tight">Why Improve Your Typing Speed?</h2>
          <div className="text-[#999] leading-relaxed space-y-6 text-[1.05rem]">
            <ul className="space-y-4 text-[#888]">
               <li className="flex gap-4 items-start">
                 <span className="text-[#FBBF24] font-black text-xl leading-none mt-1">✓</span> 
                 <span><strong className="text-white">Workplace productivity:</strong> Almost every professional environment involves extensive email communication, documentation, and chat logistics. Typing faster natively slashes communication execution overhead by hours every single week.</span>
               </li>
               <li className="flex gap-4 items-start">
                 <span className="text-[#FBBF24] font-black text-xl leading-none mt-1">✓</span> 
                 <span><strong className="text-white">Government exams:</strong> Specialized clerk, administrative, and federal service examinations implement intensely strict timed typing assessments, often gatekeeping highly sought-after careers behind high minimum net WPM requirements.</span>
               </li>
               <li className="flex gap-4 items-start">
                 <span className="text-[#FBBF24] font-black text-xl leading-none mt-1">✓</span> 
                 <span><strong className="text-white">Coding speed:</strong> Programming is inherently cognitive, but physical dexterity matters. Reaching symbols faster and eliminating syntactical typo backspaces prevents broken thoughts, maintaining deeper 'flow states' while constructing logic.</span>
               </li>
               <li className="flex gap-4 items-start">
                 <span className="text-[#FBBF24] font-black text-xl leading-none mt-1">✓</span> 
                 <span><strong className="text-white">Reduce fatigue:</strong> Searching for keys and straining mechanically creates compounding micro-stress on tendons across long sessions. Proper touch typing ensures equal load distribution across all ten fingers.</span>
               </li>
               <li className="flex gap-4 items-start">
                 <span className="text-[#FBBF24] font-black text-xl leading-none mt-1">✓</span> 
                 <span><strong className="text-white">Communicate faster:</strong> In digital conversations with friends or family, catching up with physical thoughts intuitively without lagging behind translates to much deeper, real-time connectivity.</span>
               </li>
            </ul>
          </div>
        </section>

        {/* ADVERTISEMENT PLACEHOLDER */}
        <div className="w-full h-[120px] mb-20 flex items-center justify-center border-2 border-dashed border-[#333] bg-[#0f0f0f] text-[#555] font-bold tracking-widest text-sm rounded-xl">
          ADVERTISEMENT SPACE
        </div>

        {/* FEATURES OF TYPINGPEAK */}
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-6 text-white tracking-tight">Features of TypingPeak</h2>
          <div className="text-[#999] leading-relaxed space-y-6 text-[1.05rem]">
            <p>
              We built our environment carefully to avoid all visual distractions and strictly prioritize core performance mechanics over messy flash gimmicks.
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mt-8">
              <li className="bg-[#121212] border border-[#222] rounded-xl p-6 hover:border-[#333] transition-colors">
                 <strong className="text-white block mb-2 font-black">Free typing test</strong>
                 <p className="text-[0.95rem]">Instantly dive into the core interface without login walls or mandatory configurations blocking the experience.</p>
              </li>
              <li className="bg-[#121212] border border-[#222] rounded-xl p-6 hover:border-[#333] transition-colors">
                 <strong className="text-white block mb-2 font-black">Duration options</strong>
                 <p className="text-[0.95rem]">Select rigorous test parameters of exactly 15, 30, 60, or 120 seconds to establish short burst benchmarks or deep stamina routines.</p>
              </li>
              <li className="bg-[#121212] border border-[#222] rounded-xl p-6 hover:border-[#333] transition-colors">
                 <strong className="text-white block mb-2 font-black">Real-time highlighting</strong>
                 <p className="text-[0.95rem]">Track precise visual feedback identifying mistakes instantly right under your cursor without looking up at menus.</p>
              </li>
              <li className="bg-[#121212] border border-[#222] rounded-xl p-6 hover:border-[#333] transition-colors">
                 <strong className="text-white block mb-2 font-black">Hybrid WPM scoring</strong>
                 <p className="text-[0.95rem]">Validate true completion statistics against inflating industry averages to understand physical reality.</p>
              </li>
              <li className="bg-[#121212] border border-[#222] rounded-xl p-6 hover:border-[#333] transition-colors">
                 <strong className="text-white block mb-2 font-black">Accuracy tracking</strong>
                 <p className="text-[0.95rem]">Monitor raw mistake percentages mathematically, shifting priorities away from chaotic speed forcing toward calculated precision.</p>
              </li>
              <li className="bg-[#121212] border border-[#222] rounded-xl p-6 hover:border-[#333] transition-colors">
                 <strong className="text-white block mb-2 font-black">Structured lessons</strong>
                 <p className="text-[0.95rem]">A unified 46-part hierarchical curriculum taking completely oblivious typists directly to advanced multi-symbol code mastery sequentially.</p>
              </li>
              <li className="bg-[#121212] border border-[#222] rounded-xl p-6 md:col-span-2 hover:border-[#333] transition-colors">
                 <strong className="text-white block mb-2 font-black">Mobile responsive</strong>
                 <p className="text-[0.95rem]">Fully structurally optimized engine frameworks that support modern mobile keyboards natively for testing speeds away from the office context.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* WHO SHOULD USE TYPINGPEAK? */}
        <section className="mb-24">
          <h2 className="text-3xl font-black mb-6 text-white tracking-tight">Who Should Use TypingPeak?</h2>
          <div className="text-[#999] leading-relaxed space-y-6 text-[1.05rem]">
            <p>
              It doesn't matter your background—everybody benefits from increased digital bandwidth. <strong className="text-white tracking-wide">Students</strong> use us to format massive thesis documentation quickly hours before absolute deadlines. High-stakes <strong className="text-white tracking-wide">job seekers</strong> and candidates aggressively drill tests here precisely because our lack of score inflation mathematically simulates accurate pressure environments. 
            </p>
            <p>
              <strong className="text-white tracking-wide">Data entry professionals</strong> continuously grind the advanced numerical systems within our tiered layout logic to lock down peripheral keyboard clusters reliably. Advanced <strong className="text-white tracking-wide">programmers</strong> use our advanced symbols testing explicitly designed to break dependencies on the mouse cursor. <strong className="text-white tracking-wide">Writers</strong> naturally benefit by removing the massive bottleneck existing between their hyper-speed cognitive processing pipelines and the physical output restrictions of a keyboard. 
            </p>
            <p className="text-[#FBBF24] font-bold tracking-wide mt-6 text-xl">
              Bottom line—if you exist digitally, this accelerates your baseline reality.
            </p>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-white border-b border-[#222] pb-6">FAQ</h2>
          <div className="space-y-6">
            <div className="bg-[#121212] border border-[#222] rounded-xl p-8 hover:border-[#333] transition-colors">
              <h3 className="text-[#FBBF24] font-bold text-xl mb-3">What is a good typing speed?</h3>
              <p className="text-[#999] leading-relaxed text-[0.95rem]">
                The global average typing speed hovers somewhere around 35 to 45 WPM entirely depending on localized demographics. If you exceed 70+ WPM while maintaining over 97% accuracy, you operate within a highly competitive upper echelon suitable for virtually any demanding high-speed digital profession. Top typists routinely breach 120 WPM.
              </p>
            </div>
            
            <div className="bg-[#121212] border border-[#222] rounded-xl p-8 hover:border-[#333] transition-colors">
              <h3 className="text-[#FBBF24] font-bold text-xl mb-3">Does TypingPeak inflate scores?</h3>
              <p className="text-[#999] leading-relaxed text-[0.95rem]">
                Absolutely no it does not. Competing platforms intentionally tweak numeric feedback by pausing timers when a user hesitates, creating fundamentally broken dopamine loops. TypingPeak strictly forces the standardized 5-character baseline formula and rigorously penalizes incomplete durations, offering cold, unapologetic mathematical reality.
              </p>
            </div>

            <div className="bg-[#121212] border border-[#222] rounded-xl p-8 hover:border-[#333] transition-colors">
              <h3 className="text-[#FBBF24] font-bold text-xl mb-3">Is TypingPeak free?</h3>
              <p className="text-[#999] leading-relaxed text-[0.95rem]">
                Yes, absolutely. Core engine testing frameworks, complete tiered progression logic lessons mapping home row basics up to complicated advanced number integrations, and live real-time analysis scoring metrics are totally free to access permanently without any hidden subscription gates limit.
              </p>
            </div>

            <div className="bg-[#121212] border border-[#222] rounded-xl p-8 hover:border-[#333] transition-colors">
              <h3 className="text-[#FBBF24] font-bold text-xl mb-3">Does TypingPeak store my data?</h3>
              <p className="text-[#999] leading-relaxed text-[0.95rem]">
                No personal data whatsoever is sent externally to tracking servers. The system architecture uses native local caching directly inside your secured browser context instance to remember your best scores and track historical progression metrics across lessons natively offline.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
