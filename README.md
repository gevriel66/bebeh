# Sebelum Tidur, Untukmu 🌷

Kejutan kecil berbentuk layar kode rahasia yang membuka taman bunga, pesan manis, dan musik.

## Menjalankan secara lokal

Buka `index.html` di browser, atau jalankan server statis dari folder ini:

```powershell
python -m http.server 8000
```

Lalu kunjungi <http://localhost:8000>.

## Personalisasi

- Kode empat digit ada di konstanta `PASSCODE` pada `script.js` (default: `1430`).
- Ubah pesan di daftar `notes` pada `script.js`.
- Nama pada judul kejutan bisa diganti di elemen `<h1>` pada `index.html`.
- Musik latar ada di `music/Nothing's Gonna Change My Love for You.mp3`; ganti berkas dan nilai `src` pada elemen audio di `index.html` jika ingin memakai lagu lain.

Layar kode ini hanya bagian dari kejutan, bukan perlindungan keamanan. Kodenya tersimpan di JavaScript yang dikirim ke browser.

## Deploy ke Vercel

Proyek ini adalah situs statis tanpa langkah build atau dependency npm:

1. Impor folder `flowers-for-you` sebagai project di Vercel, atau jalankan `vercel` dari folder ini.
2. Biarkan **Framework Preset** pada `Other`.
3. Kosongkan **Build Command** dan **Output Directory**; Vercel akan menyajikan `index.html` beserta aset statisnya.

Pastikan folder `music` ikut terunggah agar musik latar tersedia.
