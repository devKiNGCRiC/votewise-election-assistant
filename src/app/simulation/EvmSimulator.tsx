"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  Feather,
  type LucideIcon,
  Rocket,
  RotateCcw,
  Sailboat,
  Share2,
  Sprout,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import InkFinger from "@/components/InkFinger";

type Stage = "id" | "ink" | "enable" | "vote" | "vvpat" | "done";

type Candidate = { serial: number; name: string; party: string; symbol: LucideIcon; symbolName: string };

// Fictional candidates and symbols — deliberately not any real party's.
const candidates: Candidate[] = [
  { serial: 1, name: "Meera Kulkarni", party: "Jan Awaaz Manch", symbol: Sailboat, symbolName: "Boat" },
  { serial: 2, name: "Arjun Rao", party: "Navyug Morcha", symbol: Rocket, symbolName: "Rocket" },
  { serial: 3, name: "Zoya Qureshi", party: "Haritha Sangam", symbol: Sprout, symbolName: "Sapling" },
  { serial: 4, name: "Gurpreet Gill", party: "Ekta Pragati Dal", symbol: Feather, symbolName: "Feather" },
  { serial: 5, name: "None of the Above", party: "NOTA", symbol: X, symbolName: "NOTA" },
];

const officerSteps: { stage: Stage; who: string; title: string }[] = [
  { stage: "id", who: "First polling officer", title: "Show your ID" },
  { stage: "ink", who: "Second polling officer", title: "Get inked and sign" },
  { stage: "enable", who: "Third polling officer", title: "Hand over your slip" },
  { stage: "vote", who: "You, alone in the compartment", title: "Press the blue button" },
];

const ORDER: Stage[] = ["id", "ink", "enable", "vote", "vvpat", "done"];
const VVPAT_SECONDS = 7;

function beep() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 1750;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.03);
    gain.gain.setValueAtTime(0.12, ctx.currentTime + 1.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.65);
    osc.onended = () => ctx.close();
  } catch {
    // no audio support — the red lamp still shows the vote
  }
}

