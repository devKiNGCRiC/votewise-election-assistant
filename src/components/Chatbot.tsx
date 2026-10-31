"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

type Message = { id: number; from: "user" | "bot"; text: string; link?: { href: string; label: string } };

// Small offline answer bank. Each entry matches if any keyword appears in the question.
const ANSWERS: { keys: string[]; text: string; link?: Message["link"] }[] = [
  {
    keys: ["register", "enrol", "enroll", "form 6", "sign up", "apply"],
    text: "Apply online with Form 6 on the Voters' Service Portal (voters.eci.gov.in) or the Voter Helpline app. You'll need a photo, age proof and address proof.",
    link: { href: "/eligibility", label: "Check if you can enrol" },
  },
  {
    keys: ["age", "18", "17", "old enough", "eligible", "can i vote"],
    text: "You must be an Indian citizen and 18 on a qualifying date (1 Jan, 1 Apr, 1 Jul or 1 Oct). At 17 you can already apply in advance.",
    link: { href: "/eligibility", label: "Work out my date" },
  },
  {
    keys: ["nota", "none of the above"],
    text: "NOTA means None of the Above. It's the last button on the EVM. NOTA votes are counted, but the candidate with the most votes still wins.",
  },
  {
    keys: ["evm", "machine", "button", "how to vote", "how do i vote"],
    text: "Inside the booth, press the blue button next to your candidate on the ballot unit. A red light glows and you hear a long beep. That's your vote recorded.",
    link: { href: "/simulation", label: "Practise on the EVM" },
  },
  {
    keys: ["vvpat", "slip", "paper"],
    text: "The VVPAT is the printer next to the EVM. It shows a slip with your candidate's serial number, name and symbol for 7 seconds, then drops it into a sealed box.",
  },
  {
    keys: ["id", "epic", "voter card", "aadhaar", "document", "proof"],
    text: "Bring your EPIC (voter ID). If you don't have it, 12 other photo IDs work, like Aadhaar, passport, driving licence or PAN card, as long as your name is on the roll.",
  },
  {
    keys: ["booth", "polling station", "where", "location"],
    text: "Search your name on electoralsearch.eci.gov.in to see your polling station and serial number, or call the voter helpline on 1950.",
  },
  {
    keys: ["ink", "finger"],
    text: "The second polling officer marks your left index finger with indelible ink, from the nail to the first joint. It stops anyone voting twice.",
  },
  {
    keys: ["moved", "shift", "correct", "mistake", "form 8", "address change"],
    text: "Moved house or found a mistake in your entry? Use Form 8 on the Voters' Service Portal to shift or correct it.",
  },
  {
    keys: ["phone", "mobile", "selfie", "photo"],
    text: "Phones aren't allowed inside the voting compartment, and photographing your vote is not allowed. Many booths have a counter to leave it at.",
  },
  {
    keys: ["helpline", "complain", "complaint", "1950", "cvigil"],
    text: "Call 1950 for voter help. To report violations like cash or gifts for votes, use ECI's cVIGIL app.",
  },
];

const SUGGESTIONS = ["How do I register?", "Can I vote at 17?", "What ID do I need?", "What is NOTA?"];
const FALLBACK =
  "Hmm, I don't have that one. Try asking about registering, ID, your booth, the EVM, VVPAT or NOTA. For anything official, call 1950.";

function answer(q: string): Omit<Message, "id" | "from"> {
  const t = q.toLowerCase();
  const hit = ANSWERS.find((a) => a.keys.some((k) => t.includes(k)));
  return hit ? { text: hit.text, link: hit.link } : { text: FALLBACK };
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", text: "Namaste! I'm Pucho. Ask me anything about voting in India." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: q }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: "bot", ...answer(q) }]);
      setTyping(false);
    }, 550);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Pucho, the voting help chat"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed z-100 bottom-40 md:bottom-24 right-3 md:right-6 w-[calc(100vw-1.5rem)] max-w-[400px] h-[min(540px,65dvh)] liquid rounded-[30px] overflow-hidden flex flex-col origin-bottom-right"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="clay clay-rani w-10 h-10 rounded-[14px]! grid place-items-center font-display font-extrabold" lang="hi">
                  पू
                </span>
                <div>
                  <p className="font-display font-bold text-lg leading-none">Pucho</p>
                  <p className="text-xs text-dhundh mt-1">Quick answers, offline</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 flex flex-col gap-3" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[15px] leading-relaxed ${
                      m.from === "user"
                        ? "clay clay-genda rounded-[20px]! rounded-br-[6px]!"
                        : "glass-flat rounded-[20px] rounded-bl-[6px]"
                    }`}
                  >
                    {m.text}
                    {m.link && (
                      <Link
                        href={m.link.href}
                        onClick={() => setOpen(false)}
                        className="block mt-2 font-semibold text-genda underline underline-offset-4"
                      >
                        {m.link.label}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="glass-flat rounded-[20px] rounded-bl-[6px] px-4 py-3.5 self-start flex gap-1" aria-label="Pucho is typing">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-genda animate-bounce"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="px-4 pb-4 pt-2">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="shrink-0 glass-flat rounded-full px-3.5 py-1.5 text-sm text-dhundh hover:text-doodh hover:bg-white/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about voting…"
                  aria-label="Your question"
                  className="flex-1 min-w-0 rounded-full bg-neel/70 border border-white/15 px-5 py-3 text-[15px] shadow-[inset_0_3px_8px_rgba(0,0,0,0.35)] focus:outline-none focus:border-genda"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send"
                  className="clay clay-genda clay-press w-12 h-12 rounded-full! grid place-items-center shrink-0 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" aria-hidden="true" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Ask Pucho a question"}
        aria-expanded={open}
        className="fixed z-110 bottom-24 md:bottom-6 right-4 md:right-6 clay clay-rani clay-press w-14 h-14 rounded-full! grid place-items-center"
      >
        {open ? <X className="w-6 h-6" aria-hidden="true" /> : <MessageCircle className="w-6 h-6" aria-hidden="true" />}
      </button>
    </>
  );
}
