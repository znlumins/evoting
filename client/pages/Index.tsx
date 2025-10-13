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
import PhoneShowcase from "@/components/PhoneShowcase";

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

const metrics = [
  { label: "Active Voters", value: "1,945" },
  { label: "Turnout Projection", value: "87%" },
  { label: "Security Audits", value: "12" },
];

const steps = [
  {
    title: "Nominate & Announce",
    detail:
      "Share candidate profiles with interactive media and make every introduction feel personal and powerful.",
  },
  {
    title: "Engage & Debate",
    detail:
      "Host live forums, collect questions, and surface key talking points that matter to every region.",
  },
  {
    title: "Vote & Celebrate",
    detail:
      "Guide members through secure ballots, confirm participation instantly, and reveal results with confidence.",
  },
];

export default function Index() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden px-6 pb-24 pt-24 sm:px-10 sm:pt-28">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="relative z-10 space-y-10">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-primary" /> Your Voice · Your
              Choice
            </span>
            <div className="space-y-6">
              <h1 className="font-display text-4xl leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your Voice, Your Vote: Shaping Tomorrow Together
              </h1>
              <p className="max-w-xl text-lg text-white/80">
                Short description about the democratic voting spirit for HMPSTI
                members. Empower every decision with a secure, inspiring, and
                inclusive e-voting experience tailor-made for HMPSTI Universitas
                Brawijaya.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
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
            <div className="grid grid-cols-3 gap-6 text-sm text-white/70 sm:max-w-lg">
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

          <div className="relative">
            <div className="absolute -top-16 right-6 h-32 w-32 rounded-full bg-amber-300/30 blur-3xl" />
            <PhoneShowcase className="relative z-10" />
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Designed for a Seamless HMPSTI Election Journey
              </h2>
              <p className="text-base text-white/75">
                We built the HMPSTI e-voting experience to mirror the energy of
                student leadership—secure, transparent, and community driven.
                Every screen, notification, and insight is crafted to celebrate
                participation.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-xs uppercase tracking-[0.42em] text-white/70 backdrop-blur-xl">
              Trusted · Secure · Empowering
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >
                <div
                  className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                  aria-hidden
                >
                  <div className="absolute -right-10 top-10 h-32 w-32 rounded-full bg-amber-200/20 blur-3xl" />
                </div>
                <item.icon className="h-9 w-9 text-primary" />
                <h3 className="mt-6 font-display text-2xl text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-white/75">{item.description}</p>
                <span className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl sm:p-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                A Three-Phase Path to a Powerful Mandate
              </h2>
              <p className="text-base text-white/75">
                From nominations to celebrations, we guide HMPSTI members
                through a transparent and inspiring election process. Every
                phase is built with interactive storytelling, vibrant visuals,
                and secure verification.
              </p>
              <NavLink
                to="/general-election"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Discover the 2024–2025 Roadmap
                <ArrowRight className="h-4 w-4" />
              </NavLink>
            </div>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex items-start gap-4 rounded-3xl border border-white/10 bg-brand-surface/70 p-6 backdrop-blur-xl"
                >
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-28 sm:px-10">
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
      </section>
    </SiteLayout>
  );
}
