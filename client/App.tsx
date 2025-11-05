// File: /client/App.tsx (atau main.tsx)

import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import halaman-halaman yang sudah ada
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import GeneralElection from "./pages/GeneralElection";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import AdminDashboardPage from "./pages/AdminDashboardPage";

// --- TAMBAHKAN IMPORT HALAMAN ADMIN BARU DI SINI ---
import ManageUsersPage from './components/pages/ManageUsersPage';
import AddCandidatePage from './pages/AddCandidatePage';
// --- AKHIR TAMBAHAN ---

// Import halaman lain
import EvotingPage from "./pages/EvotingPage"; 
import TerimaKasihPage from "./TerimaKasihPage";
import RegisterPage from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/general-election" element={<GeneralElection />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidate-profile" element={<CandidateProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/evoting" element={<EvotingPage />} />
          <Route path="/terima-kasih" element={<TerimaKasihPage />} />

          {/* Rute khusus untuk admin */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          
          {/* --- TAMBAHKAN DUA RUTE ADMIN BARU DI SINI --- */}
          <Route path="/admin/users" element={<ManageUsersPage />} />
          <Route path="/admin/add-candidate" element={<AddCandidatePage />} />
          {/* --- AKHIR TAMBAHAN --- */}

          {/* Rute "catch-all" untuk halaman yang tidak ditemukan */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);