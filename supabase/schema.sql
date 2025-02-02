-- Tabel Roles untuk menyimpan informasi peran pengguna
create table roles (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap peran
    name text unique not null -- Nama peran (penulis, penerbit, editor)
);

-- Tabel Users untuk menyimpan informasi pengguna
create table users (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap pengguna
    email text unique not null, -- Email unik untuk autentikasi
    password text not null, -- Kata sandi pengguna
    role_id uuid references roles(id), -- ID peran pengguna, referensi ke tabel roles
    created_at timestamp with time zone default now() -- Tanggal dan waktu pembuatan akun
);

-- Tabel UserDetails untuk menyimpan informasi detail pengguna untuk KYC
create table user_details (
    user_id uuid primary key references users(id), -- ID unik untuk setiap pengguna, referensi ke tabel users
    full_name text not null, -- Nama lengkap pengguna
    date_of_birth date not null, -- Tanggal lahir pengguna
    address text not null, -- Alamat pengguna
    phone_number text not null, -- Nomor telepon pengguna
    identity_number text not null, -- Nomor identitas pengguna (misalnya KTP)
    created_at timestamp with time zone default now() -- Tanggal dan waktu pembuatan detail pengguna
);

-- Tabel Publishers untuk menyimpan informasi penerbit
create table publishers (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap penerbit
    name text not null, -- Nama penerbit
    email text unique not null, -- Email penerbit untuk komunikasi bisnis
    created_at timestamp with time zone default now(), -- Tanggal dan waktu pembuatan penerbit
    created_by uuid references users(id) -- ID pengguna yang membuat penerbit
);

-- Tabel Books untuk menyimpan informasi buku
create table books (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap buku
    title text not null, -- Judul buku
    author_id uuid references users(id), -- ID penulis buku
    publisher_id uuid references publishers(id), -- ID penerbit buku
    editor_id uuid references users(id), -- ID editor buku
    published_at timestamp with time zone default now() -- Tanggal dan waktu publikasi buku
);

-- Tabel BookContributors untuk menyimpan informasi kontributor buku
create table book_contributors (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap kontributor
    book_id uuid references books(id), -- ID buku yang dikontribusikan
    user_id uuid references users(id), -- ID pengguna yang dikontribusikan
    role_id uuid references roles(id), -- ID peran kontributor, referensi ke tabel roles
    invited_at timestamp with time zone default now() -- Tanggal dan waktu undangan
);

-- Tabel BookPages untuk menyimpan konten halaman buku
create table book_pages (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap halaman buku
    book_id uuid references books(id), -- ID buku yang memiliki halaman ini
    page_number int not null, -- Nomor halaman
    content text not null check (length(content) <= 1000), -- Konten halaman dengan maksimal 1000 kata
    created_at timestamp with time zone default now() -- Tanggal dan waktu pembuatan halaman
);

-- Tabel Sales untuk menyimpan informasi penjualan buku
create table sales (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap penjualan
    book_id uuid references books(id), -- ID buku yang dijual
    user_id uuid references users(id), -- ID pengguna yang membeli buku
    sale_date timestamp with time zone default now(), -- Tanggal dan waktu penjualan
    amount numeric not null, -- Jumlah penjualan
    midtrans_order_id text not null, -- ID pesanan Midtrans
    midtrans_transaction_status text not null, -- Status transaksi Midtrans
    midtrans_transaction_token text not null -- Token transaksi Midtrans
);

-- Tabel PagePermissions untuk menyimpan izin akses halaman buku
create table page_permissions (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap izin
    user_id uuid references users(id), -- ID pengguna yang memiliki izin
    book_id uuid references books(id), -- ID buku yang diizinkan
    page_number int not null, -- Nomor halaman yang diizinkan
    granted_at timestamp with time zone default now() -- Tanggal dan waktu pemberian izin
);

-- Tabel Affiliates untuk menyimpan informasi afiliasi buku
create table affiliates (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap afiliasi
    user_id uuid references users(id), -- ID pengguna yang membuat afiliasi
    book_id uuid references books(id), -- ID buku yang diiklankan
    affiliate_link text not null, -- Link afiliasi
    created_at timestamp with time zone default now() -- Tanggal dan waktu pembuatan afiliasi
);

-- Tabel Royalties untuk menyimpan informasi royalti penjualan buku
create table royalties (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap royalti
    user_id uuid references users(id), -- ID pengguna yang menerima royalti
    book_id uuid references books(id), -- ID buku yang menghasilkan royalti
    amount numeric not null, -- Jumlah royalti
    created_at timestamp with time zone default now(), -- Tanggal dan waktu pembuatan royalti
    withdraw_date timestamp with time zone -- Tanggal dan waktu penarikan royalti
);

-- Tabel Documents untuk menyimpan informasi dokumen yang diunggah
create table documents (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap dokumen
    user_id uuid references users(id), -- ID pengguna yang mengunggah dokumen
    file_name text not null, -- Nama file dokumen
    file_url text not null, -- URL file dokumen
    uploaded_at timestamp with time zone default now() -- Tanggal dan waktu pengunggahan dokumen
);

-- Tabel RoyaltyHistory untuk menyimpan riwayat pembagian royalti
create table royalty_history (
    id uuid primary key default uuid_generate_v4(), -- ID unik untuk setiap riwayat royalti
    sale_id uuid references sales(id), -- ID penjualan yang terkait
    book_id uuid references books(id), -- ID buku yang terkait
    user_id uuid references users(id), -- ID pengguna yang menerima royalti
    amount numeric not null, -- Jumlah royalti
    created_at timestamp with time zone default now() -- Tanggal dan waktu pembuatan riwayat royalti
);


