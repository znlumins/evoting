import { ArrowRight, CalendarCheck2, Megaphone } from "lucide-react";

import SiteLayout from "@/components/layout/SiteLayout";

const milestones = [
  {
    label: "Registration Opens",
    detail: "January 5, 2025",
  },
  {
    label: "Campaign Presentations",
    detail: "February 12–16, 2025",
  },
  {
    label: "Voting Window",
    detail: "March 2–4, 2025",
  },
];

const GeneralElection = () => {
  return (
    <SiteLayout>
      <section className="relative px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-5xl space-y-14 text-white">
          <div className="space-y-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              <Megaphone className="h-4 w-4 text-primary" /> Official
              Announcement
            </span>
            <h1 className="font-display text-4xl leading-tight sm:text-5xl">
              General Election 2024–2025
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/80">
              HMPSTI Universitas Brawijaya invites every member to participate
              in shaping the organization’s future. From strategic planning to
              inclusive participation, our digital election experience keeps the
              democratic spirit alive and united.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 rounded-[2.5rem] border border-white/15 bg-white/10 p-10 text-left backdrop-blur-2xl sm:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <h2 className="font-display text-2xl text-white">
                Why Your Vote Matters
              </h2>
              <p className="text-sm text-white/75">
                We believe in a leadership that listens, collaborates, and acts.
                Each ballot contributes to a transparent mandate that propels
                student innovation, community projects, and the collective
                achievements of HMPSTI.
              </p>
              <ul className="space-y-4 text-sm text-white/75">
                <li className="flex items-start gap-3">
                  <CalendarCheck2 className="mt-1 h-5 w-5 text-primary" />
                  <span>
                    Interactive agenda reminders that keep you aligned with
                    every milestone.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CalendarCheck2 className="mt-1 h-5 w-5 text-primary" />
                  <span>
                    Transparent debate coverage, summaries, and highlight reels
                    in one place.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CalendarCheck2 className="mt-1 h-5 w-5 text-primary" />
                  <span>
                    Instant verification at the moment of submission, ensuring
                    vote integrity.
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-primary/25 bg-primary/15 p-6 text-sm text-white/80">
                <h3 className="text-lg font-semibold text-white">
                  Election Milestones
                </h3>
                <ul className="mt-4 space-y-4">
                  {milestones.map((milestone) => (
                    <li
                      key={milestone.label}
                      className="flex items-center justify-between"
                    >
                      <span>{milestone.label}</span>
                      <span className="text-white">{milestone.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/25"
              >
                Join Us!
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default GeneralElection;
