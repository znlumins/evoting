import { useState, type PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

type SiteLayoutProps = PropsWithChildren<{
  backgroundClassName?: string;
  mainClassName?: string;
}>;

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Login", to: "/login" },
  { label: "Gallery", to: "/gallery" },
  { label: "General Election", to: "/general-election" },
  { label: "Candidates", to: "/candidates" },
  { label: "Candidate Profile", to: "/candidate-profile" },
];

const SiteLayout = ({
  children,
  backgroundClassName,
  mainClassName,
}: SiteLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col overflow-hidden text-white",
        backgroundClassName ?? "bg-brand-gradient",
      )}
    >
      <div className="pointer-events-none absolute -top-32 left-16 h-72 w-72 rounded-full bg-brand-radial blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] top-40 h-96 w-96 rounded-full bg-brand-radial blur-3xl" />

      <header className="relative z-30 px-4 py-6 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
          <NavLink to="/" className="flex shrink-0 items-center gap-3" aria-label="HMPSTI Universitas Brawijaya">
            <img
              src="https://i.ibb.co.com/93f5Byrn/Group-673.png"
              alt="HMPSTI Universitas Brawijaya logo"
              className="h-10 w-auto object-contain filter brightness-0 invert"
              loading="lazy"
            />
          </NavLink>

          <div className="flex flex-1 items-center justify-end gap-3">
            <nav className="hidden lg:block">
              <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm font-medium">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "relative rounded-full px-4 py-2 transition",
                          "hover:bg-white/15",
                          isActive && "bg-white text-brand-primary-soft",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20 lg:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="mx-auto mt-4 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl lg:hidden">
            <nav>
              <ul className="flex flex-col divide-y divide-white/10 text-sm font-medium">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "block px-5 py-4 transition",
                          "hover:bg-white/15",
                          isActive && "bg-white/20 text-primary",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ) : null}
      </header>

      <main className={cn("relative z-20 flex-1", mainClassName)}>{children}</main>

      <footer className="relative z-20 px-4 pb-10 pt-6 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-sm text-white/70 backdrop-blur-xl sm:flex-row">
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} HMPSTI Universitas Brawijaya.</p>
          <p className="uppercase tracking-[0.25em]">Your Voice, Your Choice.</p>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
