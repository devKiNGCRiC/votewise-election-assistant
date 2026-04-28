"use client";

import { useState } from "react";
import Image from "next/image";

const candidates = [
  {
    id: 1,
    name: "Aarav Sharma",
    party: "Lok Shakti Party",
    partyIcon: "account_balance",
    partyColor: "bg-secondary-container text-on-secondary-container",
    desc: "Focusing on national digital infrastructure, rural entrepreneurship, and streamlining administrative processes for the youth.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGduqv1YU5PxLyp7QcVzktua4UIycpsbsRt6GID62fvl0WWopC2klDMAoC2QocIraeHrPoCdVR19wpGzlCY8ldVu7AwJNa3WOvIXp9_PftIk8RNs-VvYexxbfraTu8aCoI90FuV_RubIEp_q1S9LpyeoVKSrHvZJrQ90ufARt4xv1UzNL65nsN3MN_VXFZnBRuogvn9kTLPUjfuM6zHgJQEEph1MkgqSsxbzAQgBHzVPLXbEsqNgTIUnb22kYI6atoe6PHZoDpO7o",
    resultColor: "bg-secondary-container",
    votes: 45,
  },
  {
    id: 2,
    name: "Priya Das",
    party: "Green Bharat",
    partyIcon: "eco",
    partyColor: "bg-tertiary-container text-on-tertiary-container",
    desc: "Prioritizing sustainable agricultural practices, solar grid expansion in villages, and preservation of indigenous biodiversity.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCainvRHnvJoGwu-i6XW7W4N3xaoJKbukuf2TUQrZyMQRfdWaB3iPQBZGApkL3iok-97SRIjK53vo5AXJnvvyxC9uV9GCyCGujjJEg19rMpRq5zUpntlCMkhsLKcS6WrdyV4VEaPpzr1rP07Ym3bLDsvrs3vmlnTjNGKZwJ7UAXYMMjNSaxRBN55HElm_vIaIK4KEFYliG_GycZUYjv6QFO5t7oAz5bv68a6kiAVe4eMv_t2nxWCSze2vDkqN9rgisyEs6Ek1ojag",
    resultColor: "bg-gradient-to-r from-primary-container to-primary-fixed",
    votes: 38,
  },
  {
    id: 3,
    name: "Vikram Singh",
    party: "Swatantra Front",
    partyIcon: "group",
    partyColor: "bg-surface-container-high text-on-surface border border-outline/30",
    desc: "Data-driven approach to municipal governance, focusing on urban sanitation, tech-enabled public safety, and traffic reforms.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBD7X4ojJhHEmYbYTle1N0kLaEj4nIVOsLHHAqYojwsaOcGHp7JUnSvVLgDF_9mpZ0SJOPpM7O1L3VURU3d_oQbOe4c4DtyoOPBlMSTBSieN8yoCA-NAijJy6YggrPeEuaS0Ba8AfYznknKLx8vO6g_T1fVC3FM7xliz0mjvDGlu8wkqGpFOnyoJCh_Y0yz5w4JATjcE4s7oMrK7p7FJ_fA6aEu6ySlsvVO8qrywvBAUeikxZzZObBnnVykcCe8wihiEXHh-x5Ib5U",
    resultColor: "bg-tertiary-container/70",
    votes: 17,
  },
];

