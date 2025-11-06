import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn } from "lucide-react";

const Login: React.FC = () => {
  const [nim, setNim] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // "Penjaga Pintu": Memeriksa user yang sudah login dan mengarahkannya
  useEffect(() => {
    const loggedInUserString = localStorage.getItem('loggedInUser');
    if (loggedInUserString) {
      try {
        const userData = JSON.parse(loggedInUserString);
        
        // --- PERBAIKAN DI SINI ---
        // Mengarahkan berdasarkan peran (role) yang tersimpan
        if (userData && userData.role === 'ADMIN') {
          navigate("/admin/dashboard");
        } else {
          navigate("/evoting"); // User biasa diarahkan ke halaman voting
        }
      } catch (e) {
        // Jika data di localStorage korup, hapus saja
        localStorage.removeItem('loggedInUser');
      }
    }
  }, [navigate]);

  // Fungsi untuk mengirim data login ke server
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nim, token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal! Periksa kembali NIM dan Token Anda.");
      }

      if (!data.user) {
        throw new Error("Respons dari server tidak valid.");
      }
      
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));

      // --- PERBAIKAN UTAMA DI SINI ---
      // Logika pengarahan baru berdasarkan properti 'role'
      if (data.user.role === 'ADMIN') {
        alert("Login sebagai Admin berhasil!");
        navigate("/admin/dashboard");
      } else {
        alert("Login berhasil!");
        navigate("/evoting");
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    }
  };

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

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" aria-label="Login form">
          <div className="space-y-2">
            <label htmlFor="nim" className="text-sm font-medium text-white/90">
              ID / NIM
            </label>
            <div className="relative">
              <input
                id="nim"
                type="text"
                placeholder="Enter your student ID"
                className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-base text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                value={nim}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNim(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="token" className="text-sm font-medium text-white/90">
              Token
            </label>
            <div className="relative">
              <input
                id="token"
                type="password"
                placeholder="Enter your unique token"
                className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-base text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                value={token}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
                required
              />
            </div>
          </div>
          
          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-transparent bg-gradient-to-r from-primary via-amber-300 to-primary px-4 py-3 text-base font-semibold text-brand-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/30"
          >
            <LogIn className="h-5 w-5" />
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;