import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-[#1a1a1a]">
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between text-[#666] text-[0.85rem] font-bold tracking-wide">
        <div className="mb-4 sm:mb-0">
          © 2026 TypingPeak
        </div>
        <div className="flex items-center gap-8">
          <Link href="/privacy" className="hover:text-[#FBBF24] transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-[#FBBF24] transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
