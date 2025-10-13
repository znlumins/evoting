import { NavLink } from "react-router-dom";
import { Compass } from "lucide-react";

import SiteLayout from "@/components/layout/SiteLayout";

const NotFound = () => {
  return (
    <SiteLayout mainClassName="flex items-center justify-center">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-[2.5rem] border border-white/15 bg-white/10 px-8 py-16 text-center text-white backdrop-blur-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
          <Compass className="h-4 w-4 text-primary" /> 404
        </span>
        <h1 className="font-display text-4xl">Page Not Found</h1>
        <p className="text-sm text-white/75">
          The page you are looking for doesn’t exist or might be in development. Navigate back to the homepage to continue exploring the HMPSTI e-voting experience.
        </p>
        <NavLink
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/80 px-6 py-3 text-sm font-semibold text-brand-accent-foreground transition hover:bg-primary"
        >
          Return Home
        </NavLink>
      </div>
    </SiteLayout>
  );
};

export default NotFound;
