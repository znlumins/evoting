import { ArrowRight, Images } from "lucide-react";

import SiteLayout from "@/components/layout/SiteLayout";

const galleryImages = [
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
];

const Gallery = () => {
  return (
    <SiteLayout mainClassName="flex items-center">
      <section className="w-full px-6 py-0 sm:px-10">
        <div className="mx-auto w-full max-w-6xl space-y-10">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 text-white shadow-glow backdrop-blur-2xl">
            <div className="relative isolate flex min-h-[520px] flex-col justify-between gap-10 overflow-hidden rounded-[2.5rem] p-10">
              <img
                src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=80"
                alt="Regeneration Staff HMPSTI 2023–2024"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-30 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f1d53]/80 via-[#1a3bb3]/70 to-[#0f1d53]/85" />

              <div className="relative z-10 space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
                  <Images className="h-4 w-4 text-primary" /> Gallery
                </span>
                <div className="space-y-4">
                  <h1 className="font-display text-4xl leading-tight sm:text-5xl">
                    Gallery: Regeneration Staff HMPSTI 2024–2025
                  </h1>
                  <p className="max-w-2xl text-base text-white/80">
                    Relive the milestones of our regeneration program. From
                    collaboration labs to leadership workshops, this gallery
                    captures the dedication and camaraderie that fuel HMPSTI
                    Universitas Brawijaya.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="grid gap-3 text-xs uppercase tracking-[0.35em] text-white/60 sm:grid-cols-3 sm:gap-6">
                  <span>Leadership Retreat</span>
                  <span>Community Impact</span>
                  <span>Innovation Labs</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/25"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {galleryImages.map((src, index) => (
              <div
                key={src}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
              >
                <img
                  src={src}
                  alt={`Gallery highlight ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1d53]/80 via-transparent to-transparent opacity-75" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Gallery;
