"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, IdCard, MapPin, Trophy, Vote } from "lucide-react";

const steps = [
  {
    short: "Enrol",
    hi: "नामांकन",
    title: "Get your name on the electoral roll",
    body: "You can only vote if your name is on the roll for your constituency. Check it online, and if you're not there, apply with Form 6.",
    todo: [
      "Search your name on electoralsearch.eci.gov.in",
      "Not listed? Fill Form 6 on the Voters' Service Portal",
      "Living in a hostel? You can enrol at that address",
    ],
    icon: BadgeCheck,
    clay: "clay-genda",
  },
  {
    short: "Voter ID",
    hi: "पहचान पत्र",
    title: "Have your EPIC, or another photo ID",
    body: "The EPIC is your voter ID card. You can also download it as an e-EPIC. If you don't have it on the day, ECI accepts 12 other photo IDs.",
    todo: [
      "Download your e-EPIC from the Voters' Service Portal",
      "Other IDs include Aadhaar, passport, driving licence and PAN card",
      "The ID only works if your name is on the roll",
    ],
    icon: IdCard,
    clay: "clay-mor",
  },
  {
    short: "Booth",
    hi: "मतदान केंद्र",
    title: "Find your polling booth",
    body: "Every voter is assigned one booth, usually close to home. Your Booth Level Officer hands out voter information slips before polling day.",
    todo: [
      "Note your booth address and your serial number on the roll",
      "Check polling hours, usually 7 am to 6 pm",
      "Call 1950 if you can't find your booth",
    ],
    icon: MapPin,
    clay: "clay-rani",
  },
  {
    short: "Vote",
    hi: "मतदान",
    title: "Cast your vote on the EVM",
    body: "Inside, three polling officers handle you in turn. The first checks your name and ID. The second inks your left index finger and takes your signature. The third enables the machine for you.",
    todo: [
      "Press the blue button next to your candidate. A red light glows and you hear a beep",
      "Check the VVPAT window. Your slip shows for 7 seconds",
      "Phones aren't allowed inside the voting compartment",
    ],
    icon: Vote,
    clay: "clay-evm",
  },
  {
    short: "Result",
    hi: "परिणाम",
    title: "Counting and the result",
    body: "EVMs are sealed and kept in strong rooms until counting day. In each constituency the candidate with the most votes wins. This is called first-past-the-post.",
    todo: [
      "VVPAT slips from 5 random booths per assembly segment are hand-counted to cross-check",
      "NOTA votes are counted and published",
      "Results go up live on results.eci.gov.in",
    ],
    icon: Trophy,
    clay: "clay-syahi",
  },
];

export default function StepGuide() {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const Icon = step.icon;
  const last = current === steps.length - 1;

  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-4 md:gap-6">
      <ol
        className="flex md:flex-col gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 pb-1"
        role="tablist"
        aria-label="Voting steps"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowRight") setCurrent((c) => Math.min(steps.length - 1, c + 1));
          if (e.key === "ArrowUp" || e.key === "ArrowLeft") setCurrent((c) => Math.max(0, c - 1));
        }}
      >
        {steps.map((s, i) => {
          const active = i === current;
          return (
            <li key={s.short} className="shrink-0">
              <button
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => setCurrent(i)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left font-semibold transition-all ${
                  active ? `clay ${s.clay}` : "glass-flat rounded-[22px] text-dhundh hover:text-doodh"
                }`}
              >
                <span className="font-display font-extrabold text-xl w-6 text-center opacity-70">{i + 1}</span>
                <span className="whitespace-nowrap">{s.short}</span>
                <span lang="hi" className="hidden md:inline ml-auto text-sm opacity-70">
                  {s.hi}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div role="tabpanel" className="glass rounded-[32px] p-6 md:p-10 flex flex-col">
        <div key={current} className="rise flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className={`clay ${step.clay} w-16 h-16 grid place-items-center rounded-[20px]! shrink-0`}>
              <Icon className="w-7 h-7" aria-hidden="true" />
            </span>
            <p className="text-dhundh font-medium">
              Step {current + 1} of {steps.length}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">{step.title}</h2>
          <p className="text-lg text-dhundh leading-relaxed max-w-2xl">{step.body}</p>
          <ul className="flex flex-col gap-2.5 mt-1">
            {step.todo.map((t) => (
              <li key={t} className="flex gap-3 items-start text-[17px]">
                <span className="mt-2 w-2 h-2 rounded-full bg-genda shrink-0" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center gap-3 mt-10">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="glass-flat rounded-[22px] px-5 py-3 font-semibold flex items-center gap-2 disabled:opacity-30 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back
          </button>
          {last ? (
            <Link href="/simulation" className="clay clay-evm clay-press px-6 py-3 font-semibold">
              Try it on the EVM
            </Link>
          ) : (
            <button
              onClick={() => setCurrent((c) => c + 1)}
              className="clay clay-genda clay-press px-6 py-3 font-semibold flex items-center gap-2"
            >
              Next step
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