export default function EvmSimulator() {
  const [stage, setStage] = useState<Stage>("id");
  const [idShown, setIdShown] = useState<string | null>(null);
  const [inked, setInked] = useState(false);
  const [chosen, setChosen] = useState<Candidate | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(VVPAT_SECONDS);
  const [slipLeaving, setSlipLeaving] = useState(false);
  const [sound, setSound] = useState(true);
  const timers = useRef<number[]>([]);
  const ballotRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const stageIdx = ORDER.indexOf(stage);
  const ready = stage === "vote";

  const enableBallot = () => {
    setStage("vote");
    later(() => ballotRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };

  const castVote = (c: Candidate) => {
    if (!ready) return;
    setChosen(c);
    setStage("vvpat");
    if (sound) beep();
    // Slip prints (~0.9s), stays visible for 7s, then drops into the box.
    for (let s = 1; s <= VVPAT_SECONDS; s++) later(() => setSecondsLeft(VVPAT_SECONDS - s), 900 + s * 1000);
    later(() => setSlipLeaving(true), 900 + VVPAT_SECONDS * 1000);
    later(() => setStage("done"), 900 + VVPAT_SECONDS * 1000 + 700);
  };

  const reset = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setStage("id");
    setIdShown(null);
    setInked(false);
    setChosen(null);
    setSecondsLeft(VVPAT_SECONDS);
    setSlipLeaving(false);
  };

  const share = async () => {
    const text = "I just practised voting on a real-feel EVM with VoteWise. Your turn 🗳️";
    try {
      if (navigator.share) await navigator.share({ text, url: window.location.href });
      else await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    } catch {
      // user cancelled
    }
  };

  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
      {/* ── Officer flow ── */}
      <div className="glass rounded-[32px] p-6 md:p-8 lg:sticky lg:top-28">
        <ol className="flex gap-1.5 mb-7" aria-label="Progress">
          {officerSteps.map((s, i) => (
            <li
              key={s.stage}
              className={`h-2 flex-1 rounded-full transition-colors duration-500 ${
                i < stageIdx ? "bg-mor" : i === stageIdx ? "bg-genda" : "bg-white/12"
              }`}
            >
              <span className="sr-only">
                {s.title}: {i < stageIdx ? "done" : i === stageIdx ? "current" : "to do"}
              </span>
            </li>
          ))}
        </ol>

        <div key={stage} className="rise" aria-live="polite">
          {stage === "id" && (
            <>
              <p className="text-dhundh font-medium">{officerSteps[0].who}</p>
              <h2 className="text-3xl font-extrabold mt-1 mb-3">Which ID did you bring?</h2>
              <p className="text-dhundh mb-6">The officer finds your name on the marked copy of the roll and checks your photo ID.</p>
              <div className="flex flex-wrap gap-2">
                {["EPIC (voter ID)", "Aadhaar", "Passport", "Driving licence"].map((id) => (
                  <button
                    key={id}
                    onClick={() => setIdShown(id)}
                    aria-pressed={idShown === id}
                    className={`px-5 py-3 font-semibold ${
                      idShown === id ? "clay clay-genda" : "glass-flat rounded-[22px] hover:bg-white/10"
                    }`}
                  >
                    {id}
                  </button>
                ))}
              </div>
              {idShown && (
                <div className="rise mt-6 flex flex-col gap-4">
                  <p className="flex items-center gap-2 text-mor font-semibold">
                    <Check className="w-5 h-5" aria-hidden="true" /> Name found at serial no. 142. You&apos;re good.
                  </p>
                  <button onClick={() => setStage("ink")} className="clay clay-genda clay-press self-start px-6 py-3 font-semibold">
                    Move to the second officer
                  </button>
                </div>
              )}
            </>
          )}

          {stage === "ink" && (
            <>
              <p className="text-dhundh font-medium">{officerSteps[1].who}</p>
              <h2 className="text-3xl font-extrabold mt-1 mb-3">Left index finger, please</h2>
              <p className="text-dhundh mb-6">
                The officer draws an indelible ink line from your nail to the first joint, then you sign the register (Form 17A) and get a voter slip.
              </p>
              <div className="flex items-end gap-6">
                <div className="clay clay-neel rounded-[28px]! w-28 h-40 overflow-hidden relative shrink-0">
                  <InkFinger inked={inked} className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-48" />
                </div>
                {inked ? (
                  <button onClick={() => setStage("enable")} className="rise clay clay-genda clay-press px-6 py-3 font-semibold">
                    Sign and take the slip
                  </button>
                ) : (
                  <button onClick={() => setInked(true)} className="clay clay-syahi clay-press px-6 py-3 font-semibold">
                    Get inked
                  </button>
                )}
              </div>
            </>
          )}

          {stage === "enable" && (
            <>
              <p className="text-dhundh font-medium">{officerSteps[2].who}</p>
              <h2 className="text-3xl font-extrabold mt-1 mb-3">Slip in, ballot on</h2>
              <p className="text-dhundh mb-6">
                The officer takes your slip, checks your ink, and presses <strong className="text-doodh">Ballot</strong> on the control unit. Watch for the green light on the machine.
              </p>
              <button onClick={enableBallot} className="clay clay-genda clay-press px-6 py-3 font-semibold">
                Hand over my slip
              </button>
            </>
          )}

          {stage === "vote" && (
            <>
              <p className="text-dhundh font-medium">{officerSteps[3].who}</p>
              <h2 className="text-3xl font-extrabold mt-1 mb-3">The green light is on</h2>
              <p className="text-dhundh">
                Press the blue button next to the candidate you want. You get one press, so take your time.
              </p>
            </>
          )}

          {stage === "vvpat" && chosen && (
            <>
              <p className="text-dhundh font-medium">VVPAT check</p>
              <h2 className="text-3xl font-extrabold mt-1 mb-3">Beep! Now check the slip</h2>
              <p className="text-dhundh">
                The long beep means your vote was recorded. The VVPAT window shows serial number, name and symbol of{" "}
                <strong className="text-doodh">{chosen.name}</strong> for 7 seconds.
              </p>
            </>
          )}

          {stage === "done" && chosen && (
            <>
              <h2 className="text-4xl font-extrabold mb-3">You just voted. Practice-wise.</h2>
              <p className="text-dhundh mb-6">
                That&apos;s the whole booth experience, start to finish. On the real day it takes about the same time.
              </p>
              <div className="flex flex-wrap gap-2">
                <button onClick={reset} className="clay clay-genda clay-press px-5 py-3 font-semibold flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" aria-hidden="true" /> Practise again
                </button>
                <Link href="/quiz" className="glass-flat rounded-[22px] px-5 py-3 font-semibold hover:bg-white/10">
                  Take the quiz
                </Link>
                <button onClick={share} className="glass-flat rounded-[22px] px-5 py-3 font-semibold flex items-center gap-2 hover:bg-white/10">
                  <Share2 className="w-4 h-4" aria-hidden="true" /> Share
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => setSound((s) => !s)}
          aria-pressed={sound}
          className="mt-8 flex items-center gap-2 text-sm text-dhundh hover:text-doodh"
        >
          {sound ? <Volume2 className="w-4 h-4" aria-hidden="true" /> : <VolumeX className="w-4 h-4" aria-hidden="true" />}
          Beep sound {sound ? "on" : "off"}
        </button>
      </div>

      {/* ── Machines ── */}
      <div className="flex flex-col sm:flex-row-reverse lg:flex-col xl:flex-row-reverse gap-5 items-stretch">
        {/* VVPAT */}
        <div className="clay clay-neel rounded-[28px]! p-4 sm:w-48 lg:w-auto xl:w-48 shrink-0 flex sm:flex-col lg:flex-row xl:flex-col gap-4 items-center">
          <div className="font-display font-bold text-sm text-dhundh sm:text-center">
            VVPAT
            <span className="block text-xs font-normal">Printer</span>
          </div>
          <div
            className="relative flex-1 sm:flex-none w-full h-36 sm:h-48 rounded-[16px] overflow-hidden bg-[#0b0820] shadow-[inset_0_6px_16px_rgba(0,0,0,0.7)]"
            aria-live="polite"
          >
            {/* Glass reflection */}
            <div className="absolute inset-0 z-10 bg-linear-to-br from-white/12 via-transparent to-transparent pointer-events-none" />
            {chosen && (stage === "vvpat" || stage === "done") && (
              <div
                className={`absolute inset-x-3 top-0 h-[88%] rounded-b-md bg-[#f6f1e4] text-[#1d1450] p-3 flex flex-col items-center justify-center gap-1 ${
                  slipLeaving || stage === "done" ? "slip-out" : "slip-in"
                }`}
              >
                <span className="text-xs font-semibold">Sl. No. {chosen.serial}</span>
                <chosen.symbol className="w-9 h-9" strokeWidth={2.2} aria-hidden="true" />
                <span className="text-xs font-bold text-center leading-tight">{chosen.name}</span>
              </div>
            )}
          </div>
          <div className="font-display font-extrabold text-2xl tabular-nums w-14 text-center" aria-label="Seconds the slip stays visible">
            {stage === "vvpat" ? `${secondsLeft}s` : "–"}
          </div>
        </div>

        {/* Ballot unit */}
        <div
          ref={ballotRef}
          className="flex-1 rounded-[30px] p-4 md:p-5 bg-linear-to-b from-[#ece7f6] to-[#cfc6e3] text-neel shadow-[inset_0_8px_14px_rgba(255,255,255,0.7),inset_0_-10px_18px_rgba(40,20,90,0.25),0_30px_50px_-20px_rgba(5,2,20,0.8)]"
        >
          <div className="flex items-center justify-between px-2 pb-3">
            <span className="font-display font-extrabold tracking-wide">Ballot unit</span>
            <span className="flex items-center gap-2 text-sm font-semibold">
              Ready
              <span
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  ready ? "bg-[#2ee66b] shadow-[0_0_14px_4px_rgba(46,230,107,0.7)]" : "bg-[#5d6b5f]"
                }`}
              />
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {candidates.map((c) => {
              const lit = chosen?.serial === c.serial && stageIdx >= ORDER.indexOf("vvpat");
              return (
                <li
                  key={c.serial}
                  className="grid grid-cols-[2rem_1fr_3rem_1.25rem_4rem] items-center gap-2 md:gap-3 rounded-[16px] bg-white/70 pl-3 pr-2 py-2 shadow-[inset_0_-2px_4px_rgba(40,20,90,0.12)]"
                >
                  <span className="font-display font-extrabold text-lg text-center">{c.serial}</span>
                  <span className="min-w-0">
                    <span className="block font-semibold leading-tight truncate">{c.name}</span>
                    <span className="block text-xs text-neel/60 truncate">{c.party}</span>
                  </span>
                  <span className="w-11 h-11 rounded-[12px] bg-white grid place-items-center border border-neel/10" title={c.symbolName}>
                    <c.symbol className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <span
                    className={`w-4 h-4 rounded-full ${lit ? "bg-[#ff3232] [animation:lamp_1s_ease-in-out_3]" : "bg-[#7a4a4a]"}`}
                    aria-hidden="true"
                  />
                  <button
                    onClick={() => castVote(c)}
                    disabled={!ready}
                    aria-label={`Vote for ${c.name}, ${c.party}`}
                    className="clay clay-evm clay-press h-11 rounded-[14px]! disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  />
                </li>
              );
            })}
          </ul>
          {!ready && stage !== "vvpat" && stage !== "done" && (
            <p className="text-sm text-neel/70 mt-3 px-2">Buttons stay locked until the officer turns on the green Ready light.</p>
          )}
        </div>
      </div>
    </div>
  );
}
