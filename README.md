# SK Publishing

**Demo Aplikasi**: [https://snipub.web.app](https://snipub.web.app)

**User Demo**: 
- Email: admin@admin.com
- Password: 123456

## Overview

SK Publishing adalah platform yang memungkinkan penulis untuk menerbitkan buku mereka dan pembaca untuk mengakses berbagai buku digital. README ini memberikan instruksi tentang cara menjalankan proyek, mengonfigurasi Supabase, dan memahami alur bisnis.

## Memulai

### Prasyarat

- Node.js (v14 atau lebih baru)
- npm atau yarn
- Akun Supabase

### Instalasi

1. Clone repositori:

    ```bash
    git clone https://github.com/snipkode/snipkode-publishing-nextjs.git
    cd sk-publishing
    ```

2. Instal dependensi:

    ```bash
    npm install
    # atau
    yarn install
    ```

### Menjalankan Proyek

1. Mulai server pengembangan:

    ```bash
    npm run dev
    # atau
    yarn dev
    ```

2. Buka browser Anda dan navigasikan ke `http://localhost:3000`.

### Konfigurasi

#### Supabase

1. Buat akun Supabase dan proyek baru.
2. Dapatkan URL Supabase dan kunci API dari dashboard Supabase.
3. Buat file `.env.local` di direktori root proyek Anda dan tambahkan variabel lingkungan berikut:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4. Siapkan tabel dan kolom yang diperlukan di proyek Supabase Anda dengan eksekusi skrip SQL yang berada di folder `supabase` untuk membuat tabel dan kebijakan RLS:

5. Eksekusi skrip SQL yang berada di folder `supabase` untuk membuat prosedur tersimpan, tampilan, dan data dummy:

    ```bash
    psql -h your-supabase-host -d your-supabase-db -U your-supabase-user -f supabase/procedures.sql
    psql -h your-supabase-host -d your-supabase-db -U your-supabase-user -f supabase/views.sql
    psql -h your-supabase-host -d your-supabase-db -U your-supabase-user -f supabase/dummy_data.sql
    ```

#### Implementasi RLS

Analisis tabel-tabel yang mungkin memerlukan RLS dan alasan di baliknya:

- **users**:
  - **Alasan**: Data pengguna seperti email dan password sangat sensitif dan harus dibatasi aksesnya hanya untuk admin atau pengguna itu sendiri.
  - **RLS**: Batasi akses hanya untuk admin dan pengguna itu sendiri.

- **user_details**:
  - **Alasan**: Informasi pribadi pengguna seperti nama lengkap, tanggal lahir, alamat, nomor telepon, dan nomor identitas sangat sensitif.
  - **RLS**: Batasi akses hanya untuk admin dan pengguna itu sendiri.

- **books**:
  - **Alasan**: Informasi buku mungkin perlu dibatasi aksesnya hanya untuk penulis, penerbit, dan editor yang terkait.
  - **RLS**: Batasi akses hanya untuk penulis, penerbit, dan editor yang terkait.

- **book_contributors**:
  - **Alasan**: Informasi kontributor buku mungkin perlu dibatasi aksesnya hanya untuk penulis, penerbit, dan editor yang terkait.
  - **RLS**: Batasi akses hanya untuk penulis, penerbit, dan editor yang terkait.

- **sales**:
  - **Alasan**: Informasi penjualan buku mungkin perlu dibatasi aksesnya hanya untuk penulis, penerbit, dan admin.
  - **RLS**: Batasi akses hanya untuk penulis, penerbit, dan admin.

- **royalties**:
  - **Alasan**: Informasi royalti penjualan buku mungkin perlu dibatasi aksesnya hanya untuk penulis, penerbit, dan admin.
  - **RLS**: Batasi akses hanya untuk penulis, penerbit, dan admin.

- **documents**:
  - **Alasan**: Informasi dokumen yang diunggah mungkin perlu dibatasi aksesnya hanya untuk pengguna yang mengunggah dokumen dan admin.
  - **RLS**: Batasi akses hanya untuk pengguna yang mengunggah dokumen dan admin.

- **royalty_history**:
  - **Alasan**: Informasi riwayat pembagian royalti mungkin perlu dibatasi aksesnya hanya untuk penulis, penerbit, dan admin.
  - **RLS**: Batasi akses hanya untuk penulis, penerbit, dan admin.

#### Midtrans

1. Buat akun Midtrans dan proyek baru.
2. Dapatkan Server Key dan Client Key dari dashboard Midtrans.
3. Buat file `.env.local` di direktori root proyek Anda dan tambahkan variabel lingkungan berikut:

    ```env
    MIDTRANS_SERVER_KEY=your-midtrans-server-key
    MIDTRANS_CLIENT_KEY=your-midtrans-client-key
    ```

4. Tambahkan dependensi Midtrans ke proyek Anda:

    ```bash
    npm install midtrans-client
    # atau
    yarn add midtrans-client
    ```

### Alur Bisnis

1. **Registrasi dan Autentikasi Pengguna**:
    - Pengguna dapat mendaftar dan masuk ke platform menggunakan email dan kata sandi mereka.
    - Autentikasi ditangani menggunakan layanan autentikasi Supabase.

2. **Manajemen Penerbit**:
    - Pengguna admin dapat mengelola penerbit, termasuk menambahkan penerbit baru dan melihat penerbit yang sudah ada.
    - Penerbit terkait dengan pengguna yang membuatnya.

3. **Manajemen Buku**:
    - Penerbit dapat menambahkan buku baru dan mengelola buku yang sudah ada.
    - Buku terkait dengan penerbit dan mencakup detail seperti judul, penulis, dan tanggal publikasi.
    - Penulis dapat mengundang pengguna lain untuk berkontribusi dalam penulisan buku.

4. **Pembacaan dan Langganan**:
    - Pembaca dapat menjelajahi dan membaca buku yang tersedia di platform.
    - Paket langganan tersedia untuk pembaca untuk mengakses konten premium.

5. **Penghasilan Penulis**:
    - Penulis mendapatkan penghasilan dari penjualan buku mereka.
    - Penulis juga dapat mendapatkan penghasilan dari link afiliasi buku lain.
    - Penulis dapat memonetisasi penjualan buku per halaman dan mengatur izin akses untuk pengguna yang telah membeli halaman tertentu.
    - Integrasi dengan Midtrans untuk memproses pembayaran dan mencatat status transaksi.

6. **Penghasilan Editor**:
    - Editor mendapatkan penghasilan dari royalti penjualan buku yang mereka edit.

7. **Penghasilan Penerbit**:
    - Penerbit mendapatkan royalti dari penjualan dan pembacaan buku yang mereka terbitkan.

### Proses Penarikan Saldo

1. **Penarikan Saldo**:
    - Ketika pengguna melakukan penarikan saldo, sistem akan memperbarui kolom `withdraw_date` di tabel `royalties` dengan tanggal dan waktu penarikan.
    - Ini membantu melacak kapan royalti telah ditarik oleh pengguna.

2. **Contoh Query untuk Penarikan Saldo**:

    ```sql
    -- Query untuk memperbarui withdraw_date ketika pengguna melakukan penarikan saldo
    update royalties
    set withdraw_date = now()
    where user_id = 'user-id' and withdraw_date is null;
    ```

### Struktur Proyek

- `pages/`: Berisi halaman Next.js.
- `components/`: Berisi komponen React yang digunakan di seluruh proyek.
- `middleware/`: Berisi fungsi middleware untuk autentikasi dan otorisasi.
- `utils/`: Berisi fungsi dan konfigurasi utilitas.
- `public/`: Berisi aset statis seperti gambar dan ikon.
- `supabase/`: Berisi skrip SQL untuk membuat tabel, prosedur tersimpan, tampilan, dan data dummy.

### Kontribusi

Kontribusi sangat diterima! Silakan buka issue atau kirim pull request.

### Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.
