"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hidden md:flex w-full py-10 px-8 flex-col md:flex-row justify-between items-center gap-6 bg-[#0d0905] border-t border-white/5 mt-auto z-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span
          className="material-symbols-outlined text-[#FF9933] text-lg"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          how_to_vote
        </span>
        <span className="text-[#FF9933] font-bold text-lg font-['Inter']">VoteWise</span>
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-6">
        <Link className="text-sm font-light text-slate-500 hover:text-[#FF9933] transition-colors" href="/about">About</Link>
        <Link className="text-sm font-light text-slate-500 hover:text-[#FF9933] transition-colors" href="/learn">Learn</Link>
        <Link className="text-sm font-light text-slate-500 hover:text-[#FF9933] transition-colors" href="/quiz">Quiz</Link>
        <Link className="text-sm font-light text-slate-500 hover:text-[#FF9933] transition-colors" href="/simulation">Simulation</Link>
      </div>

      {/* Copyright */}
      <div className="text-sm font-light text-slate-500 text-center md:text-right">
        © 2025 VoteWise India. Built for Democracy.
      </div>
    </footer>
  );
}
