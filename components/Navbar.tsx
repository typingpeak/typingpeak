"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Test" },
    { href: "/lessons", label: "Lessons" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="w-full border-b border-[#1a1a1a] bg-[#0A0A0A]">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white font-black text-xl tracking-tight transition-opacity hover:opacity-90"
        >
          <div className="w-[30px] h-[30px] rounded-[8px] bg-[#FBBF24] flex items-center justify-center text-black">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          TypingPeak
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-2">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname?.startsWith(link.href + "/");
              
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-[0.85rem] font-bold tracking-wide transition-all ${
                  isActive
                    ? "bg-[#222222] text-white"
                    : "text-[#888888] hover:text-[#cccccc]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
