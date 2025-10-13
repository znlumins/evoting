import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import SiteLayout from "@/components/layout/SiteLayout";

const highlights = [
  {
    title: "Transparent Process",
    description:
      "Live updates, real-time participation tracking, and verifiable results keep every member informed.",
    icon: ShieldCheck,
  },
  {
    title: "Inclusive Engagement",
    description:
      "Accessible voting tailored for HMPSTI members with intuitive flows on any device you choose.",
    icon: Users,
  },
  {
    title: "Momentum in Minutes",
    description:
      "Streamlined countdown tools, reminders, and smart checkpoints keep the election moving forward.",
    icon: Clock3,
  },
];

const metrics = [];

export default function Index() {
  return (
    <SiteLayout>
      {/* Section 1: Hero / Bagian Utama (Telah Dimodifikasi) */}
      <section className="relative overflow-hidden px-6 pb-24 pt-24 text-center sm:px-10 sm:pt-32">
        {/* Container utama dibuat max-w-4xl untuk membatasi lebar konten */}
        <div className="mx-auto max-w-4xl">
          <div className="relative z-10 space-y-10">
            {/* Span akan otomatis berada di tengah karena parent memiliki text-center */}
            {/* <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur-xl">
                Satu Hati, Satu Gerak, TI Jaya
            </span> */}
            <div className="space-y-6">
              <h1 className="font-display text-4xl leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your Voice, Your Vote: Shaping Tomorrow Together
              </h1>
              {/* Paragraf diberi mx-auto agar tetap di tengah dan menghormati max-w */}
              <p className="mx-auto max-w-xl text-lg text-white/80">
                Empower every decision with a secure, inspiring, and inclusive
                e-voting experience tailor-made for HMPSTI Universitas
                Brawijaya.
              </p>
            </div>
            {/* Container tombol diberi justify-center */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <NavLink
                to="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-primary via-amber-300 to-primary px-6 py-3 font-semibold text-brand-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/40"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </NavLink>
              <a
                href="#about"
                className="text-sm font-semibold uppercase tracking-[0.32em] text-white/80 transition hover:text-white"
              >
                Learn More
              </a>
            </div>
            {/* Container metrics diberi mx-auto agar berada di tengah */}
            <div className="mx-auto grid grid-cols-3 gap-6 text-sm text-white/70 sm:max-w-lg">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl"
                >
                  <p className="text-2xl font-semibold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 uppercase tracking-[0.3em] text-[0.65rem]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Final Call to Action / Ajakan Bertemu Kandidat */}
      {/* <section className="relative z-10 px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-white/15 via-white/10 to-white/5 p-10 backdrop-blur-2xl sm:p-14">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <h3 className="font-display text-3xl text-white sm:text-4xl">
                  Meet the Candidates and Cast an Informed Vote
                </h3>
                <p className="text-base text-white/75">
                  Dive into candidate visions, achievements, and leadership
                  styles. Compare profiles, explore campaign promises, and get
                  ready to make the choice that shapes HMPSTI’s future.
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-white/75">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Verified
                    Profiles
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                    <Users className="h-4 w-4 text-primary" /> Community
                    Insights
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <NavLink
                  to="/candidates"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/15 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/25"
                >
                  Explore Candidate List
                  <ArrowRight className="h-4 w-4" />
                </NavLink>
                <NavLink
                  to="/candidate-profile"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/80 px-6 py-3 font-semibold text-brand-accent-foreground shadow-lg shadow-amber-500/25 transition hover:bg-primary"
                >
                  Review a Candidate Profile
                  <ArrowRight className="h-4 w-4" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </SiteLayout>
  );
}