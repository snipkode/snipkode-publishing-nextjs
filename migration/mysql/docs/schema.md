-- filepath: /D:/React/snipkode-publishing-nextjs/migration/docs/schema.md

# Dokumentasi Skema Database

## Tabel dan Relasi

### 1. Tabel Roles
Tabel ini menyimpan informasi peran pengguna seperti penulis, penerbit, editor, dan admin.
- **Kolom**: `id`, `name`
- **Relasi**: Digunakan oleh tabel `users` dan `book_contributors`.

### 2. Tabel Users
Tabel ini menyimpan informasi pengguna termasuk email, kata sandi, dan peran mereka.
- **Kolom**: `id`, `email`, `password`, `role_id`, `created_at`
- **Relasi**: 
  - `role_id` mengacu pada `roles(id)`
  - Digunakan oleh tabel `user_details`, `publishers`, `books`, `book_contributors`, `sales`, `page_permissions`, `affiliates`, `royalties`, `documents`, dan `royalty_history`.

### 3. Tabel UserDetails
Tabel ini menyimpan informasi detail pengguna untuk keperluan KYC (Know Your Customer).
- **Kolom**: `user_id`, `full_name`, `date_of_birth`, `address`, `phone_number`, `identity_number`, `created_at`
- **Relasi**: `user_id` mengacu pada `users(id)`

### 4. Tabel Publishers
Tabel ini menyimpan informasi penerbit.
- **Kolom**: `id`, `name`, `email`, `created_by`, `created_at`
- **Relasi**: 
  - `created_by` mengacu pada `users(id)`
  - Digunakan oleh tabel `books`.

### 5. Tabel Books
Tabel ini menyimpan informasi buku.
- **Kolom**: `id`, `title`, `author_id`, `publisher_id`, `editor_id`, `published_at`
- **Relasi**: 
  - `author_id` mengacu pada `users(id)`
  - `publisher_id` mengacu pada `publishers(id)`
  - `editor_id` mengacu pada `users(id)`
  - Digunakan oleh tabel `book_contributors`, `book_pages`, `sales`, `page_permissions`, `affiliates`, `royalties`, dan `royalty_history`.

### 6. Tabel BookContributors
Tabel ini menyimpan informasi kontributor buku.
- **Kolom**: `id`, `book_id`, `user_id`, `role_id`, `invited_at`
- **Relasi**: 
  - `book_id` mengacu pada `books(id)`
  - `user_id` mengacu pada `users(id)`
  - `role_id` mengacu pada `roles(id)`

### 7. Tabel BookPages
Tabel ini menyimpan konten halaman buku.
- **Kolom**: `id`, `book_id`, `page_number`, `content`, `created_at`
- **Relasi**: `book_id` mengacu pada `books(id)`

### 8. Tabel Sales
Tabel ini menyimpan informasi penjualan buku.
- **Kolom**: `id`, `book_id`, `user_id`, `sale_date`, `amount`, `midtrans_order_id`, `midtrans_transaction_status`, `midtrans_transaction_token`
- **Relasi**: 
  - `book_id` mengacu pada `books(id)`
  - `user_id` mengacu pada `users(id)`
  - Digunakan oleh tabel `royalty_history`.

### 9. Tabel PagePermissions
Tabel ini menyimpan izin akses halaman buku.
- **Kolom**: `id`, `user_id`, `book_id`, `page_number`, `granted_at`
- **Relasi**: 
  - `user_id` mengacu pada `users(id)`
  - `book_id` mengacu pada `books(id)`

### 10. Tabel Affiliates
Tabel ini menyimpan informasi afiliasi buku.
- **Kolom**: `id`, `user_id`, `book_id`, `affiliate_link`, `created_at`
- **Relasi**: 
  - `user_id` mengacu pada `users(id)`
  - `book_id` mengacu pada `books(id)`

### 11. Tabel Royalties
Tabel ini menyimpan informasi royalti penjualan buku.
- **Kolom**: `id`, `user_id`, `book_id`, `amount`, `created_at`, `withdraw_date`
- **Relasi**: 
  - `user_id` mengacu pada `users(id)`
  - `book_id` mengacu pada `books(id)`

### 12. Tabel Documents
Tabel ini menyimpan informasi dokumen yang diunggah.
- **Kolom**: `id`, `user_id`, `file_name`, `file_url`, `uploaded_at`
- **Relasi**: `user_id` mengacu pada `users(id)`

### 13. Tabel RoyaltyHistory
Tabel ini menyimpan riwayat pembagian royalti.
- **Kolom**: `id`, `sale_id`, `book_id`, `user_id`, `amount`, `created_at`
- **Relasi**: 
  - `sale_id` mengacu pada `sales(id)`
  - `book_id` mengacu pada `books(id)`
  - `user_id` mengacu pada `users(id)`

## Proses Bisnis

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