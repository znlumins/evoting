import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';
import { ShieldCheck, ShieldX, UserCog, Trash2, Shield, User, Pencil } from 'lucide-react';
import { EditUserModal } from '@/pages/EditUserModal'; // Pastikan path ini benar

interface UserData {
  id: number;
  nim: string;
  nama_lengkap: string;
  role: 'ADMIN' | 'USER';
  vote: { id: number } | null; 
}

const ManageUsersPage: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState<UserData | null>(null);

    useEffect(() => {
        const userDataString = localStorage.getItem('loggedInUser');
        if (!userDataString || JSON.parse(userDataString).role !== 'ADMIN') {
            alert("Akses ditolak!");
            navigate('/login');
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/admin/users');
                if (!response.ok) throw new Error('Gagal mengambil data pengguna.');
                const data: UserData[] = await response.json();
                setUsers(data);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleRoleChange = async (userToUpdate: UserData) => {
        const newRole = userToUpdate.role === 'ADMIN' ? 'USER' : 'ADMIN';
        if (!window.confirm(`Anda yakin ingin mengubah role ${userToUpdate.nama_lengkap} menjadi ${newRole}?`)) return;

        try {
            const response = await fetch(`/api/admin/users/${userToUpdate.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole }),
            });
            if (!response.ok) throw new Error('Gagal mengubah role.');
            const updatedUser = await response.json();
            setUsers(users.map(u => u.id === userToUpdate.id ? updatedUser : u));
        } catch (err) {
            if (err instanceof Error) alert(err.message);
        }
    };

    const handleDeleteUser = async (userToDelete: UserData) => {
        if (!window.confirm(`PERINGATAN: Anda akan menghapus ${userToDelete.nama_lengkap} secara permanen. Lanjutkan?`)) return;
        
        try {
            const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Gagal menghapus pengguna.');
            
            setUsers(users.filter(u => u.id !== userToDelete.id));
        } catch (err) {
            if (err instanceof Error) alert(err.message);
        }
    };

    const handleSaveUser = (updatedUser: UserData) => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    };

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;
        return users.filter(user =>
            user.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    return (
        <SiteLayout>
            <div className="container mx-auto px-4 pb-12">
                <h1 className="font-display text-3xl text-white mb-4">
                    Manajemen Pengguna
                </h1>
                <p className="text-white/70 mb-8">Cari, edit, dan kelola role pengguna.</p>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Cari berdasarkan NIM atau Nama..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-12 w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 px-4 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                    />
                </div>

                {error && <p className="text-center text-red-400 bg-red-900/50 p-4 rounded-xl mb-6">{error}</p>}

                <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                    {isLoading ? <p className="text-center text-white/70">Memuat data pengguna...</p> : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-white">
                                <thead className="border-b border-white/20">
                                    <tr>
                                        <th className="p-4">NIM</th>
                                        <th className="p-4">Nama Lengkap</th>
                                        <th className="p-4 text-center">Role</th>
                                        <th className="p-4 text-center">Status Vote</th>
                                        <th className="p-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-mono">{user.nim}</td>
                                            <td className="p-4">{user.nama_lengkap}</td>
                                            <td className="p-4 text-center">
                                                {user.role === 'ADMIN' ? (
                                                    <span className="flex items-center justify-center gap-2 w-fit mx-auto bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full">
                                                        <UserCog className="h-4 w-4" /> Admin
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center justify-center gap-2 w-fit mx-auto bg-gray-500/20 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">
                                                        <User className="h-4 w-4" /> User
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center">
                                                {user.vote ? (
                                                    <span className="flex items-center justify-center gap-2 w-fit mx-auto bg-green-500/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                                                        <ShieldCheck className="h-4 w-4" /> Sudah Memilih
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center justify-center gap-2 w-fit mx-auto bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">
                                                        <ShieldX className="h-4 w-4" /> Belum Memilih
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button onClick={() => setEditingUser(user)} title="Edit User" className="p-2 text-green-400 hover:bg-green-500/20 rounded-full transition-colors">
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button onClick={() => handleRoleChange(user)} title="Ubah Role" className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-full transition-colors">
                                                        <Shield className="h-4 w-4" />
                                                    </button>
                                                    <button onClick={() => handleDeleteUser(user)} title="Hapus User" className="p-2 text-red-400 hover:bg-red-500/20 rounded-full transition-colors">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredUsers.length === 0 && !isLoading && (
                                <p className="text-center py-8 text-white/50">Tidak ada pengguna yang cocok dengan pencarian Anda.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    isOpen={!!editingUser}
                    onClose={() => setEditingUser(null)}
                    onSave={handleSaveUser}
                />
            )}
        </SiteLayout>
    );
};

export default ManageUsersPage;