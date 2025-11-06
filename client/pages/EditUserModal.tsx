import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Tipe data untuk user
interface UserData {
  id: number;
  nim: string;
  nama_lengkap: string;
  role: 'ADMIN' | 'USER';
}

interface EditUserModalProps {
    user: UserData;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedUser: UserData) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({ nim: '', nama_lengkap: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    // Mengisi form dengan data user yang sedang diedit saat modal dibuka
    useEffect(() => {
        if (user) {
            setFormData({ nim: user.nim, nama_lengkap: user.nama_lengkap });
        }
    }, [user]);

    // Fungsi untuk mengirim perubahan ke backend
    const handleSubmit = async () => {
        setIsSaving(true);
        setError('');
        try {
            const response = await fetch(`/api/admin/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Gagal menyimpan perubahan.');
            }
            onSave(data); // Kirim data terbaru kembali ke halaman utama
            onClose(); // Tutup modal setelah berhasil
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                    <DialogTitle>Edit Pengguna</DialogTitle>
                    <DialogDescription>
                        Ubah detail untuk {user.nama_lengkap}. Klik simpan jika sudah selesai.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nim" className="text-right">NIM</Label>
                        <Input id="nim" value={formData.nim} onChange={(e) => setFormData({ ...formData, nim: e.target.value })} className="col-span-3 bg-slate-800 border-slate-600" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nama" className="text-right">Nama Lengkap</Label>
                        <Input id="nama" value={formData.nama_lengkap} onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })} className="col-span-3 bg-slate-800 border-slate-600" />
                    </div>
                </div>
                {error && <p className="text-center text-sm text-red-400">{error}</p>}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Batal</Button>
                    <Button onClick={handleSubmit} disabled={isSaving}>
                        {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};