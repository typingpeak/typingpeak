export default function Privacy() {
  return (
    <div className="min-h-[calc(100vh-130px)] bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FBBF24] selection:text-black">
      <div className="max-w-[800px] mx-auto px-6 py-20 lg:py-28">
        <div className="text-xs font-bold tracking-[0.2em] text-[#888] mb-4 uppercase">
          Legal
        </div>
        <h1 className="text-4xl lg:text-5xl font-black mb-10 tracking-tight text-white">
          Privacy <span className="text-[#FBBF24]">Policy</span>
        </h1>
        
        <div className="bg-[#121212] border border-[#222] p-8 lg:p-12 rounded-2xl text-[#999] leading-relaxed text-[1.05rem] space-y-6">
          <p>
            TypingPeak is built on the philosophy of radical transparency—and that strict ethos extends entirely to your personal data mechanics. We rigorously do not collect, monitor, harvest, or transmit any identifiable operational profiles to external networks.
          </p>
          <p>
            All executing typing score configurations, completion boundaries, duration validations, and sequential historical metrics are intrinsically mapped and securely retained locally entirely inside your own browser using native <code className="bg-[#1a1a1a] text-[#FBBF24] px-2 py-1 rounded border border-[#333] text-[0.9rem] mx-1">localStorage</code> frameworks. 
          </p>
          <p>
            Because no backend user authorization clusters or cloud databases exist on our architecture end natively, clearing your local browsing data functionally serves as a total irrevocable reset of all progression on our platform.
          </p>
        </div>
      </div>
    </div>
  );
}
