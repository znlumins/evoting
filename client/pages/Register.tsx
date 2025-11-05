import { useState, useRef, type FormEvent } from "react";
import SiteLayout from "@/components/layout/SiteLayout";
import { cn } from "@/lib/utils";
import { Loader2, ClipboardCopy, Check, Download } from "lucide-react";
import { toPng, getFontEmbedCSS } from 'html-to-image';

// --- Komponen UI (Tidak ada perubahan) ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ className, ...props }: InputProps) => ( <input className={cn("flex h-12 w-full rounded-md border border-white/20 bg-transparent px-4 py-2 text-base ring-offset-background placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} /> );
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = ({ className, children, ...props }: ButtonProps) => ( <button className={cn("inline-flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-blue-500 px-8 py-2 text-base font-semibold text-white transition-colors hover:bg-blue-500/90 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50", className)} {...props}>{children}</button> );

// --- Halaman Registrasi Utama ---

export default function RegisterPage() {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  const tokenRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!nim.trim() || !nama.trim()) {
      setError('NIM dan Nama Lengkap wajib diisi.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nim, nama }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan saat registrasi.');
      }
      setGeneratedToken(data.token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    if (!generatedToken) return;
    navigator.clipboard.writeText(generatedToken);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadToken = async () => {
    if (!tokenRef.current) {
      console.error("Elemen untuk di-render sebagai gambar tidak ditemukan.");
      return;
    }
    const element = tokenRef.current;
    try {
      const width = element.offsetWidth;
      // --- PERUBAHAN DI SINI: Tambahkan buffer 8px ---
      const height = element.offsetHeight + 8;
      const fontEmbedCss = await getFontEmbedCSS(element);

      const dataUrl = await toPng(element, {
        width: width,
        height: height,
        canvasWidth: width,
        canvasHeight: height,
        style: {
          backdropFilter: 'none',
          // @ts-ignore
          webkitBackdropFilter: 'none',
        },
        fontEmbedCSS: fontEmbedCss,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `token-registrasi-${nim}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Gagal membuat gambar dari token:", error);
      setError("Maaf, gagal membuat file gambar. Silakan salin manual.");
    }
  };
  
  return (
    <SiteLayout mainClassName="flex items-center justify-center">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
        {!generatedToken ? (
          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="text-center">
              <h1 className="font-display text-3xl tracking-tight text-white">Buat Akun</h1>
              <p className="mt-2 text-white/60">Isi data diri untuk mendapatkan token.</p>
            </div>
            {error && <p className="rounded-md bg-red-500/20 p-3 text-center text-sm text-red-400">{error}</p>}
            <div className="space-y-4">
              <div>
                <label htmlFor="nim" className="mb-2 block text-sm font-medium text-white/80">NIM</label>
                <Input id="nim" type="text" placeholder="Contoh: 23515020..." value={nim} onChange={(e) => setNim(e.target.value)} disabled={isLoading} />
              </div>
              <div>
                <label htmlFor="nama" className="mb-2 block text-sm font-medium text-white/80">Nama Lengkap</label>
                <Input id="nama" type="text" placeholder="Masukkan nama lengkap Anda" value={nama} onChange={(e) => setNama(e.target.value)} disabled={isLoading} />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? ( <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Memproses...</> ) : ( "Dapatkan Token" )}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <h1 className="font-display text-3xl tracking-tight text-white">Registrasi Berhasil!</h1>
            <p className="mt-2 text-white/60">Simpan token ini dengan baik untuk login.</p>
            
            {/* --- PERUBAHAN STRUKTUR JSX DI SINI --- */}
            <div className="relative my-8">
              <div
                ref={tokenRef}
                className="rounded-lg border-2 border-dashed border-white/30 bg-white/10 p-4"
              >
                <p className="text-2xl font-mono tracking-widest text-white">
                  {generatedToken}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-blue-400"
                aria-label="Copy token"
              >
                {isCopied ? <Check size={18} /> : <ClipboardCopy size={18} />}
              </button>
            </div>

            <Button onClick={handleDownloadToken} className="w-full">
              <Download className="mr-2 h-5 w-5" />
              Download Token (PNG)
            </Button>
            <p className="mt-4 text-sm text-white/50">
              Anda sekarang dapat menggunakan token ini untuk masuk ke halaman login.
            </p>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}