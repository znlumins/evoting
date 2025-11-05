// File: /client/src/pages/TerimaKasihPage.tsx

import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout'; // Import SiteLayout-mu

const TerimaKasihPage: React.FC = () => {
  return (
    // Gunakan SiteLayout agar navbar tetap muncul
    <SiteLayout> 
      <div className="flex flex-col items-center justify-center text-center text-white h-[50vh]">
        <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
        <h1 className="text-4xl font-bold mb-2">Terima Kasih!</h1>
        <p className="text-white/80 mb-6">Suara Anda telah berhasil direkam.</p>
        <Link 
          to="/" 
          className="rounded-full px-6 py-3 bg-primary text-white font-semibold transition hover:bg-primary/80"
        >
          Kembali ke Halaman Utama
        </Link>
      </div>
    </SiteLayout>
  );
};

export default TerimaKasihPage;