-- Tabel Roles untuk menyimpan informasi peran pengguna
create table roles (
    id char(36) primary key, -- ID unik untuk setiap peran
    name varchar(255) unique not null -- Nama peran (penulis, penerbit, editor)
);

-- Tabel Users untuk menyimpan informasi pengguna
create table users (
    id char(36) primary key, -- ID unik untuk setiap pengguna
    email varchar(255) unique not null, -- Email unik untuk autentikasi
    password varchar(255) not null, -- Kata sandi pengguna
    role_id char(36), -- ID peran pengguna, referensi ke tabel roles
    created_at timestamp default current_timestamp, -- Tanggal dan waktu pembuatan akun
    foreign key (role_id) references roles(id)
);

-- Tabel UserDetails untuk menyimpan informasi detail pengguna untuk KYC
create table user_details (
    user_id char(36) primary key, -- ID unik untuk setiap pengguna, referensi ke tabel users
    full_name varchar(255) not null, -- Nama lengkap pengguna
    date_of_birth date not null, -- Tanggal lahir pengguna
    address text not null, -- Alamat pengguna
    phone_number varchar(20) not null, -- Nomor telepon pengguna
    identity_number varchar(50) not null, -- Nomor identitas pengguna (misalnya KTP)
    created_at timestamp default current_timestamp, -- Tanggal dan waktu pembuatan detail pengguna
    foreign key (user_id) references users(id)
);

-- Tabel Publishers untuk menyimpan informasi penerbit
create table publishers (
    id char(36) primary key, -- ID unik untuk setiap penerbit
    name varchar(255) not null, -- Nama penerbit
    email varchar(255) unique not null, -- Email penerbit untuk komunikasi bisnis
    created_at timestamp default current_timestamp, -- Tanggal dan waktu pembuatan penerbit
    created_by char(36), -- ID pengguna yang membuat penerbit
    foreign key (created_by) references users(id)
);

-- Tabel Books untuk menyimpan informasi buku
create table books (
    id char(36) primary key, -- ID unik untuk setiap buku
    title varchar(255) not null, -- Judul buku
    author_id char(36), -- ID penulis buku
    publisher_id char(36), -- ID penerbit buku
    editor_id char(36), -- ID editor buku
    published_at timestamp default current_timestamp, -- Tanggal dan waktu publikasi buku
    foreign key (author_id) references users(id),
    foreign key (publisher_id) references publishers(id),
    foreign key (editor_id) references users(id)
);

-- Tabel BookContributors untuk menyimpan informasi kontributor buku
create table book_contributors (
    id char(36) primary key, -- ID unik untuk setiap kontributor
    book_id char(36), -- ID buku yang dikontribusikan
    user_id char(36), -- ID pengguna yang dikontribusikan
    role_id char(36), -- ID peran kontributor, referensi ke tabel roles
    invited_at timestamp default current_timestamp, -- Tanggal dan waktu undangan
    foreign key (book_id) references books(id),
    foreign key (user_id) references users(id),
    foreign key (role_id) references roles(id)
);

-- Tabel BookPages untuk menyimpan konten halaman buku
create table book_pages (
    id char(36) primary key, -- ID unik untuk setiap halaman buku
    book_id char(36), -- ID buku yang memiliki halaman ini
    page_number int not null, -- Nomor halaman
    content text not null, -- Konten halaman dengan maksimal 1000 kata
    created_at timestamp default current_timestamp, -- Tanggal dan waktu pembuatan halaman
    foreign key (book_id) references books(id),
    check (length(content) <= 1000)
);

-- Tabel Sales untuk menyimpan informasi penjualan buku
create table sales (
    id char(36) primary key, -- ID unik untuk setiap penjualan
    book_id char(36), -- ID buku yang dijual
    user_id char(36), -- ID pengguna yang membeli buku
    sale_date timestamp default current_timestamp, -- Tanggal dan waktu penjualan
    amount decimal(10, 2) not null, -- Jumlah penjualan
    midtrans_order_id varchar(255) not null, -- ID pesanan Midtrans
    midtrans_transaction_status varchar(255) not null, -- Status transaksi Midtrans
    midtrans_transaction_token varchar(255) not null, -- Token transaksi Midtrans
    foreign key (book_id) references books(id),
    foreign key (user_id) references users(id)
);

-- Tabel PagePermissions untuk menyimpan izin akses halaman buku
create table page_permissions (
    id char(36) primary key, -- ID unik untuk setiap izin
    user_id char(36), -- ID pengguna yang memiliki izin
    book_id char(36), -- ID buku yang diizinkan
    page_number int not null, -- Nomor halaman yang diizinkan
    granted_at timestamp default current_timestamp, -- Tanggal dan waktu pemberian izin
    foreign key (user_id) references users(id),
    foreign key (book_id) references books(id)
);

-- Tabel Affiliates untuk menyimpan informasi afiliasi buku
create table affiliates (
    id char(36) primary key, -- ID unik untuk setiap afiliasi
    user_id char(36), -- ID pengguna yang membuat afiliasi
    book_id char(36), -- ID buku yang diiklankan
    affiliate_link varchar(255) not null, -- Link afiliasi
    created_at timestamp default current_timestamp, -- Tanggal dan waktu pembuatan afiliasi
    foreign key (user_id) references users(id),
    foreign key (book_id) references books(id)
);

-- Tabel Royalties untuk menyimpan informasi royalti penjualan buku
create table royalties (
    id char(36) primary key, -- ID unik untuk setiap royalti
    user_id char(36), -- ID pengguna yang menerima royalti
    book_id char(36), -- ID buku yang menghasilkan royalti
    amount decimal(10, 2) not null, -- Jumlah royalti
    created_at timestamp default current_timestamp, -- Tanggal dan waktu pembuatan royalti
    withdraw_date timestamp, -- Tanggal dan waktu penarikan royalti
    foreign key (user_id) references users(id),
    foreign key (book_id) references books(id)
);

-- Tabel Documents untuk menyimpan informasi dokumen yang diunggah
create table documents (
    id char(36) primary key, -- ID unik untuk setiap dokumen
    user_id char(36), -- ID pengguna yang mengunggah dokumen
    file_name varchar(255) not null, -- Nama file dokumen
    file_url varchar(255) not null, -- URL file dokumen
    uploaded_at timestamp default current_timestamp, -- Tanggal dan waktu pengunggahan dokumen
    foreign key (user_id) references users(id)
);

-- Tabel RoyaltyHistory untuk menyimpan riwayat pembagian royalti
create table royalty_history (
    id char(36) primary key, -- ID unik untuk setiap riwayat royalti
    sale_id char(36), -- ID penjualan yang terkait
    book_id char(36), -- ID buku yang terkait
    user_id char(36), -- ID pengguna yang menerima royalti
    amount decimal(10, 2) not null, -- Jumlah royalti
    created_at timestamp default current_timestamp, -- Tanggal dan waktu pembuatan riwayat royalti
    foreign key (sale_id) references sales(id),
    foreign key (book_id) references books(id),
    foreign key (user_id) references users(id)
);
