// File: /client/pages/Candidates.tsx (Versi Interaktif)

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Star, X } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";

// Definisikan tipe data dari database
interface Candidate {
  id: number;
  name: string;
  vision: string;
  mission: string;
  photoUrl: string;
  voteCount: number;
}

// --- BARU: Definisikan tipe data User dari localStorage ---
interface User {
  id: number;
  nim: string;
  isAdmin: boolean;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // --- BARU: State untuk menyimpan info user yang sedang login ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // --- BARU: State untuk mengelola modal detail kandidat ---
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Efek untuk mengambil data kandidat (tidak berubah)
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('/api/candidates');
        if (!response.ok) throw new Error('Gagal memuat data kandidat.');
        const data = await response.json();
        setCandidates(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  // --- BARU: Efek untuk memeriksa status login dari localStorage ---
  useEffect(() => {
    const userDataString = localStorage.getItem('loggedInUser');
    if (userDataString) {
      setCurrentUser(JSON.parse(userDataString));
    }
  }, []);

  // --- BARU: Fungsi untuk membuka modal detail ---
  const handleCardClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailModalOpen(true);
  };

  // --- BARU: Fungsi untuk menutup modal ---
  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <SiteLayout>
      {/* --- BARU: MODAL DETAIL KANDIDAT --- */}
      {isDetailModalOpen && selectedCandidate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
          onClick={handleCloseModal} // Bisa ditutup dengan klik di luar modal
        >
          <div 
            className="mx-4 max-w-lg w-full rounded-[2.5rem] border border-primary/30 bg-gray-900/80 p-8 text-white relative animate-in fade-in-0 zoom-in-95"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
          >
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-white/50 hover:text-white transition">
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              <img
                src={selectedCandidate.photoUrl}
                alt={selectedCandidate.name}
                className="h-32 w-32 rounded-full object-cover border-4 border-white/30"
              />
              <h2 className="font-display text-3xl mt-4">{selectedCandidate.name}</h2>
              <div className="mt-6 text-left w-full space-y-4">
                <div>
                  <h3 className="font-semibold text-primary text-lg">Visi:</h3>
                  <p className="text-white/80">{selectedCandidate.vision}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-lg">Misi:</h3>
                  <p className="text-white/80 whitespace-pre-line">{selectedCandidate.mission}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KONTEN HALAMAN UTAMA */}
      <section className="relative px-6 py-0 sm:px-10">
        <div className="mx-auto max-w-6xl space-y-12 text-white">
          <div className="space-y-4 text-center">
            <h1 className="font-display text-4xl leading-tight sm:text-5xl">
              HMPSTI UB Chief Candidates {new Date().getFullYear()}–{new Date().getFullYear() + 1}
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/80">
              Kenali para calon pemimpin HMPSTI. Setiap profil mencerminkan dedikasi mereka terhadap inovasi, keunggulan akademik, dan inklusivitas komunitas.
            </p>
          </div>

          {isLoading ? (
            <p className="text-center text-xl text-white/80">Memuat kandidat...</p>
          ) : error ? (
            <p className="text-center text-xl text-red-400">{error}</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {candidates.map((candidate, index) => (
                <article
                  key={candidate.id}
                  onClick={() => handleCardClick(candidate)} // <-- BARU: Tambahkan event klik di sini
                  className="group relative flex cursor-pointer flex-col items-center gap-6 rounded-[2.5rem] border border-white/15 bg-white/10 p-8 text-center backdrop-blur-2xl transition hover:border-primary/40 hover:bg-white/15 hover:-translate-y-2"
                >
                  {/* ... Konten kartu tidak berubah ... */}
                  <div className="relative h-40 w-40 overflow-hidden rounded-[2rem] border-4 border-white/30 shadow-glow">
                    <img src={candidate.photoUrl} alt={candidate.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                      No. {index + 1}
                    </span>
                    <h2 className="font-display text-2xl text-white">{candidate.name}</h2>
                    <p className="text-sm text-white/70">{candidate.vision}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/60">
                    <Star className="h-4 w-4 text-primary" />
                    Tap untuk melihat visi & misi.
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* --- BARU: Tombol "Login to Vote" yang Cerdas --- */}
          <div className="flex justify-center pb-8">
            {/* Tombol ini hanya muncul jika user BELUM LOGIN atau user BUKAN ADMIN */}
            {(!currentUser || !currentUser.isAdmin) && (
              <NavLink
                to="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-primary via-amber-300 to-primary px-8 py-3 font-semibold text-brand-accent-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/40"
              >
                Login to Vote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </NavLink>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Candidates;