export default function SimulationPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const selectedCandidate = candidates.find((c) => c.id === selectedId);

  const handleCastVote = () => {
    if (!selectedId) return;
    setShowConfirmModal(true);
  };

  const confirmVote = () => {
    setShowConfirmModal(false);
    setHasVoted(true);
  };

  return (
    <>
      {/* ── VOTE CONFIRMATION MODAL — rendered as sibling to main ── */}
      {showConfirmModal && selectedCandidate && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-5"
          style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(10px)" }}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden border border-white/15"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Glow blob */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary-container/15 rounded-full blur-[60px] pointer-events-none" />

            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-primary-container/20 border-2 border-primary-container/40 flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(255,153,51,0.2)]">
              <span
                className="material-symbols-outlined text-4xl text-[#FF9933]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                how_to_vote
              </span>
            </div>

            <h2 className="text-h2 text-on-surface mb-2">Confirm Your Vote</h2>
            <p className="text-body-md text-on-surface-variant mb-6">
              You are about to cast your simulated vote for:
            </p>

            {/* Candidate summary */}
            <div className="w-full flex items-center gap-4 bg-surface-container/60 rounded-2xl px-5 py-4 mb-8 border border-white/5">
              <Image
                alt={selectedCandidate.name}
                src={selectedCandidate.image}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary-container/50 shrink-0"
              />
              <div className="text-left min-w-0">
                <p className="font-bold text-on-surface text-[16px] truncate">
                  {selectedCandidate.name}
                </p>
                <p className="text-label-sm text-on-surface-variant truncate">
                  {selectedCandidate.party}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={confirmVote}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white font-semibold shadow-[0_0_20px_rgba(255,153,51,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                Confirm &amp; Cast Vote
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-4 rounded-full bg-surface-container-high/60 text-on-surface-variant border border-outline-variant/30 font-semibold hover:bg-surface-container-highest transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow pt-32 pb-40 md:pb-24 px-5 max-w-7xl mx-auto w-full flex flex-col gap-xl relative">
        {/* Background ambient */}
        <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Header */}
        <section className="flex flex-col gap-sm mt-md">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high border border-outline/20 self-start mb-2">
            <span
              className="material-symbols-outlined text-primary-container text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              how_to_vote
            </span>
            <span className="text-label-sm text-on-surface-variant uppercase tracking-widest">
              EVM Simulation
            </span>
          </div>
          <h1 className="text-h1 text-on-background">Lok Sabha Election Simulation</h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Experience India&apos;s Electronic Voting Machine (EVM) process. Review the candidates
            below and cast your simulated ballot securely.
          </p>
        </section>

        {/* ── CANDIDATE SELECTION ── */}
        {!hasVoted && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {candidates.map((candidate) => {
              const isSelected = selectedId === candidate.id;
              return (
                <article
                  key={candidate.id}
                  onClick={() => setSelectedId(candidate.id)}
                  className={`cursor-pointer backdrop-blur-xl border rounded-2xl p-lg flex flex-col gap-md transition-all relative overflow-hidden group shadow-[8px_8px_16px_rgba(0,0,0,0.4),-4px_-4px_12px_rgba(255,255,255,0.05)] ${
                    isSelected
                      ? "bg-surface-variant/50 border-primary-container shadow-[0_0_24px_rgba(255,153,51,0.15)]"
                      : "bg-surface-variant/30 border-outline/20 hover:bg-surface-variant/50 hover:border-outline/40"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-bl-full -z-10" />
                  )}

                  <div className="flex items-start justify-between">
                    <Image
                      alt={candidate.name}
                      src={candidate.image}
                      width={80}
                      height={80}
                      className={`w-20 h-20 rounded-full object-cover border-2 transition-all ${
                        isSelected ? "border-primary-container" : "border-surface-container-high"
                      }`}
                    />
                    <span
                      className={`${candidate.partyColor} text-label-sm px-3 py-1.5 rounded-full flex items-center gap-1.5`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {candidate.partyIcon}
                      </span>
                      {candidate.party}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className={`text-h3 ${
                          isSelected ? "text-primary-fixed" : "text-on-background"
                        }`}
                      >
                        {candidate.name}
                      </h3>
                      {isSelected && (
                        <span
                          className="material-symbols-outlined text-primary-container"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      )}
                    </div>
                    <p className="text-body-md text-on-surface-variant line-clamp-3">
                      {candidate.desc}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isSelected) handleCastVote();
                      }}
                      className={`w-full py-3 rounded-xl font-label-sm flex items-center justify-center gap-2 transition-all ${
                        isSelected
                          ? "bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(255,153,51,0.4)] hover:scale-[1.02]"
                          : "bg-surface-container-highest text-on-surface hover:bg-surface-bright border border-outline/30"
                      }`}
                    >
                      <span className="material-symbols-outlined">
                        {isSelected ? "how_to_vote" : "radio_button_unchecked"}
                      </span>
                      {isSelected ? "Press Blue Button (Cast Vote)" : "Select Candidate"}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* ── RESULTS VIEW ── */}
        {hasVoted && (
          <section className="flex flex-col gap-lg">
            {/* VVPAT confirmation banner */}
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-green-500/20 bg-green-500/5">
              <div className="bg-green-500/20 p-3 rounded-full text-green-400 shrink-0">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <div>
                <h3 className="text-h3 text-green-400 mb-1">Vote Recorded in VVPAT ✓</h3>
                <p className="text-body-md text-on-surface-variant">
                  Your simulated vote has been securely processed. A long beep signifies successful
                  recording. You would see your choice on the VVPAT screen for 7 seconds.
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="bg-surface-container-lowest border border-outline/10 rounded-2xl p-lg flex flex-col gap-6 shadow-[8px_8px_16px_rgba(0,0,0,0.5)]">
              <h3 className="text-h3 text-on-background flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">bar_chart</span>
                Current Simulation Standings
              </h3>
              <div className="flex flex-col gap-5">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="flex flex-col gap-2">
                    <div className="flex justify-between text-label-sm">
                      <span className="text-on-background flex items-center gap-2">
                        <Image
                          alt={candidate.name}
                          src={candidate.image}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        {candidate.name}{" "}
                        <span className="text-on-surface-variant hidden sm:inline">
                          ({candidate.party})
                        </span>
                      </span>
                      <span
                        className={`font-semibold ${
                          candidate.id === selectedId
                            ? "text-primary-container"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {candidate.votes}%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-4 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                      <div
                        className={`${candidate.resultColor} h-full rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${candidate.votes}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setHasVoted(false);
                  setSelectedId(null);
                }}
                className="self-center mt-2 flex items-center gap-2 text-primary-container hover:text-primary text-label-sm border border-primary-container/30 hover:border-primary/50 px-5 py-2.5 rounded-full transition-all hover:bg-primary-container/10"
              >
                <span className="material-symbols-outlined text-[16px]">replay</span>
                Reset Simulation
              </button>
            </div>
          </section>
        )}

        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline/20 to-transparent my-md" />
      </main>
    </>
  );
}
