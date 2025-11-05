// File: /client/pages/Index.tsx (dengan Animasi Panah Baru)

import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";

export default function Index() {
  return (
    // Pastikan tidak ada class background di sini
    <SiteLayout>
      {/* Pastikan tidak ada class background di sini */}
      <section className="px-6 pb-24 pt-24 text-center sm:px-10 sm:pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="relative z-10 space-y-10">
            <div className="space-y-6">
              <h1 className="font-display text-4xl leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your Voice, Your Vote: Shaping Tomorrow Together
              </h1>
              <p className="mx-auto max-w-xl text-lg text-white/80">
                Empower every decision with a secure, inspiring, and inclusive
                e-voting experience tailor-made for HMPSTI Universitas
                Brawijaya.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <NavLink
                to="/login"
                className="group inline-flex items-center justify-center rounded-full
                           h-14 w-14 lg:hover:w-48
                           shadow-glow transition-all duration-300 ease-in-out
                           hover:shadow-lg hover:shadow-blue-500/40
                           bg-transparent border-2 border-blue-500
                           hover:bg-gradient-to-r from-blue-500 to-blue-600 hover:border-transparent"
              >
                <span 
                  className="w-0 overflow-hidden whitespace-nowrap text-brand-accent-foreground font-semibold
                             transition-[width] duration-300 ease-in-out
                             lg:group-hover:w-auto lg:group-hover:mr-2 text-white"
                >
                  Get Started
                </span>

                {/* --- PERUBAHAN UTAMA DI SINI (ANIMASI PANAH) --- */}
                <ArrowRight 
                  className="h-5 w-5 text-white
                             transition-transform duration-300 ease-in-out
                             rotate-90 lg:group-hover:rotate-0" // 1. Awalnya menunjuk ke bawah (rotasi 90 derajat)
                                                                 // 2. Saat di-hover, kembali ke posisi normal (rotasi 0 derajat)
                />
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}