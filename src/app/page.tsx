"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow flex items-center justify-center relative pt-24 pb-32 md:pb-12 min-h-screen overflow-hidden">
      {/* Abstract Background Gradient / Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Saffron Glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary-container/20 rounded-full blur-[120px]"></div>
        {/* Blue Glow */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-secondary-container/30 rounded-full blur-[100px]"></div>
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Central Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-4xl mx-container-margin px-lg py-xl md:p-12 rounded-[24px] bg-surface-container-low/40 backdrop-blur-[20px] border border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center text-center before:content-[''] before:absolute before:inset-0 before:rounded-[24px] before:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] before:pointer-events-none">
        <div className="mb-lg inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-container to-tertiary-container shadow-[0_0_30px_rgba(255,153,51,0.3)]">
          <span className="material-symbols-outlined icon-fill text-white text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>voting_chip</span>
        </div>
        <h1 className="text-h1 mb-sm drop-shadow-md text-on-surface">
          VoteWise India
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mb-xl">
          Learn, Understand & Experience India&apos;s Democratic Process. Empowering the largest electorate in the world through interactive simulations and unbiased learning modules.
        </p>

        <div className="flex flex-col sm:flex-row gap-md w-full sm:w-auto">
          {/* Primary Action */}
          <Link href="/learn" className="relative group overflow-hidden px-8 py-4 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm shadow-[0_0_20px_rgba(255,153,51,0.4)] transition-all hover:shadow-[0_0_30px_rgba(255,153,51,0.6)] flex items-center justify-center gap-2">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Learning
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Link>

          {/* Secondary Actions */}
          <Link href="/simulation" className="px-8 py-4 rounded-full bg-surface-container-high/50 text-primary border border-outline-variant/50 font-label-sm text-label-sm backdrop-blur-md transition-colors hover:bg-surface-container-highest hover:border-outline-variant flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">how_to_vote</span>
            EVM Simulation
          </Link>
          <Link href="/quiz" className="px-8 py-4 rounded-full bg-surface-container-high/50 text-primary border border-outline-variant/50 font-label-sm text-label-sm backdrop-blur-md transition-colors hover:bg-surface-container-highest hover:border-outline-variant flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">quiz</span>
            Civics Quiz
          </Link>
        </div>

        {/* Quick Stats/Badges */}
        <div className="mt-xl pt-lg border-t border-outline-variant/30 flex flex-wrap justify-center gap-gutter w-full">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-variant/40 border border-outline-variant/20">
            <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-label-sm text-on-surface-variant text-[12px]">ECI Verified Content</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-variant/40 border border-outline-variant/20">
            <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
            <span className="text-label-sm text-on-surface-variant text-[12px]">All States & UTs</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-variant/40 border border-outline-variant/20">
            <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
            <span className="text-label-sm text-on-surface-variant text-[12px]">VVPAT Awareness</span>
          </div>
        </div>
      </div>
    </main>
  );
}
