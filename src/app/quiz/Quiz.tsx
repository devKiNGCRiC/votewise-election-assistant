"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Flame, RotateCcw, X } from "lucide-react";
import { questions } from "./questions";
import { useStoredState } from "@/lib/useStoredState";

const KEYS = ["1", "2", "3", "4"];

function grade(correct: number) {
  const pct = correct / questions.length;
  if (pct >= 0.9) return { title: "Loktantra legend", note: "You could explain this to your whole family group chat." };
  if (pct >= 0.7) return { title: "Booth-ready", note: "You know your stuff. Skim the Learn page for the rest." };
  if (pct >= 0.5) return { title: "Getting there", note: "Half the battle's won. A quick read of the five steps will help." };
  return { title: "Fresh start", note: "No stress. Everyone starts somewhere. The Learn page has you covered." };
}

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const [newBest, setNewBest] = useState(false);
  const [best, setBest] = useStoredState<number>("votewise:quiz-best", 0);
  const nextRef = useRef<HTMLButtonElement>(null);

  const q = questions[idx];
  const answered = picked !== null;
  const last = idx === questions.length - 1;

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) {
      setCorrect((c) => c + 1);
      const s = streak + 1;
      setStreak(s);
      setBestStreak((b) => Math.max(b, s));
    } else {
      setStreak(0);
    }
    requestAnimationFrame(() => nextRef.current?.focus({ preventScroll: true }));
  };

  const next = () => {
    if (last) {
      setFinished(true);
      setNewBest(correct > best);
      if (correct > best) setBest(correct);
      return;
    }
    setIdx((n) => n + 1);
    setPicked(null);
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setCorrect(0);
    setStreak(0);
    setBestStreak(0);
    setFinished(false);
  };

  // 1–4 to answer
  const onAnswerKey = useEffectEvent((n: number) => choose(n));
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const n = KEYS.indexOf(e.key);
      if (n !== -1) onAnswerKey(n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (finished) {
    const g = grade(correct);
    return (
      <div className="rise glass rounded-[36px] p-7 md:p-12 text-center flex flex-col items-center">
        <div
          className="w-40 h-40 rounded-full grid place-items-center mb-6"
          style={{
            background: `conic-gradient(var(--color-genda) ${(correct / questions.length) * 360}deg, rgb(255 255 255 / 0.1) 0)`,
          }}
        >
          <div className="w-[8.5rem] h-[8.5rem] rounded-full bg-neel grid place-items-center">
            <span className="font-display font-extrabold text-5xl leading-none">
              {correct}
              <span className="text-2xl text-dhundh">/{questions.length}</span>
            </span>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold">{g.title}</h1>
        <p className="text-dhundh text-lg mt-3 max-w-md">{g.note}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-6 text-[15px] font-semibold">
          <span className="clay clay-rani rounded-full! px-4 py-2 flex items-center gap-1.5">
            <Flame className="w-4 h-4" aria-hidden="true" /> Best streak: {bestStreak}
          </span>
          <span className="clay clay-mor rounded-full! px-4 py-2">
            {newBest ? "New personal best!" : `Personal best: ${best}/${questions.length}`}
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <button onClick={restart} className="clay clay-genda clay-press px-6 py-3.5 font-semibold flex items-center gap-2">
            <RotateCcw className="w-4 h-4" aria-hidden="true" /> Play again
          </button>
          <Link href="/learn" className="glass-flat rounded-[22px] px-6 py-3.5 font-semibold hover:bg-white/10">
            Read the five steps
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="font-display font-bold text-lg">
          Question {idx + 1}
          <span className="text-dhundh"> of {questions.length}</span>
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1 font-display font-bold px-3 py-1 rounded-full transition-all ${
              streak >= 2 ? "clay clay-rani rounded-full!" : "text-dhundh"
            }`}
            aria-label={`Streak: ${streak}`}
          >
            <Flame className="w-4 h-4" aria-hidden="true" /> {streak}
          </span>
          {best > 0 && <span className="text-sm text-dhundh hidden sm:inline">Best {best}/{questions.length}</span>}
        </div>
      </div>
      <div className="h-2.5 rounded-full bg-white/10 overflow-hidden mb-10" aria-hidden="true">
        <div
          className="h-full rounded-full bg-linear-to-r from-genda to-rani transition-[width] duration-500"
          style={{ width: `${((idx + (answered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <h1 key={idx} className="rise text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold leading-tight mb-8">
        {q.question}
      </h1>

      <ul className="grid sm:grid-cols-2 gap-3">
        {q.options.map((o, i) => {
          const isAnswer = i === q.answer;
          const isPicked = i === picked;
          let look = "glass-flat rounded-[24px] hover:bg-white/10";
          if (answered && isAnswer) look = "clay clay-mor rounded-[24px]!";
          else if (answered && isPicked) look = "clay clay-rani rounded-[24px]!";
          else if (answered) look = "glass-flat rounded-[24px] opacity-40";
          return (
            <li key={o.label}>
              <button
                onClick={() => choose(i)}
                disabled={answered}
                className={`w-full h-full text-left p-5 flex items-center gap-4 transition-all ${look}`}
              >
                <span
                  className={`w-9 h-9 rounded-[12px] grid place-items-center shrink-0 font-display font-bold ${
                    answered && (isAnswer || isPicked) ? "bg-white/40" : "bg-neel/70 shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]"
                  }`}
                >
                  {answered && isAnswer ? (
                    <Check className="w-5 h-5" strokeWidth={3} aria-label="Correct answer" />
                  ) : answered && isPicked ? (
                    <X className="w-5 h-5" strokeWidth={3} aria-label="Your answer" />
                  ) : (
                    KEYS[i]
                  )}
                </span>
                <span>
                  <span className="block font-display font-bold text-xl leading-snug">{o.label}</span>
                  {answered && <span className="block text-[15px] mt-0.5 opacity-80">{o.sub}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite">
        {answered && (
          <div className="rise glass rounded-[28px] p-6 md:p-7 mt-6 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <p className="font-display font-extrabold text-2xl mb-1">
                {picked === q.answer ? (streak >= 3 ? `${streak} in a row!` : "Sahi jawab!") : "Not quite."}
              </p>
              <p className="text-dhundh">{q.explanation}</p>
            </div>
            <button
              ref={nextRef}
              onClick={next}
              className="clay clay-genda clay-press px-6 py-3.5 font-semibold flex items-center gap-2 self-start md:self-auto shrink-0"
            >
              {last ? "See my score" : "Next question"}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      {!answered && <p className="hidden md:block text-sm text-dhundh-2 mt-6">Tip: press 1–4 on your keyboard to answer.</p>}
    </div>
  );
}
