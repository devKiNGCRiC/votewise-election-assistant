import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Why VoteWise exists, where the information comes from, and what we don't do.",
};

const promises = [
  {
    title: "No side taken",
    body: "Every candidate and party on this site is made up. We explain how voting works, never who to vote for.",
    clay: "clay-genda",
  },
  {
    title: "Nothing tracked",
    body: "Your practice vote, checklist and quiz score stay in your own browser. There are no accounts and nothing is sent anywhere.",
    clay: "clay-mor",
  },
  {
    title: "Official sources first",
    body: "Facts are based on Election Commission of India material. When in doubt, the ECI portal and helpline 1950 are the final word.",
    clay: "clay-rani",
  },
];

export default function AboutPage() {
  return (
    <div className="px-4">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[0.95]">
            Built so nobody walks into a booth confused.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-dhundh leading-relaxed max-w-2xl">
            Millions of Indians turn 18 every year. Many of them have never seen an EVM up close, don&apos;t know
            which form to fill, or think they need a card they don&apos;t have. VoteWise is a free practice space
            for exactly that moment.
          </p>
        </header>

        <ul className="grid md:grid-cols-3 gap-4 mt-14">
          {promises.map((p) => (
            <li key={p.title} className={`clay ${p.clay} rounded-[28px]! p-7 flex flex-col gap-3`}>
              <h2 className="text-2xl font-extrabold">{p.title}</h2>
              <p className="text-[17px] leading-relaxed opacity-85">{p.body}</p>
            </li>
          ))}
        </ul>

        <section className="glass rounded-[36px] p-7 md:p-12 mt-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Not an official ECI website</h2>
            <p className="text-dhundh text-lg max-w-xl">
              VoteWise is an independent learning project. To register, correct your details or download your
              e-EPIC, use the Voters&apos; Service Portal.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="https://voters.eci.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="clay clay-doodh clay-press px-6 py-3.5 font-semibold text-center"
            >
              Open the ECI portal
            </a>
            <Link href="/simulation" className="glass-flat rounded-[22px] px-6 py-3.5 font-semibold text-center hover:bg-white/10">
              Practise on the EVM
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
