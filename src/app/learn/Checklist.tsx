"use client";

import { Check, RotateCcw } from "lucide-react";
import { useStoredState } from "@/lib/useStoredState";

const items = [
  { id: "roll", label: "My name is on the electoral roll" },
  { id: "booth", label: "I know my booth address and serial number" },
  { id: "id", label: "EPIC or another approved photo ID is in my bag" },
  { id: "slip", label: "Voter information slip, if I got one" },
  { id: "hours", label: "I've checked the polling hours" },
  { id: "phone", label: "I'll leave my phone outside the voting compartment" },
];

const EMPTY: string[] = [];

export default function Checklist() {
  const [done, setDone] = useStoredState<string[]>("votewise:checklist", EMPTY);
  const count = done.length;
  const complete = count === items.length;

  const toggle = (id: string) => setDone(done.includes(id) ? done.filter((d) => d !== id) : [...done, id]);

  return (
    <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 items-start">
      <div className="md:sticky md:top-28">
        <h2 id="checklist-title" className="text-3xl md:text-5xl font-extrabold mb-3">
          Election day checklist
        </h2>
        <p className="text-dhundh text-lg mb-6 max-w-md">
          Your ticks are saved on this device, so you can come back the night before.
        </p>
        <div className="flex items-center gap-4">
          <div
            className="relative w-20 h-20 rounded-full grid place-items-center"
            style={{
              background: `conic-gradient(var(--color-mor) ${(count / items.length) * 360}deg, rgb(255 255 255 / 0.1) 0)`,
            }}
            role="img"
            aria-label={`${count} of ${items.length} done`}
          >
            <span className="absolute inset-2 rounded-full bg-neel grid place-items-center font-display font-extrabold text-xl">
              {count}/{items.length}
            </span>
          </div>
          <p className="font-display font-bold text-xl">
            {complete ? "Bag packed. Go vote!" : count === 0 ? "Nothing ticked yet" : "Getting there"}
          </p>
        </div>
        {count > 0 && (
          <button
            onClick={() => setDone(EMPTY)}
            className="mt-6 flex items-center gap-2 text-dhundh hover:text-doodh text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Clear all ticks
          </button>
        )}
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const checked = done.includes(item.id);
          return (
            <li key={item.id}>
              <button
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggle(item.id)}
                className={`w-full flex items-center gap-4 p-4 md:p-5 text-left text-[17px] font-medium transition-all ${
                  checked ? "clay clay-mor" : "glass-flat rounded-[22px] hover:bg-white/10"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-[10px] grid place-items-center shrink-0 transition-all ${
                    checked ? "bg-white/60" : "bg-neel/70 shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]"
                  }`}
                >
                  {checked && <Check className="w-5 h-5" strokeWidth={3} aria-hidden="true" />}
                </span>
                <span className={checked ? "line-through decoration-2 opacity-80" : ""}>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
