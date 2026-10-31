"use client";

import { useState } from "react";

const myths = [
  {
    myth: "My one vote won't change anything.",
    fact: "In 2024, Mumbai North West was won by just 48 votes. Close seats happen every election.",
    clay: "clay-genda",
  },
  {
    myth: "No voter ID card, no vote.",
    fact: "If your name is on the roll, any of 12 approved photo IDs works, including Aadhaar, passport and driving licence.",
    clay: "clay-mor",
  },
  {
    myth: "EVMs are connected to the internet.",
    fact: "EVMs are standalone machines. They have no network, Wi-Fi or Bluetooth connection.",
    clay: "clay-rani",
  },
  {
    myth: "If NOTA gets the most votes, the election is cancelled.",
    fact: "NOTA votes are counted and published, but the candidate with the most votes still wins.",
    clay: "clay-syahi",
  },
  {
    myth: "Students can only vote back home.",
    fact: "You enrol where you ordinarily live. Students in hostels can register at their hostel address.",
    clay: "clay-evm",
  },
  {
    myth: "The officers can see who I voted for.",
    fact: "Your vote is secret. Only you see the VVPAT slip behind glass, and then it drops into a sealed box.",
    clay: "clay-doodh",
  },
];

export default function MythCards() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {myths.map((m, i) => {
        const isFlipped = flipped.has(i);
        return (
          <li key={m.myth} className="flip h-60" data-flipped={isFlipped}>
            <button
              onClick={() => toggle(i)}
              aria-pressed={isFlipped}
              aria-label={isFlipped ? `Fact: ${m.fact}` : `Myth: ${m.myth} Tap to see the fact.`}
              className="flip-inner relative w-full h-full text-left"
            >
              <span className="flip-face absolute inset-0 glass-flat rounded-[28px] p-6 flex flex-col justify-between">
                <span className="text-rani font-display font-bold text-lg">Myth</span>
                <span className="font-display font-bold text-2xl leading-snug">“{m.myth}”</span>
                <span className="text-dhundh-2 text-sm">Tap to flip</span>
              </span>
              <span className={`flip-face flip-back absolute inset-0 clay ${m.clay} rounded-[28px]! p-6 flex flex-col justify-between`}>
                <span className="font-display font-bold text-lg opacity-75">Fact</span>
                <span className="text-lg leading-snug font-medium">{m.fact}</span>
                <span className="text-sm opacity-60">Tap to flip back</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
