import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Definisikan tipe data
interface Candidate {
  id: number;
  name: string;
  vision: string;
  mission: string;
  photoUrl: string;
  voteCount: number;
}

interface User {
  id: number;
  nim: string;
}

const EvotingPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userDataString = localStorage.getItem('loggedInUser');

    if (!userDataString) {
      alert("Anda harus login untuk mengakses halaman ini!");
      navigate('/login');
      return;
    }

    const loggedInUser = JSON.parse(userDataString);
    setUser(loggedInUser);

    const fetchCandidates = async () => {
      try {
        const response = await fetch('/api/candidates');
        if (!response.ok) {
          throw new Error('Gagal memuat data kandidat dari server.');
        }
        const data: Candidate[] = await response.json();
        setCandidates(data);
      } catch (err) {
        if (err instanceof Error) {
          alert(`Gagal memuat kandidat: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCandidates();
  }, [navigate]);

  const handleVote = async (candidate: Candidate) => {
    if (!user || !user.id) {
      alert("Terjadi kesalahan: ID user tidak ditemukan. Silakan login kembali.");
      return;
    }
    
    if (!window.confirm(`Anda akan memilih ${candidate.name}. Pilihan tidak dapat diubah. Lanjutkan?`)) {
        return;
    }

    setIsVoting(true);

    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, candidateId: candidate.id }),
        });

        const data = await response.json();

        if(!response.ok) {
          throw new Error(data.message || 'Gagal mengirim suara.');
        }

        alert(data.message);
        navigate('/terima-kasih');

    } catch (err) {
        if (err instanceof Error) {
          // Tampilkan peringatan
          alert(`Gagal: ${err.message}`);
          // Arahkan ke home setelah peringatan ditutup
          navigate('/'); 
        }
    } finally {
        setIsVoting(false);
    }
  };
  
  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    }
  };
  
  if (isLoading) {
    return <div className="text-center text-white pt-40 text-2xl">Memuat kandidat...</div>;
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-7xl px-4 text-right mb-4">
        <button 
          onClick={handleLogout} 
          className="text-white/60 hover:text-white transition duration-200 text-sm font-semibold underline"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto px-4">
          <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white">Chairman of HMPSTI UB</h1>
              <h2 className="text-4xl font-bold text-white">Candidates 2025-2026</h2>
          </div>

          <div className="flex justify-center items-center flex-wrap gap-8">
            {candidates.map((candidate, index) => (
              <div 
                key={candidate.id} 
                className={`relative w-80 bg-slate-800 rounded-lg shadow-lg text-center cursor-pointer transform transition-transform duration-300 hover:scale-105 ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !isVoting && handleVote(candidate)}
              >
                <span className="absolute top-2 left-4 text-7xl font-bold text-white/20" style={{ lineHeight: '1' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                <div className="pt-12 pb-6 px-6">
                  <img 
                    src={candidate.photoUrl} 
                    alt={candidate.name} 
                    className="w-48 h-48 mx-auto object-cover rounded-md mb-4 filter grayscale" 
                  />
                  <p className="text-xl font-bold text-white">{candidate.name.split(' ')[0]}</p>
                  <p className="text-xl font-bold text-white">{candidate.name.split(' ').slice(1).join(' ')}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
              <button className="bg-orange-400 text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors hover:bg-orange-500">
                  Click Photo To Vote
              </button>
              <p className="text-gray-400 text-sm mt-4">
                  By Clicking the photo, you have choosen your candidates, your vote will enter the server. Thank you for your participation!
              </p>
          </div>
      </div>
    </div>
  );
};

export default EvotingPage;