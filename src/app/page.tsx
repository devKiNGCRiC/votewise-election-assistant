import Link from "next/link";
import { BookOpen, Gamepad2, ListChecks, UserSearch, Vote } from "lucide-react";
import InkFinger from "@/components/InkFinger";

const journey = [
  {
    href: "/eligibility",
    title: "Check if you can vote",
    body: "Enter your date of birth and see exactly when you can enrol, and which form to fill.",
    icon: UserSearch,
    clay: "clay-genda",
  },
  {
    href: "/learn",
    title: "Learn the five steps",
    body: "From finding your name on the roll to the counting day result, in plain language.",
    icon: BookOpen,
    clay: "clay-mor",
  },
  {
    href: "/simulation",
    title: "Practise on the EVM",
    body: "Get inked, press the blue button, hear the beep and watch your VVPAT slip for 7 seconds.",
    icon: Vote,
    clay: "clay-evm",
  },
  {
    href: "/quiz",
    title: "Test yourself",
    body: "Ten quick questions. Beat your best score, keep your streak alive.",
    icon: Gamepad2,
    clay: "clay-rani",
  },
];

export default function Home() {
  return (
    <div className="px-4">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl grid md:grid-cols-[1.25fr_1fr] gap-10 md:gap-6 items-center pt-6 md:pt-10">
        <div className="rise">
          <p lang="hi" className="font-display text-genda text-xl font-semibold mb-3">
            पहली बार वोट?
          </p>
          <h1 className="font-extrabold leading-[0.92] text-[clamp(3rem,9vw,6.5rem)]">
            First vote?
            <br />
            Chill, we got you.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-dhundh max-w-[34rem] leading-relaxed">
            Find out if you can vote, learn how India votes, and practise on a real-feel EVM, so you walk
            into the booth knowing exactly what to do.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/simulation" className="clay clay-genda clay-press px-7 py-4 text-lg font-semibold">
              Practise on the EVM
            </Link>
            <Link
              href="/eligibility"
              className="glass-flat rounded-[22px] px-7 py-4 text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Can I vote?
            </Link>
          </div>
        </div>

        {/* Inked finger on a clay stage */}
        <div className="relative mx-auto w-full max-w-[380px] aspect-[4/5]">
          <div className="absolute inset-[6%] clay clay-neel rounded-[48px]! overflow-hidden">
            <InkFinger className="absolute left-1/2 -translate-x-1/2 -bottom-[8%] h-[96%] drop-shadow-[0_20px_30px_rgba(5,2,20,0.55)]" />
          </div>
          <span
            className="float clay clay-mor absolute top-[12%] -left-2 md:-left-8 px-4 py-2 text-sm font-semibold rounded-full!"
            style={{ ["--r" as string]: "-6deg" }}
          >
            EPIC ready ✓
          </span>
          <span
            className="float clay clay-genda absolute top-[42%] -right-2 md:-right-6 px-4 py-2 text-sm font-semibold rounded-full!"
            style={{ ["--r" as string]: "5deg", animationDelay: "-2s" }}
          >
            Booth no. 142
          </span>
          <span
            className="float clay clay-syahi absolute bottom-[14%] -left-1 md:-left-4 px-4 py-2 text-sm font-semibold rounded-full!"
            style={{ ["--r" as string]: "-3deg", animationDelay: "-4s" }}
          >
            VVPAT · 7 sec
          </span>
        </div>
      </section>

      {/* ── Scale, in one sentence ── */}
      <section className="mx-auto max-w-6xl mt-20 md:mt-28">
        <p className="font-display font-bold text-[clamp(1.6rem,3.6vw,2.6rem)] leading-tight max-w-4xl">
          In 2024, <span className="text-genda">96.8 crore</span> people were registered to vote at over{" "}
          <span className="text-mor">10.5 lakh</span> polling stations, choosing{" "}
          <span className="text-rani">543</span> MPs. Your vote is one of them, and it counts the same.
        </p>
      </section>

      {/* ── Journey ── */}
      <section className="mx-auto max-w-6xl mt-16 md:mt-24" aria-labelledby="journey">
        <h2 id="journey" className="text-3xl md:text-4xl font-extrabold mb-8">
          Your path to the booth
        </h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {journey.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.href}>
                <Link
                  href={step.href}
                  className="group glass-flat rounded-[28px] p-6 h-full flex flex-col gap-5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className={`clay ${step.clay} w-14 h-14 grid place-items-center rounded-[18px]!`}>
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <span className="font-display font-extrabold text-4xl text-white/15">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1.5 group-hover:text-genda transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-dhundh leading-relaxed">{step.body}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── Checklist teaser ── */}
      <section className="mx-auto max-w-6xl mt-16 md:mt-24">
        <div className="glass rounded-[36px] p-7 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center overflow-hidden relative">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Election day bag, packed?</h2>
            <p className="text-dhundh text-lg max-w-xl">
              Keep a checklist of your EPIC, booth slip and booth address. It stays saved on this device, so
              you can tick things off the night before.
            </p>
          </div>
          <Link
            href="/learn#checklist"
            className="clay clay-mor clay-press px-6 py-4 font-semibold flex items-center gap-2 justify-self-start"
          >
            <ListChecks className="w-5 h-5" aria-hidden="true" />
            Open my checklist
          </Link>
        </div>
      </section>
    </div>
  );
}
