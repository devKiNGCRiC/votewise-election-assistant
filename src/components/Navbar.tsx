"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Gamepad2, House, UserSearch, Vote } from "lucide-react";

const links = [
  { name: "Home", href: "/", icon: House },
  { name: "Can I vote?", short: "Check", href: "/eligibility", icon: UserSearch },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "Try the EVM", short: "EVM", href: "/simulation", icon: Vote },
  { name: "Quiz", href: "/quiz", icon: Gamepad2 },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="VoteWise home">
      <span className="clay clay-genda w-9 h-9 rounded-[12px]! overflow-hidden">
        {/* Inked fingertip mark, same as the app icon */}
        <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
          <rect x="21" y="10" width="22" height="64" rx="11" fill="#b8784c" />
          <rect x="25" y="14" width="14" height="17" rx="7" fill="#f3d2bd" />
          <path d="M32 15v21" stroke="#5a2fd0" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display font-extrabold text-xl leading-none tracking-tight">
        VoteWise
        <span className="text-genda" lang="hi">
          {" "}
          मत
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-60 px-4 pt-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-4 liquid rounded-full pl-3 pr-2 py-2">
          <Logo />
          <nav className="hidden md:flex items-center gap-1" aria-label="Main">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-4 py-2 rounded-full text-[15px] font-medium transition-colors ${
                    active
                      ? "clay clay-doodh rounded-full!"
                      : "text-dhundh hover:text-doodh hover:bg-white/8"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <a
            href="https://voters.eci.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="clay clay-rani clay-press rounded-full! px-4 py-2 text-sm font-semibold whitespace-nowrap"
          >
            Register on ECI
          </a>
        </div>
      </header>

      {/* Mobile tab bar */}
      <nav
        aria-label="Main"
        className="md:hidden fixed bottom-3 inset-x-3 z-60 liquid rounded-[28px] px-1.5 py-1.5 flex justify-between"
      >
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-[22px] text-[11px] font-semibold transition-all ${
                active ? "clay clay-genda" : "text-dhundh"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
              {link.short ?? link.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
