"use client";

import { useState } from "react";
import { CalendarCheck, ExternalLink, Hourglass, PartyPopper, ShieldCheck, XCircle } from "lucide-react";

type YesNo = "yes" | "no" | null;

type Result =
  | { kind: "not-citizen" }
  | { kind: "registered"; abroad: boolean }
  | { kind: "eligible"; abroad: boolean }
  | { kind: "advance"; from: Date; abroad: boolean }
  | { kind: "wait"; applyFrom: Date; turns18: Date };

// Since 2022, ECI enrols new voters on four qualifying dates a year.
const QUALIFYING_MONTHS = [0, 3, 6, 9]; // 1 Jan, 1 Apr, 1 Jul, 1 Oct

function addYears(d: Date, years: number) {
  const r = new Date(d);
  r.setFullYear(r.getFullYear() + years);
  return r;
}

function firstQualifyingDateOnOrAfter(d: Date) {
  for (let year = d.getFullYear(); ; year++) {
    for (const m of QUALIFYING_MONTHS) {
      const q = new Date(year, m, 1);
      if (q >= d) return q;
    }
  }
}

function evaluate(dob: Date, citizen: YesNo, abroad: boolean, registered: YesNo): Result {
  if (citizen === "no") return { kind: "not-citizen" };
  if (registered === "yes") return { kind: "registered", abroad };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const turns18 = addYears(dob, 18);
  const enrolFrom = firstQualifyingDateOnOrAfter(turns18);

  if (enrolFrom <= today) return { kind: "eligible", abroad };
  const turns17 = addYears(dob, 17);
  if (today >= turns17) return { kind: "advance", from: enrolFrom, abroad };
  return { kind: "wait", applyFrom: turns17, turns18 };
}

const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

