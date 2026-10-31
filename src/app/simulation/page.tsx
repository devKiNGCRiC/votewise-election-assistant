import type { Metadata } from "next";
import EvmSimulator from "./EvmSimulator";

export const metadata: Metadata = {
  title: "Practise on the EVM",
  description: "Walk through the polling booth: show your ID, get inked, press the blue button and check your VVPAT slip.",
};

export default function SimulationPage() {
  return (
    <div className="px-4">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl mb-10">
          <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[0.95]">Practise on the EVM</h1>
          <p className="mt-4 text-lg text-dhundh leading-relaxed">
            Walk through the booth exactly as it happens on polling day. The candidates and parties here are
            made up, and nothing you press is recorded.
          </p>
        </header>
        <EvmSimulator />
      </div>
    </div>
  );
}
