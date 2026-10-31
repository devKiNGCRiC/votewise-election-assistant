import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "./Navbar";

const official = [
  { name: "Voters' Service Portal", href: "https://voters.eci.gov.in/" },
  { name: "Election Commission of India", href: "https://www.eci.gov.in/" },
  { name: "Search the electoral roll", href: "https://electoralsearch.eci.gov.in/" },
];

export default function Footer() {
  return (
    <footer className="px-4 pb-28 md:pb-8 mt-16">
      <div className="mx-auto max-w-6xl glass-flat rounded-[32px] p-6 md:p-10 grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-dhundh text-[15px] max-w-sm">
            A free, non-partisan practice space for India&apos;s first-time voters. Not affiliated with the
            Election Commission of India.
          </p>
          <a
            href="tel:1950"
            className="clay clay-mor clay-press self-start flex items-center gap-2 px-4 py-2.5 font-semibold"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Voter helpline: 1950
          </a>
        </div>

        <div>
          <h2 className="font-display font-bold text-lg mb-3">Official sources</h2>
          <ul className="flex flex-col gap-2 text-[15px]">
            {official.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dhundh hover:text-genda underline-offset-4 hover:underline"
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display font-bold text-lg mb-3">On VoteWise</h2>
          <ul className="flex flex-col gap-2 text-[15px]">
            <li>
              <Link href="/eligibility" className="text-dhundh hover:text-genda">Can I vote?</Link>
            </li>
            <li>
              <Link href="/learn" className="text-dhundh hover:text-genda">How voting works</Link>
            </li>
            <li>
              <Link href="/simulation" className="text-dhundh hover:text-genda">Practise on the EVM</Link>
            </li>
            <li>
              <Link href="/about" className="text-dhundh hover:text-genda">About this project</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-dhundh-2 text-sm mt-6">
        Made in India for 18-year-olds everywhere · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
