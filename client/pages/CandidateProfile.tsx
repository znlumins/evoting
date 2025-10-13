import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Compass,
  HelpCircle,
} from "lucide-react";

import SiteLayout from "@/components/layout/SiteLayout";

const menuItems = [
  "Home",
  "What’s New?",
  "About",
  "FAQ",
  "Cookie",
  "Help & Support",
  "Settings",
  "Log Out",
];

const achievements = [
  {
    title: "Regional Coordinator",
    detail: "Led Malang youth innovation initiatives with 350+ participants",
  },
  {
    title: "Academic Excellence",
    detail: "Dean’s List 2022 & 2023 for Information Systems",
  },
  {
    title: "Community Developer",
    detail: "Mentored 25 junior members for research-based competitions",
  },
];

const CandidateProfile = () => {
  return (
    <SiteLayout>
      <section className="relative px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 text-white lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-[2.5rem] border border-white/15 bg-white/10 p-6 backdrop-blur-2xl">
            <h2 className="font-display text-xl text-white">Navigation</h2>
            <nav className="mt-6 space-y-2 text-sm font-medium text-white/70">
              {menuItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={
                    index === 0
                      ? "flex items-center justify-between rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white"
                      : "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/25 hover:bg-white/15"
                  }
                >
                  <span>{item}</span>
                  {index === 0 ? (
                    <ArrowRight className="h-4 w-4" />
                  ) : (
                    <HelpCircle className="h-4 w-4 text-white/40" />
                  )}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-8">
            <header className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-8 backdrop-blur-2xl sm:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-6">
                  <div className="h-28 w-28 overflow-hidden rounded-[2rem] border-4 border-white/30 shadow-glow">
                    <img
                      src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=640&q=80"
                      alt="Candidate portrait"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                      Candidate Profile
                    </span>
                    <h1 className="font-display text-3xl text-white sm:text-4xl">
                      Nadia Khairunnisa Putri
                    </h1>
                    <p className="text-sm text-white/75">Region: Malang Raya</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-primary/40 bg-primary/20 px-6 py-5 text-sm text-white/80">
                  <p className="font-semibold text-white">Motto</p>
                  <p className="mt-1 text-base text-white/85">
                    “Empowering every member’s perspective to build a
                    compassionate, data-informed HMPSTI.”
                  </p>
                </div>
              </div>
            </header>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <article className="rounded-[2.5rem] border border-white/15 bg-white/10 p-8 backdrop-blur-2xl">
                <h2 className="flex items-center gap-2 font-display text-2xl text-white">
                  <BookOpenCheck className="h-6 w-6 text-primary" />
                  Experience & Vision
                </h2>
                <p className="mt-4 text-sm text-white/75">
                  Nadia focuses on digital transformation, collaborative
                  policymaking, and transparent performance tracking. Her
                  experience blends grassroots mentoring with strategic planning
                  for cross-department projects.
                </p>
                <ul className="mt-6 space-y-4 text-sm text-white/80">
                  <li className="flex items-start gap-3">
                    <Award className="mt-1 h-5 w-5 text-primary" />
                    <span>
                      Proposed the “Insight Hub” platform to centralize member
                      feedback and publish monthly progress scores.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="mt-1 h-5 w-5 text-primary" />
                    <span>
                      Initiated hybrid mentorship programs that connect alumni
                      expertise with current HMPSTI projects.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="mt-1 h-5 w-5 text-primary" />
                    <span>
                      Advocates for transparent funding dashboards highlighting
                      resource allocation and impact metrics.
                    </span>
                  </li>
                </ul>
              </article>

              <aside className="space-y-6">
                <div className="rounded-[2.5rem] border border-white/15 bg-white/10 p-6 backdrop-blur-2xl">
                  <h3 className="font-display text-xl text-white">
                    Highlights
                  </h3>
                  <ul className="mt-4 space-y-4 text-sm text-white/75">
                    {achievements.map((achievement) => (
                      <li key={achievement.title}>
                        <p className="font-semibold text-white">
                          {achievement.title}
                        </p>
                        <p className="text-white/70">{achievement.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[2.5rem] border border-white/15 bg-white/10 p-6 text-sm text-white/75 backdrop-blur-2xl">
                  <div className="flex items-center gap-3">
                    <Compass className="h-5 w-5 text-primary" />
                    <p className="font-semibold text-white">
                      Leadership Promise
                    </p>
                  </div>
                  <p className="mt-3">
                    Nadia pledges to build cross-division task forces, elevate
                    academic innovation, and ensure every voice remains central
                    to HMPSTI’s mission.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default CandidateProfile;
