"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const steps = [
  {
    title: "Electoral Roll Search",
    description: "Check if your name is in the voter list. Use the Election Commission of India (ECI) portal or Voter Helpline App to verify your details in the Electoral Roll.",
    icon: "person_search",
    image: "https://images.unsplash.com/photo-1540910419892-f0bbddff9a58?q=80&w=1000&auto=format&fit=crop",
    label: "Eligibility"
  },
  {
    title: "Get Your EPIC",
    description: "The Elector's Photo Identity Card (EPIC) is your primary document for voting. If you don't have one, apply online via Form 6 on the NVSP portal.",
    icon: "badge",
    image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=1000&auto=format&fit=crop",
    label: "Voter ID"
  },
  {
    title: "Locate Polling Booth",
    description: "Know your polling station before election day. Find your designated booth address by sending an SMS or checking the 'Know Your Polling Station' tool on the ECI portal.",
    icon: "location_on",
    image: "https://images.unsplash.com/photo-1449156001934-0834aa1927dd?q=80&w=1000&auto=format&fit=crop",
    label: "Logistics"
  },
  {
    title: "EVM & VVPAT",
    description: "Inside the booth, press the blue button next to your candidate's name on the EVM. Verify your vote via the VVPAT glass window for 7 seconds to ensure accuracy.",
    icon: "touch_app",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP9CuA_V1Utb8QKQMdtscieENLJgPcW0i8iQ_L5oV-8Gn91scnYEtlq0wAf1cO90eBfsO63B57PK2OLG21Np3Mh56epvnUgftHP_yF2H3KLW2h1zjBCWLqotRCcrxFB6ns8TMsaOCxw4-t20Lf2bpx6ptoIv8kua_ufF-eIAS_g8Lig6xy837OiIMNLw8kKhLhhGLrgFM4L2KfBBuz6uvSXBfJ2DA_YKmiDkDZyDXbplDf2VKto7a8syAgTiQfDkrjd_gineJNyeU",
    label: "Voting Day"
  },
  {
    title: "Result & Declaration",
    description: "After all phases of polling, counting takes place. The candidate with the highest votes in your constituency is declared winner (First-Past-The-Post system).",
    icon: "analytics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    label: "Declaration"
  }
];

export default function LearnPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col relative overflow-hidden font-body-md text-body-md antialiased pt-24 pb-32 md:pb-0">
      {/* Ambient lighting */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary-container/10 rounded-full mix-blend-screen filter blur-[120px] opacity-50 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary-container/10 rounded-full mix-blend-screen filter blur-[100px] opacity-40 pointer-events-none" />

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-lg z-10 relative w-full max-w-[600px] mx-auto mt-4">
        {/* Page title row */}
        <div className="w-full flex items-center justify-between mb-8">
          <Link href="/" aria-label="Go back" className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container/40 backdrop-blur-md border border-white/10 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <h2 className="text-h3 text-on-surface tracking-tight">Indian Election Guide</h2>
          <div className="w-10" />
        </div>

        {/* Progress Container */}
        <div className="w-full mb-8">
          <div className="flex justify-between items-end mb-2 px-1">
            <span className="text-label-sm text-primary-container tracking-wide uppercase">
              Phase {currentStep + 1} of {steps.length}
            </span>
            <span className="text-label-sm text-on-surface-variant">{step.label}</span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden shadow-inner border border-surface-bright/20">
            <div
              className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full shadow-[0_0_10px_rgba(255,153,51,0.5)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Step dots */}
          <div className="flex justify-center gap-2 mt-3">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? "w-6 h-2 bg-primary-container shadow-[0_0_6px_rgba(255,153,51,0.5)]"
                    : i < currentStep
                    ? "w-2 h-2 bg-primary-container/60"
                    : "w-2 h-2 bg-surface-container-highest"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Glassmorphic Content Card */}
        <div className="w-full bg-surface/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-xl flex flex-col items-center text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/15 transition-all duration-700" />

          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-6 border border-white/5 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.05),_inset_-3px_-3px_7px_rgba(0,0,0,0.5),_0_5px_15px_rgba(0,0,0,0.3)]">
            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              {step.icon}
            </span>
          </div>

          {/* Phase badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary-container text-label-sm mb-4">
            <span className="material-symbols-outlined text-[14px]">radio_button_checked</span>
            {step.label}
          </span>

          <h1 className="text-h2 text-on-surface mb-md">{step.title}</h1>
          <p className="text-body-lg text-on-surface-variant max-w-[400px] leading-relaxed">{step.description}</p>

          {/* Decorative image */}
          <div className="mt-8 w-full h-36 rounded-xl overflow-hidden border border-white/5 opacity-80 relative">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover grayscale opacity-60 mix-blend-overlay"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="w-full flex justify-between items-center mt-8 gap-md">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-full text-label-sm flex items-center gap-2 transition-all ${
              currentStep === 0
                ? "text-on-surface-variant bg-surface-container-low border border-outline-variant/30 opacity-40 cursor-not-allowed"
                : "text-on-surface bg-surface-container border border-outline-variant/50 hover:bg-surface-variant"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-8 py-3 rounded-full text-label-sm text-surface-container-lowest bg-gradient-to-r from-primary-container to-primary shadow-[0_0_20px_rgba(255,153,51,0.3)] hover:shadow-[0_0_25px_rgba(255,153,51,0.5)] transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              Continue
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          ) : (
            <Link
              href="/simulation"
              className="px-8 py-3 rounded-full text-label-sm text-white bg-gradient-to-r from-[#22C55E] to-[#16A34A] shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              Try EVM Demo
              <span className="material-symbols-outlined text-[18px]">how_to_vote</span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
