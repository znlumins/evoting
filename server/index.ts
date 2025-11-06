import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { handleDemo } from "./routes/demo";

// Inisialisasi Prisma Client
// Ini akan otomatis menemukan skema Anda di server/prisma/schema.prisma
const prisma = new PrismaClient();

export function createServer() {
  const app = express();

  // Middleware (dari file Anda)
  app.use(cors());
  app.use(express.json()); // Penting untuk membaca body req.body
  app.use(express.urlencoded({ extended: true }));

  // --- 
  // --- INI RUTE API REGISTER YANG KITA TAMBAHKAN ---
  // ---
  app.post('/api/register', async (req, res) => {
    try {
      const { nim, nama } = req.body;

      // 1. Validasi input
      if (!nim || !nama) {
        return res.status(400).json({ message: 'NIM dan Nama wajib diisi' });
      }

      // 2. Buat token acak
      const token = crypto.randomBytes(5).toString('hex');

      // 3. Simpan user baru ke database
      const newUser = await prisma.user.create({
        data: {
          nim: String(nim),
          nama_lengkap: String(nama),
          token: token,
          role: 'USER', // Asumsi default role
        },
      });

      // 4. Berhasil! Kirim kembali tokennya (sebagai JSON)
      //    Frontend Anda akan menerima ini dan berhenti error
      res.status(201).json({ token: newUser.token });

    } catch (error: any) {
      // 5. Tangani error (misal, NIM sudah ada)
      if (error.code === 'P2002') { // Error "Unique constraint failed" dari Prisma
        return res.status(409).json({ message: 'NIM ini sudah terdaftar.' });
      }

      // Error server lainnya
      console.error('Error pada /api/register:', error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
  });


  // Rute API lain (dari file Anda)
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  return app;
}