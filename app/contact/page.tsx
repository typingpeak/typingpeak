export default function Contact() {
  return (
    <div className="min-h-[calc(100vh-130px)] bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FBBF24] selection:text-black">
      <div className="max-w-[800px] mx-auto px-6 py-20 lg:py-28">
        <div className="text-xs font-bold tracking-[0.2em] text-[#888] mb-4 uppercase">
          Communication
        </div>
        <h1 className="text-4xl lg:text-5xl font-black mb-10 tracking-tight text-white">
          Contact <span className="text-[#FBBF24]">Us</span>
        </h1>
        
        <div className="bg-[#121212] border border-[#222] p-8 lg:p-12 rounded-2xl text-[#999] leading-relaxed text-[1.05rem]">
          <p className="mb-8">
            Whether you have localized suggestions mapped regarding our hierarchical engine tests, structural feature expansion feedback algorithms, or broad questions about specific metric configurations, we are completely available to engage directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#0A0A0A] border border-[#1a1a1a] p-6 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-[#FBBF24] flex items-center justify-center shrink-0 border border-[#333]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div>
              <div className="text-[0.7rem] font-black uppercase text-[#666] tracking-widest mb-1">
                Direct Email Inquiry
              </div>
              <a href="mailto:support.typingpeak@gmail.com" className="text-[#EDEDED] hover:text-[#FBBF24] transition-colors font-mono font-bold text-lg tracking-wide">
                support.typingpeak@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
