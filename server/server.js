import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import crypto from 'crypto';

// --- Inisialisasi Aplikasi Express & Prisma ---
const app = express();
const prisma = new PrismaClient();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Fungsi Helper untuk Generate Token ---
const generateToken = (length = 10) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

// =============================================================
// --- FUNGSI VALIDASI KUALIFIKASI NIM ---
// =============================================================
const isQualifiedNIM = (nim) => {
    if (typeof nim !== 'string' || nim.length < 7) {
        return false;
    }
    const year = nim.substring(0, 2);
    const programCode = nim.substring(2, 7);
    const allowedYears = ['23', '24', '25'];
    const requiredProgramCode = '31407'; // D4 (3) + Vokasi (14) + TI (07)
    const isYearAllowed = allowedYears.includes(year);
    const isProgramCorrect = programCode === requiredProgramCode;
    return isYearAllowed && isProgramCorrect;
}

// =============================================================
// --- ENDPOINTS API ---
// =============================================================

// --- API User & Voting ---
app.post('/api/register', async (req, res) => {
    try {
        const { nim, nama } = req.body;
        if (!nim || !nama) {
            return res.status(400).json({ message: 'NIM dan Nama Lengkap tidak boleh kosong.' });
        }
        if (!isQualifiedNIM(nim)) {
            return res.status(400).json({ 
                message: 'Maaf, NIM Anda tidak memenuhi kualifikasi (Angkatan 23/24/25 dari Prodi Teknologi Informasi Vokasi).' 
            });
        }
        const existingUser = await prisma.user.findUnique({ where: { nim } });
        if (existingUser) {
            return res.status(409).json({ message: 'NIM ini sudah terdaftar.' });
        }
        const token = generateToken(10);
        const newUser = await prisma.user.create({
            data: { nim, nama_lengkap: nama, token },
        });
        console.log(`✅ Pengguna baru terdaftar: ${newUser.nama_lengkap} (${newUser.nim})`);
        return res.status(201).json({ token });
    } catch (error) {
        console.error("❌ Error di endpoint register:", error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server saat registrasi.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { nim, token } = req.body;
        if (!nim || !token) {
            return res.status(400).json({ message: 'NIM dan Token tidak boleh kosong!' });
        }
        const user = await prisma.user.findUnique({ where: { nim } });
        if (!user) {
            return res.status(404).json({ message: 'NIM tidak terdaftar!' });
        }
        if (user.token !== token) {
            return res.status(401).json({ message: 'Token yang Anda masukkan salah!' });
        }
        return res.status(200).json({ 
            message: 'Login berhasil!', 
            user: { 
                id: user.id, 
                nim: user.nim,
                nama_lengkap: user.nama_lengkap, 
                role: user.role
            } 
        });
    } catch (error) {
        console.error("❌ Error di endpoint login:", error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

app.post('/api/vote', async (req, res) => {
    try {
        const { userId, candidateId } = req.body;
        if (!userId || !candidateId) {
            return res.status(400).json({ message: 'User ID dan Candidate ID dibutuhkan.' });
        }

        const existingVote = await prisma.vote.findUnique({
            where: { userId: userId },
        });
        if (existingVote) {
            return res.status(409).json({ message: 'Anda sudah pernah memberikan suara sebelumnya.' });
        }

        await prisma.vote.create({
            data: {
                userId: userId,
                candidateId: candidateId,
            },
        });
        
        console.log(`✅ Suara baru diterima dari User ID: ${userId} untuk Candidate ID: ${candidateId}`);
        return res.status(201).json({ message: 'Terima kasih, suara Anda telah berhasil dicatat!' });

    } catch (error) {
        console.error("❌ Error di endpoint vote:", error);
        if (error.code === 'P2003') { 
             return res.status(404).json({ message: 'User atau Kandidat tidak ditemukan.' });
        }
        return res.status(500).json({ message: 'Terjadi kesalahan pada server saat mengirim suara.' });
    }
});

// --- API Manajemen Kandidat (CRUD) ---
app.get('/api/candidates', async (req, res) => {
    try {
        const candidates = await prisma.candidate.findMany();
        res.status(200).json(candidates);
    } catch (error) {
        console.error("❌ Error saat mengambil data kandidat:", error);
        res.status(500).json({ message: 'Gagal mengambil data kandidat dari server.' });
    }
});

app.post('/api/candidates', async (req, res) => {
    try {
        const { name, vision, mission, photoUrl } = req.body;
        if (!name || !vision || !mission || !photoUrl) {
            return res.status(400).json({ message: 'Semua field (name, vision, mission, photoUrl) harus diisi.' });
        }
        const newCandidate = await prisma.candidate.create({
            data: { name, vision, mission, photoUrl },
        });
        console.log(`✅ Kandidat baru ditambahkan: ${newCandidate.name}`);
        res.status(201).json(newCandidate);
    } catch (error) {
        console.error("❌ Error saat menambah kandidat:", error);
        res.status(500).json({ message: 'Gagal menambah kandidat baru.' });
    }
});

app.put('/api/candidates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, vision, mission, photoUrl } = req.body;
        const updatedCandidate = await prisma.candidate.update({
            where: { id: parseInt(id) },
            data: { name, vision, mission, photoUrl },
        });
        console.log(`✅ Data kandidat diperbarui: ${updatedCandidate.name}`);
        res.status(200).json(updatedCandidate);
    } catch (error) {
        console.error("❌ Error saat update kandidat:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: `Kandidat dengan ID ${req.params.id} tidak ditemukan.` });
        }
        res.status(500).json({ message: 'Gagal memperbarui data kandidat.' });
    }
});

app.delete('/api/candidates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const candidateId = parseInt(id);

        await prisma.$transaction([
            prisma.vote.deleteMany({ where: { candidateId: candidateId } }),
            prisma.candidate.delete({ where: { id: candidateId } }),
        ]);

        console.log(`✅ Kandidat dengan ID ${id} dan vote terkait telah dihapus.`);
        res.status(200).json({ message: `Kandidat dengan ID ${id} berhasil dihapus.` });
    } catch (error) {
        console.error("❌ Error saat menghapus kandidat:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: `Kandidat dengan ID ${req.params.id} tidak ditemukan.` });
        }
        res.status(500).json({ message: 'Gagal menghapus kandidat.' });
    }
});

// --- API Admin & Statistik ---
app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalUsers = await prisma.user.count();
        const totalVotes = await prisma.vote.count();

        const candidatesWithVotes = await prisma.candidate.findMany({
            include: {
                _count: {
                    select: { votes: true },
                },
            },
        });

        const voteResults = candidatesWithVotes.map(c => ({
            id: c.id,
            name: c.name,
            voteCount: c._count.votes,
        }));

        res.status(200).json({
            totalUsers,
            totalVotes,
            usersNotVoted: totalUsers - totalVotes,
            voteResults,
        });
    } catch (error) {
        console.error("❌ Error saat mengambil statistik:", error);
        res.status(500).json({ message: 'Gagal mengambil data statistik.' });
    }
});

