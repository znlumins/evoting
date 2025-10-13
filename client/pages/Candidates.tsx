import { Camera, Star } from "lucide-react";

import SiteLayout from "@/components/layout/SiteLayout";

const candidates = [
  {
    number: "01",
    name: "Alya Putri Santoso",
    focus: "Digital Empowerment",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80",
  },
  {
    number: "02",
    name: "Rafi Darmawan",
    focus: "Collaborative Growth",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80",
  },
  {
    number: "03",
    name: "Siti Nur Mardia",
    focus: "Innovation & Inclusion",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=640&q=80",
  },
];

const Candidates = () => {
  return (
    <SiteLayout>
      <section className="relative px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl space-y-12 text-white">
          <div className="space-y-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              <Camera className="h-4 w-4 text-primary" /> Candidate Spotlight
            </span>
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
