"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { name: "Home", href: "/", icon: "home" },
  { name: "Learn", href: "/learn", icon: "menu_book" },
  { name: "Simulation", href: "/simulation", icon: "ads_click" },
  { name: "Quiz", href: "/quiz", icon: "quiz" },
  { name: "About", href: "/about", icon: "info" },
];

const mobileBottomLinks = [
  { name: "Home", href: "/", icon: "home" },
  { name: "Learn", href: "/learn", icon: "menu_book" },
  { name: "Simulation", href: "/simulation", icon: "ads_click" },
  { name: "Quiz", href: "/quiz", icon: "quiz" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerOpenRef = useRef<boolean>(drawerOpen);

  useEffect(() => {
    drawerOpenRef.current = drawerOpen;
  }, [drawerOpen]);

  // Close drawer on route change
  useEffect(() => {
    // Only attempt to close if currently open; schedule async to avoid synchronous setState in effect
    if (!drawerOpenRef.current) return;
    const t = setTimeout(() => setDrawerOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* ── TOP APP BAR ── */}
      <header className="flex justify-between items-center w-full px-6 py-4 fixed top-0 z-[60] bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/10 shadow-xl font-['Inter'] antialiased tracking-tight">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="material-symbols-outlined text-2xl text-[#FF9933] drop-shadow-[0_0_8px_rgba(255,153,51,0.5)] group-hover:scale-110 transition-transform"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            how_to_vote
          </span>
          <span className="text-2xl font-black text-[#FF9933] drop-shadow-[0_0_8px_rgba(255,153,51,0.5)]">
            VoteWise
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-all duration-300 px-3 py-1.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "text-[#FF9933] font-bold bg-[#FF9933]/10 border-b-2 border-[#FF9933]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button className="hidden md:block bg-gradient-to-r from-[#FF9933] to-[#FF6A00] text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-[0_0_15px_rgba(255,153,51,0.5)] transition-all">
            Sign In
          </button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      {/* Drawer panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-[80vw] max-w-[320px] z-[80] md:hidden flex flex-col
          bg-[#1a120b]/95 backdrop-blur-2xl border-l border-white/10 shadow-[−20px_0_60px_rgba(0,0,0,0.6)]
          transition-transform duration-300 ease-in-out
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-xl text-[#FF9933]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              how_to_vote
            </span>
            <span className="text-xl font-black text-[#FF9933]">VoteWise</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF9933]/20 to-[#FF6A00]/10 text-[#FF9933] border border-[#FF9933]/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
                >
                  {link.icon}
                </span>
                <span className="font-semibold text-base">{link.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF9933]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="px-6 py-6 border-t border-white/10">
          <button className="w-full bg-gradient-to-r from-[#FF9933] to-[#FF6A00] text-white py-3 rounded-full font-semibold hover:shadow-[0_0_20px_rgba(255,153,51,0.4)] transition-all">
            Sign In
          </button>
          <p className="text-center text-on-surface-variant text-xs mt-4 opacity-50">
            © 2025 VoteWise India
          </p>
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAV (Stitch gradient pill style) ── */}
      <nav className="md:hidden fixed bottom-6 left-0 right-0 flex justify-center items-center px-4 z-[60]">
        <div className="w-[95%] max-w-sm mx-auto rounded-full border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] bg-slate-900/60 backdrop-blur-2xl flex justify-around items-center py-2 px-2">
          {mobileBottomLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-br from-[#FF9933] to-[#FFB366] text-white rounded-full px-3 py-2.5 shadow-[0_0_15px_rgba(255,153,51,0.5)] scale-105 -translate-y-0.5"
                    : "text-white/50 hover:text-[#FF9933] px-3 py-2.5"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
                >
                  {link.icon}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
