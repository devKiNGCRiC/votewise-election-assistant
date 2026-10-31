import type { Metadata } from "next";
import StepGuide from "./StepGuide";
import MythCards from "./MythCards";
import Checklist from "./Checklist";

export const metadata: Metadata = {
  title: "How voting works",
  description: "The five steps from enrolling to the result, common myths, and an election day checklist.",
};

export default function LearnPage() {
  return (
    <div className="px-4">
      <div className="mx-auto max-w-6xl flex flex-col gap-20 md:gap-28">
        <section>
          <header className="max-w-2xl mb-10">
            <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[0.95]">How voting works</h1>
            <p className="mt-4 text-lg text-dhundh leading-relaxed">
              Five steps, from getting your name on the roll to the day results come out.
            </p>
          </header>
          <StepGuide />
        </section>

        <section aria-labelledby="myths">
          <h2 id="myths" className="text-3xl md:text-5xl font-extrabold mb-3">
            Heard this before?
          </h2>
          <p className="text-dhundh text-lg mb-8 max-w-xl">Tap a card to see what&apos;s actually true.</p>
          <MythCards />
        </section>

        <section id="checklist" aria-labelledby="checklist-title" className="scroll-mt-28">
          <Checklist />
        </section>
      </div>
    </div>
  );
}
