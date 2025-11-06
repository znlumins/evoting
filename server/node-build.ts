/**
 * Ini adalah entry point (titik masuk) untuk Vercel Serverless Function.
 * File ini HANYA mengimpor server Express yang sudah kita buat
 * di 'server/index.ts' dan mengekspornya.
 *
 * Vercel akan menangani routing berdasarkan 'vercel.json' Anda.
 */
import { createServer } from './index';

// Buat instance dari server Express kita (yang berisi semua rute API,
// termasuk /api/register)
const app = createServer();

// Ekspor app agar Vercel bisa menjalankannya
export default app;