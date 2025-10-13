import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Camera, Star } from "lucide-react";

import SiteLayout from "@/components/layout/SiteLayout";

const candidates = [
  {
    number: "01",
    name: "Raja Shaka Q.",
    focus: "Digital Empowerment",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80",
  },
  {
    number: "02",
    name: "Daniel T.S",
    focus: "Collaborative Growth",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80",
  },
  {
    number: "03",
    name: "Alisya Aprilia A.F",
    focus: "Innovation & Inclusion",
    image:
      "https.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=640&q=80",
  },
];

const Candidates = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <SiteLayout>
      {/* POP-UP MODAL PENDAFTARAN */}
      {isModalOpen && (
        // DIUBAH: Kelas `backdrop-blur-sm` diubah menjadi `backdrop-blur-lg`
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
          <div className="mx-4 max-w-md rounded-[2.5rem] border border-primary/30 bg-gray-900/80 p-10 text-center shadow-2xl shadow-primary/20">
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-white">
                Candidate Registration is Now Open!
              </h2>
              <p className="text-white/75">
                The official list of candidates will be revealed here soon. Be
                the next leader of HMPSTI—this is your chance to inspire and
                innovate!
              </p>
              <NavLink
                to="/register" // GANTI DENGAN LINK PENDAFTARAN YANG BENAR
                className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-primary via-amber-300 to-primary px-8 py-3 font-semibold text-brand-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/40"
              >
                Become a Candidate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* KONTEN HALAMAN UTAMA */}
      <section className="relative px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-6xl space-y-12 text-white">
          <div className="space-y-4 text-center">
            <h1 className="font-display text-4xl leading-tight sm:text-5xl">
              HMPSTI’s Chief Candidates 2024–2025
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/80">
              Get to know the leadership styles and commitments of this year’s
              candidates. Each profile reflects their dedication to student
              innovation, academic excellence, and community inclusivity.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {candidates.map((candidate) => (
              <article
                key={candidate.number}
                className="group relative flex flex-col items-center gap-6 rounded-[2.5rem] border border-white/15 bg-white/10 p-8 text-center backdrop-blur-2xl transition hover:border-primary/40 hover:bg-white/15"
              >
                <div className="relative h-40 w-40 overflow-hidden rounded-[2rem] border-4 border-white/30 shadow-glow">
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                    No. {candidate.number}
                  </span>
                  <h2 className="font-display text-2xl text-white">
                    {candidate.name}
                  </h2>
                  <p className="text-sm text-white/70">{candidate.focus}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/60">
                  <Star className="h-4 w-4 text-primary" />
                  Tap to learn more about their mission and programs.
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/80 px-8 py-3 text-sm font-semibold text-brand-accent-foreground shadow-lg shadow-amber-500/30 transition hover:bg-primary"
            >
              Click Photo to Vote
            </button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Candidates;