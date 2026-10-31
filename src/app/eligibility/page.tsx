import type { Metadata } from "next";
import EligibilityChecker from "./EligibilityChecker";

export const metadata: Metadata = {
  title: "Can I vote?",
  description: "Check when you can enrol as a voter in India and which form to fill.",
};

export default function EligibilityPage() {
  return (
    <div className="px-4">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-2xl mb-10">
          <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[0.95]">Can I vote?</h1>
          <p className="mt-4 text-lg text-dhundh leading-relaxed">
            Answer three questions. We&apos;ll tell you whether you can enrol now, when your name can be added to
            the roll, and which form to fill.
          </p>
        </header>
        <EligibilityChecker />
      </div>
    </div>
  );
}