app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                nim: true,
                nama_lengkap: true,
                role: true,
                vote: true,
            }
        });
        res.status(200).json(users);
    } catch (error) { // <-- PERBAIKAN DI SINI
        console.error("❌ Error saat mengambil daftar user:", error);
        res.status(500).json({ message: 'Gagal mengambil daftar pengguna.' });
    }
});

// --- Endpoint untuk Edit/Update Pengguna ---
app.put('/api/admin/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nim, nama_lengkap, role } = req.body;

        const dataToUpdate = {};
        if (nim) dataToUpdate.nim = nim;
        if (nama_lengkap) dataToUpdate.nama_lengkap = nama_lengkap;
        if (role) {
            if (role !== 'ADMIN' && role !== 'USER') {
                return res.status(400).json({ message: 'Role tidak valid. Gunakan USER atau ADMIN.' });
            }
            dataToUpdate.role = role;
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ message: 'Tidak ada data yang dikirim untuk diperbarui.' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: dataToUpdate,
            select: {
                id: true,
                nim: true,
                nama_lengkap: true,
                role: true,
                vote: true,
            }
        });

        console.log(`✅ Data untuk user ID ${id} berhasil diperbarui.`);
        res.status(200).json(updatedUser);

    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target.includes('nim')) {
            return res.status(409).json({ message: 'NIM yang Anda masukkan sudah terdaftar. Gunakan NIM lain.' });
        }
        console.error("❌ Error saat update user:", error);
        res.status(500).json({ message: 'Gagal memperbarui data pengguna.' });
    }
});

// --- Endpoint untuk Menghapus Pengguna ---
app.delete('/api/admin/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);

        await prisma.$transaction([
            prisma.vote.deleteMany({ where: { userId: userId } }),
            prisma.user.delete({ where: { id: userId } }),
        ]);

        console.log(`✅ Pengguna dengan ID ${id} dan vote terkait telah dihapus.`);
        res.status(200).json({ message: `Pengguna dengan ID ${id} berhasil dihapus.` });
    } catch (error) {
        console.error("❌ Error saat menghapus pengguna:", error);
         if (error.code === 'P2025') {
            return res.status(404).json({ message: `Pengguna dengan ID ${req.params.id} tidak ditemukan.` });
        }
        res.status(500).json({ message: 'Gagal menghapus pengguna.' });
    }
});

// --- MENJALANKAN SERVER ---
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Server backend berjalan di http://localhost:${PORT}`);
});