import { Link } from "react-router-dom";
import { Facebook, LogIn, ShieldCheck } from "lucide-react";

import SiteLayout from "@/components/layout/SiteLayout";

const READY_STATES = [
  "Single sign-on options for quick entry",
  "Encrypted credentials with multi-layer security",
  "Progress tracking for every voter session",
];

const Login = () => {
  return (
    <SiteLayout mainClassName="flex items-center justify-center">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur-xl">
              Ready to Vote
            </span>
            <h1 className="font-display text-4xl text-white sm:text-5xl">Welcome</h1>
            <p className="max-w-xl text-base text-white/80">
              Sign in with your HMPSTI credentials to participate in the 2024–2025 General Election. Your secure dashboard keeps you updated on timelines, candidate highlights, and voting milestones.
            </p>
          </div>

          <div className="space-y-4">
            {READY_STATES.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80 backdrop-blur"
              >
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-4xl border border-white/15 bg-white/10 p-8 backdrop-blur-2xl sm:p-10">
          <div className="space-y-1 text-center">
            <h2 className="font-display text-2xl text-white">Secure Access Portal</h2>
            <p className="text-sm text-white/70">Use your registered information to continue.</p>
          </div>

          <form className="mt-8 space-y-6" aria-label="Login form">
            <div className="space-y-2">
              <label htmlFor="nim" className="text-sm font-medium text-white/90">
                ID / NIM
              </label>
              <div className="relative">
                <input
                  id="nim"
                  name="nim"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter your student ID"
                  className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-base text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                  autoComplete="on"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white/90">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-base text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-transparent bg-gradient-to-r from-primary via-amber-300 to-primary px-4 py-3 text-base font-semibold text-brand-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/30"
            >
              <LogIn className="h-5 w-5" />
              Login
            </button>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/20"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-[#4285F4]">
                  G
                </span>
                Login with Google
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-[#1877F2]/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-[#1877F2]/40"
              >
                <Facebook className="h-5 w-5 text-[#EFF3FF]" />
                Login with Facebook
              </button>
            </div>

            <div className="flex flex-col gap-2 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
              <Link to="#" className="underline-offset-4 transition hover:text-white hover:underline">
                Forgot password?
              </Link>
              <span>
                New to the platform?{" "}
                <Link to="#" className="font-semibold text-primary underline-offset-4 transition hover:text-amber-300 hover:underline">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Login;
