import { Link } from "react-router-dom";
import { ArrowLeft, LogIn } from "lucide-react";

const Login = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <Link
        to="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-md rounded-[2.5rem] border border-white/15 bg-white/10 p-8 backdrop-blur-2xl sm:p-10">
        <div className="space-y-1 text-center">
          <h2 className="font-display text-2xl text-white">
            Secure Access Portal
          </h2>
          <p className="text-sm text-white/70">
            Use your NIM and the provided token to continue.
          </p>
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

          {/* --- PERUBAHAN DI SINI --- */}
          <div className="space-y-2">
            <label
              htmlFor="token" // Diubah dari "password"
              className="text-sm font-medium text-white/90"
            >
              Token
            </label>
            <div className="relative">
              <input
                id="token" // Diubah dari "password"
                name="token" // Diubah dari "password"
                type="password" // type="password" agar token tidak terlihat saat diketik
                placeholder="Enter your unique token"
                className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-base text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                autoComplete="off" // Diubah agar token tidak di-save browser
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

          {/* --- BAGIAN INI DIHAPUS --- */}
          {/* <div className="flex ..."> ... </div> */}
        </form>
      </div>
    </main>
  );
};

export default Login;