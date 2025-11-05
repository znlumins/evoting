import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Vote, Percent } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  voteCount: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

const AdminDashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [totalVotes, setTotalVotes] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const userDataString = localStorage.getItem('loggedInUser');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            if (userData.role !== 'ADMIN') {
                alert("Akses ditolak! Halaman ini hanya untuk admin.");
                navigate('/login');
                return;
            }
        } else {
            alert("Anda harus login untuk mengakses halaman ini.");
            navigate('/login');
            return;
        }

        const fetchVoteResults = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/admin/stats');
                if (!response.ok) {
                    if(isLoading) setError('Gagal memuat hasil pemilihan.');
                    return;
                }
                const statsData = await response.json();
                
                setCandidates(statsData.voteResults.sort((a, b) => b.voteCount - a.voteCount) || []);
                setTotalVotes(statsData.totalVotes || 0);
                setTotalUsers(statsData.totalUsers || 0);
                
                if (isLoading) setIsLoading(false);
            } catch (err) {
                if (isLoading && err instanceof Error) {
                  setError(err.message);
                  setIsLoading(false);
                }
            }
        };

        fetchVoteResults();
        const intervalId = setInterval(fetchVoteResults, 5000);
        return () => clearInterval(intervalId);
    }, [navigate, isLoading]);

    const turnoutPercentage = totalUsers > 0 ? ((totalVotes / totalUsers) * 100).toFixed(1) : 0;

    if (isLoading) {
        return (
            <SiteLayout>
                {/* --- PERUBAHAN: Menambahkan padding bawah (pb-12) pada container skeleton --- */}
                <div className="container mx-auto px-4 pb-12 animate-pulse">
                    <div className="h-10 w-1/3 bg-white/10 rounded-lg mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="h-28 bg-white/10 rounded-2xl"></div>
                        <div className="h-28 bg-white/10 rounded-2xl"></div>
                        <div className="h-28 bg-white/10 rounded-2xl"></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3 h-[450px] bg-white/10 rounded-3xl"></div>
                        <div className="lg:col-span-2 h-[450px] bg-white/10 rounded-3xl"></div>
                    </div>
                </div>
            </SiteLayout>
        );
    }

    return (
        <SiteLayout>
            {/* --- PERUBAHAN: Menambahkan padding bawah (pb-12) agar ada ruang di akhir halaman --- */}
            <div className="container mx-auto px-4 pb-12">
                
                {/* --- PERUBAHAN: Ukuran font judul dikecilkan menjadi 3xl --- */}
                <h1 className="font-display text-3xl text-white mb-8">
                    Live Dashboard Pemilihan
                </h1>

                {error && <div className="text-center bg-red-900/50 text-red-300 p-4 rounded-xl mb-8">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-500/20 p-3 rounded-lg"><Users className="h-6 w-6 text-blue-400" /></div>
                            <div>
                                <p className="text-sm text-white/70">Pemilih Terdaftar</p>
                                <p className="text-2xl font-bold text-white">{totalUsers}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-500/20 p-3 rounded-lg"><Vote className="h-6 w-6 text-green-400" /></div>
                            <div>
                                <p className="text-sm text-white/70">Total Suara Masuk</p>
                                <p className="text-2xl font-bold text-white">{totalVotes}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="bg-amber-500/20 p-3 rounded-lg"><Percent className="h-6 w-6 text-amber-400" /></div>
                            <div>
                                <p className="text-sm text-white/70">Partisipasi</p>
                                <p className="text-2xl font-bold text-white">{turnoutPercentage}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    {/* --- PERUBAHAN: Tinggi dikurangi menjadi h-[440px] --- */}
                    <div className="lg:col-span-3 w-full h-[440px] rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl flex items-center justify-center relative">
                        {totalVotes === 0 ? (
                            <p className="text-white/70 text-2xl">Belum ada suara yang masuk.</p>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={candidates} dataKey="voteCount" nameKey="name" cx="50%" cy="50%" outerRadius="80%" fill="#8884d8">
                                        {candidates.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(20, 20, 30, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '1rem' }} itemStyle={{ color: '#FFF' }} />
                                    <Legend wrapperStyle={{ color: '#FFF' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                        {/* --- PERUBAHAN: Elemen teks di tengah dikecilkan agar proporsional --- */}
                         <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-white/70 text-base">Total Suara</p>
                            <p className="text-white text-5xl font-bold">{totalVotes}</p>
                        </div>
                    </div>

                    {/* --- PERUBAHAN: Tinggi dikurangi menjadi h-[440px] --- */}
                    <div className="lg:col-span-2 w-full h-[440px] rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-4">Peringkat Kandidat</h3>
                        <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                            {candidates.map((candidate, index) => {
                                const percentage = totalVotes > 0 ? ((candidate.voteCount / totalVotes) * 100).toFixed(1) : 0;
                                return (
                                    <div key={candidate.id} className="text-white">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-semibold">{index + 1}. {candidate.name}</p>
                                            <p className="text-sm text-white/80">{candidate.voteCount} Suara</p>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-2.5">
                                            <div
                                                className="h-2.5 rounded-full"
                                                style={{ width: `${percentage}%`, backgroundColor: COLORS[index % COLORS.length] }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                            {totalVotes === 0 && (
                                <p className="text-white/50 text-center pt-16">Data akan muncul setelah ada suara yang masuk.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </SiteLayout>
    );
};

export default AdminDashboardPage;