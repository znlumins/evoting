import { cn } from "@/lib/utils";

type PhoneShowcaseProps = {
  className?: string;
};

type PhoneConfig = {
  id: string;
  background: string;
  title: string;
  subtitle: string;
  metric: string;
  rotation: string;
  translation: string;
};

const PHONES: PhoneConfig[] = [
  {
    id: "activity",
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(26,59,179,0.55) 100%)",
    title: "Live Participation",
    subtitle: "482 votes today",
    metric: "+12.4%",
    rotation: "-rotate-[11deg]",
    translation: "-translate-y-12",
  },
  {
    id: "security",
    background:
      "linear-gradient(210deg, rgba(251,191,36,0.35) 0%, rgba(15,29,83,0.9) 100%)",
    title: "Secure Access",
    subtitle: "Biometric ready",
    metric: "Shielded",
    rotation: "rotate-[6deg]",
    translation: "translate-y-4",
  },
  {
    id: "results",
    background:
      "linear-gradient(210deg, rgba(255,255,255,0.18) 0%, rgba(37,83,231,0.65) 100%)",
    title: "Results Dashboard",
    subtitle: "Instant insights",
    metric: "Real-time",
    rotation: "-rotate-[3deg]",
    translation: "translate-y-12",
  },
];

const PhoneShowcase = ({ className }: PhoneShowcaseProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute inset-x-12 top-1/2 h-40 -translate-y-1/2 rounded-full bg-black/30 blur-3xl" />
      <div className="relative flex max-w-[520px] flex-wrap items-center justify-center gap-6">
        {PHONES.map((phone) => (
          <article
            key={phone.id}
            className={cn(
              "relative h-[420px] w-[220px] origin-bottom rounded-[2.75rem] border border-white/20 bg-white/10 p-3 shadow-glow backdrop-blur-2xl transition-transform",
              "before:absolute before:inset-[6px] before:rounded-[2rem] before:border before:border-white/15",
              "after:absolute after:-left-2 after:top-16 after:h-10 after:w-1 after:rounded-full after:bg-black/40",
              phone.rotation,
              phone.translation,
            )}
            style={{ background: phone.background }}
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white/5 text-left">
              <header className="flex items-center justify-between px-5 pt-5 text-xs text-white/80">
                <span className="font-semibold tracking-wide">HMPSTI Vote</span>
                <div className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-300" />
                  <span className="inline-block h-2 w-2 rounded-full bg-rose-400" />
                </div>
              </header>

              <div className="mt-8 space-y-5 px-5 text-white">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-white/60">
                    {phone.metric}
                  </p>
                  <p className="mt-1 text-xl font-semibold leading-tight">
                    {phone.title}
                  </p>
                  <p className="text-sm text-white/60">{phone.subtitle}</p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>Confidence</span>
                    <span>99.2%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-white" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-xs text-white/70">
                  <div className="flex items-center justify-between">
                    <span>Last synced</span>
                    <span>3 mins ago</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Voters</span>
                      <span className="font-medium text-white">1,945</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Participation</span>
                      <span className="font-medium text-white">78%</span>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="mt-auto px-5 pb-6">
                <div className="rounded-full border border-white/15 bg-black/40 p-3 text-center text-xs uppercase tracking-[0.28em] text-white/60">
                  Secure · Transparent · Trusted
                </div>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PhoneShowcase;
