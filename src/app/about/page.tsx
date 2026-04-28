"use client";

import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="flex-grow pt-32 pb-40 md:pb-20 px-container-margin md:px-10 max-w-7xl mx-auto w-full flex flex-col gap-16 font-body-md text-body-md">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high border border-outline/20 mb-4">
          <span className="material-symbols-outlined text-primary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>policy</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Our Mission in India</span>
        </div>
        <h1 className="font-h1 text-h1 text-on-background leading-tight">
          Empowering the world&apos;s largest electorate through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-tertiary-container">clarity</span>.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          VoteWise India is built on the belief that a healthy democracy requires informed citizens. We provide impartial, accessible, and vital information on the Indian electoral process.
        </p>
      </section>

      {/* Glassmorphic Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Bento Box 1: Non-Partisan */}
        <div className="md:col-span-8 bg-white/5 backdrop-blur-[20px] border border-white/20 rounded-[20px] p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline/20 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05),-2px_-2px_4px_rgba(0,0,0,0.5)]">
              <span className="material-symbols-outlined text-primary-container text-3xl">balance</span>
            </div>
            <div>
              <h3 className="font-h3 text-h3 text-on-surface mb-3">Impartial Election Data</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                We aggregate data directly from Election Commission of India (ECI) verified sources. No spin, no bias. Just the facts you need to understand the Lok Sabha and Vidhan Sabha processes.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Box 2: Civic Education */}
        <div className="md:col-span-4 bg-surface-container-low rounded-[20px] p-8 border border-outline/10 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05),_4px_4px_10px_rgba(0,0,0,0.5)] flex flex-col gap-6">
          <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-2xl">school</span>
          </div>
          <div>
            <h3 className="font-h3 text-h3 text-on-surface mb-2">Simulating the EVM</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Understanding the VVPAT and EVM shouldn&apos;t be confusing. We simplify the booth experience through interactive simulation.
            </p>
          </div>
        </div>

        {/* Bento Box 3: Data Privacy */}
        <div className="md:col-span-4 bg-surface-container-low rounded-[20px] p-8 border border-outline/10 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05),_4px_4px_10px_rgba(0,0,0,0.5)] flex flex-col gap-6">
          <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-tertiary text-2xl">verified_user</span>
          </div>
          <div>
            <h3 className="font-h3 text-h3 text-on-surface mb-2">Digital Sovereignty</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Your simulated vote is private. We do not track individual user preferences or sell any voter related data.
            </p>
          </div>
        </div>

        {/* Bento Box 4: Impact Image */}
        <div className="md:col-span-8 bg-white/5 backdrop-blur-[20px] border border-white/20 rounded-[20px] overflow-hidden min-h-[300px] relative">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArXyIHzCC-kcGB5nIua7xcCdP0Ul4T6nFmjp_txV9Ut-ntM588dASFwrr1VRyb50GD6VovrfLXXDO9boJMg_W1kE6SbqyAls5UcaaHSUgaaRwfoi95xwaGcuzGYDtAfa5pPj9ww4KrmrJYpwIvuDz62VncMfIpThMtp-28OkfxFdPPbD7ZDH-wi3UZySxbU-Qs96VIx7_4bMGNqQVgcNolS4X0A8xB_NED4KUkN_4F6osP6bS8JBjozq82Rl-8k62Luv0GMOxivtc"
              alt="Diverse crowd of Indian citizens participating in the democratic process"
              fill
              className="object-cover opacity-60 mix-blend-overlay"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <h3 className="font-h2 text-h2 text-on-surface mb-4">Why Awareness Matters in Bharat</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              With nearly a billion voters, India&apos;s democratic exercise is unmatched. We exist to ensure every citizen feels confident stepping into the polling booth.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-xl mb-xl text-center flex flex-col items-center gap-md">
        <h2 className="text-h2 text-on-surface">Ready to participate?</h2>
        <p className="text-body-lg text-on-surface-variant max-w-xl">Join the millions of Indian citizens who are taking the first step towards active citizenship today.</p>
        <Link href="/learn" className="bg-gradient-to-r from-primary-container to-tertiary-container text-white px-12 py-4 rounded-full font-label-sm text-label-sm shadow-[0_8px_25px_rgba(255,153,51,0.4)] hover:-translate-y-1 transition-all">Start Your Journey</Link>
      </section>
    </main>
  );
}
