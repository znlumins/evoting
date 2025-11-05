import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';
import { PlusCircle } from 'lucide-react';

const AddCandidatePage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [vision, setVision] = useState('');
    const [mission, setMission] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // "Penjaga Pintu" 👮‍♂️: Wajib ada di setiap halaman admin
        const userDataString = localStorage.getItem('loggedInUser');
        if (!userDataString || JSON.parse(userDataString).role !== 'ADMIN') {
            alert("Akses ditolak!");
            navigate('/login');
            return;
        }
    }, [navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:3001/api/candidates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, vision, mission, photoUrl }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal menambahkan kandidat.');
            }

            setSuccess(`Kandidat "${name}" berhasil ditambahkan!`);
            // Kosongkan form setelah berhasil
            setName('');
            setVision('');
            setMission('');
            setPhotoUrl('');

        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SiteLayout>
            <div className="container mx-auto px-4 pb-12">
                <h1 className="font-display text-3xl text-white mb-8">
                    Tambah Kandidat Baru
                </h1>

                <div className="max-w-2xl mx-auto rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama Kandidat */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">Nama Kandidat</label>
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60" />
                        </div>

                        {/* Visi */}
                        <div>
                            <label htmlFor="vision" className="block text-sm font-medium text-white/90 mb-2">Visi</label>
                            <textarea id="vision" value={vision} onChange={(e) => setVision(e.target.value)} required rows={3} className="w-full rounded-2xl border border-white/15 bg-white/10 p-4 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60" />
                        </div>

                        {/* Misi */}
                        <div>
                            <label htmlFor="mission" className="block text-sm font-medium text-white/90 mb-2">Misi</label>
                            <textarea id="mission" value={mission} onChange={(e) => setMission(e.target.value)} required rows={5} className="w-full rounded-2xl border border-white/15 bg-white/10 p-4 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60" />
                        </div>
                        
                        {/* URL Foto */}
                        <div>
                            <label htmlFor="photoUrl" className="block text-sm font-medium text-white/90 mb-2">URL Foto</label>
                            <input id="photoUrl" type="url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60" />
                        </div>

                        {/* Pesan Error/Success */}
                        {error && <p className="text-center text-sm text-red-400">{error}</p>}
                        {success && <p className="text-center text-sm text-green-400">{success}</p>}

                        <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-semibold text-brand-accent-foreground transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                            <PlusCircle className="h-5 w-5" />
                            {isSubmitting ? 'Menambahkan...' : 'Tambah Kandidat'}
                        </button>
                    </form>
                </div>
            </div>
        </SiteLayout>
    );
};

export default AddCandidatePage;