function Toggle({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | null;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="font-display font-bold text-lg mb-3">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`px-5 py-3 font-semibold transition-all ${
                active ? "clay clay-genda" : "glass-flat rounded-[22px] text-dhundh hover:text-doodh hover:bg-white/10"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

const PORTAL = "https://voters.eci.gov.in/";

function FormLink({ form, children }: { form: string; children: React.ReactNode }) {
  return (
    <a
      href={PORTAL}
      target="_blank"
      rel="noopener noreferrer"
      className="clay clay-doodh clay-press inline-flex items-center gap-2 px-5 py-3 font-semibold"
    >
      {children} ({form})
      <ExternalLink className="w-4 h-4" aria-hidden="true" />
    </a>
  );
}

function ResultCard({ result }: { result: Result }) {
  const shared = "rise rounded-[32px]! p-7 md:p-9 flex flex-col gap-4";
  switch (result.kind) {
    case "not-citizen":
      return (
        <div className={`${shared} glass`}>
          <XCircle className="w-10 h-10 text-rani" aria-hidden="true" />
          <h2 className="text-3xl font-extrabold">Only Indian citizens can vote</h2>
          <p className="text-dhundh text-lg">
            Under Article 326 of the Constitution, voting in Indian elections is open to citizens aged 18 and
            above. You can still learn how it all works here.
          </p>
        </div>
      );
    case "registered":
      return (
        <div className={`${shared} clay clay-mor`}>
          <ShieldCheck className="w-10 h-10" aria-hidden="true" />
          <h2 className="text-3xl font-extrabold">You&apos;re on the list. Nice.</h2>
          <p className="text-lg opacity-85">
            Double-check that your name and booth are right before every election. If you&apos;ve moved or
            something is spelt wrong, fix it with Form 8.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://electoralsearch.eci.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="clay clay-doodh clay-press inline-flex items-center gap-2 px-5 py-3 font-semibold"
            >
              Search the electoral roll
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <FormLink form="Form 8">Correct or shift my entry</FormLink>
          </div>
        </div>
      );
    case "eligible":
      return (
        <div className={`${shared} clay clay-genda`}>
          <PartyPopper className="w-10 h-10" aria-hidden="true" />
          <h2 className="text-3xl font-extrabold">Yes! You can enrol right now.</h2>
          <p className="text-lg opacity-85">
            {result.abroad
              ? "As an Indian citizen living abroad, you can register as an overseas elector. You'll vote in person at your home constituency."
              : "Apply online with your photo, age proof and address proof. Your Booth Level Officer may visit to verify, then your EPIC (voter ID) is posted to you."}
          </p>
          <div>
            <FormLink form={result.abroad ? "Form 6A" : "Form 6"}>Apply on the Voters&apos; Service Portal</FormLink>
          </div>
        </div>
      );
    case "advance":
      return (
        <div className={`${shared} clay clay-syahi`}>
          <CalendarCheck className="w-10 h-10" aria-hidden="true" />
          <h2 className="text-3xl font-extrabold">Apply now, vote from {fmt(result.from)}</h2>
          <p className="text-lg opacity-85">
            You&apos;re 17 or older, so you can apply in advance. Your name will be added to the roll on the
            qualifying date after you turn 18.
          </p>
          <div>
            <FormLink form={result.abroad ? "Form 6A" : "Form 6"}>Apply in advance</FormLink>
          </div>
        </div>
      );
    case "wait":
      return (
        <div className={`${shared} glass`}>
          <Hourglass className="w-10 h-10 text-genda" aria-hidden="true" />
          <h2 className="text-3xl font-extrabold">Not yet, but soon</h2>
          <p className="text-dhundh text-lg">
            You turn 18 on <strong className="text-doodh">{fmt(result.turns18)}</strong>. You can apply in advance
            from <strong className="text-doodh">{fmt(result.applyFrom)}</strong>. Practise on the EVM until then.
          </p>
        </div>
      );
  }
}

export default function EligibilityChecker() {
  const [dob, setDob] = useState("");
  const [citizen, setCitizen] = useState<YesNo>(null);
  const [abroad, setAbroad] = useState<YesNo>(null);
  const [registered, setRegistered] = useState<YesNo>(null);

  const ready = dob && citizen && (citizen === "no" || (abroad && registered));
  const result = ready ? evaluate(new Date(`${dob}T00:00:00`), citizen, abroad === "yes", registered) : null;
  const maxDob = new Date().toISOString().slice(0, 10);

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
      <form className="glass rounded-[32px] p-6 md:p-8 flex flex-col gap-7" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="dob" className="font-display font-bold text-lg block mb-3">
            Your date of birth
          </label>
          <input
            id="dob"
            type="date"
            value={dob}
            max={maxDob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full sm:w-auto rounded-[18px] bg-neel/70 border border-white/15 px-5 py-3.5 text-lg text-doodh shadow-[inset_0_4px_10px_rgba(0,0,0,0.35)] focus:outline-none focus:border-genda"
          />
        </div>
        <Toggle
          label="Are you an Indian citizen?"
          value={citizen}
          onChange={(v) => setCitizen(v as YesNo)}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {citizen === "yes" && (
          <>
            <Toggle
              label="Where do you live right now?"
              value={abroad}
              onChange={(v) => setAbroad(v as YesNo)}
              options={[
                { value: "no", label: "In India" },
                { value: "yes", label: "Abroad" },
              ]}
            />
            <Toggle
              label="Are you already on the voter list?"
              value={registered}
              onChange={(v) => setRegistered(v as YesNo)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No / not sure" },
              ]}
            />
          </>
        )}
      </form>

      <div aria-live="polite" className="lg:sticky lg:top-28">
        {result ? (
          <ResultCard key={JSON.stringify(result)} result={result} />
        ) : (
          <div className="rounded-[32px] border-2 border-dashed border-white/15 p-8 text-dhundh text-lg">
            Your answer shows up here as soon as you fill in the form.
          </div>
        )}
        <p className="text-sm text-dhundh-2 mt-4 px-2">
          This is a guide, not an official decision. Your Electoral Registration Officer makes the final call.
        </p>
      </div>
    </div>
  );
}
