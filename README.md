# SK Publishing

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

4. Siapkan tabel dan kolom yang diperlukan di proyek Supabase Anda. Berikut adalah contoh skema dengan komentar:

    ```sql
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
        user_id uuid references users(id), -- ID pengguna yang menerima royalti
        amount numeric not null, -- Jumlah royalti
        created_at timestamp with time zone default now() -- Tanggal dan waktu pembuatan riwayat royalti
    );

    -- Stored Procedure untuk membagi fee dan mencatat riwayat royalti
    create or replace procedure distribute_fees(sale_id uuid, book_id uuid, amount numeric) 
    language plpgsql as $$
    declare
        author_id uuid;
        publisher_id uuid;
        editor_id uuid;
        admin_fee numeric;
        publisher_fee numeric;
        editor_fee numeric;
        author_fee numeric;
    begin
        -- Dapatkan ID penulis, penerbit, dan editor
        select author_id, publisher_id, editor_id into author_id, publisher_id, editor_id from books where id = book_id;

        -- Hitung fee
        admin_fee := amount * 0.05;
        publisher_fee := amount * 0.5;
        editor_fee := amount * 0.10;
        author_fee := amount - admin_fee - publisher_fee - editor_fee;

        -- Masukkan royalti penulis ke tabel royalties
        insert into royalties (user_id, book_id, amount, created_at) values (author_id, book_id, author_fee, now());

        -- Masukkan riwayat royalti ke tabel royalty_history
        insert into royalty_history (sale_id, user_id, amount, created_at) values (sale_id, author_id, author_fee, now());
        insert into royalty_history (sale_id, user_id, amount, created_at) values (sale_id, publisher_id, publisher_fee, now());
        insert into royalty_history (sale_id, user_id, amount, created_at) values (sale_id, editor_id, editor_fee, now());
        insert into royalty_history (sale_id, user_id, amount, created_at) values (sale_id, 'ID-APL-00001', admin_fee, now()); -- Ganti 'admin-id' dengan ID admin sebenarnya
    end;
    $$;

    -- View untuk menjumlahkan semua saldo user berdasarkan user_id
    create view user_balances as
    select user_id, sum(amount) as total_balance
    from royalties
    group by user_id;

    -- View untuk menjumlahkan total saldo masuk platform
    create view platform_total_balance as
    select sum(amount) as total_balance
    from royalties;

    -- Stored Procedure untuk menampilkan saldo by user_id yang belum ditarik (Penulis)
    -- Usage: SELECT * FROM author_get_user_balance('user-id');
    create or replace function author_get_user_balance(user_id uuid)
    returns table(total_balance numeric)
    language plpgsql as $$
    begin
        return query
        select sum(amount) as total_balance
        from royalties
        where user_id = author_get_user_balance.user_id and withdraw_date is null;
    end;
    $$;

    -- Stored Procedure untuk menampilkan semua buku berdasarkan user_id (Penulis)
    -- Usage: SELECT * FROM author_get_all_books('user-id');
    create or replace function author_get_all_books(user_id uuid)
    returns table(id uuid, title text, author_id uuid, publisher_id uuid, editor_id uuid, published_at timestamp with time zone)
    language plpgsql as $$
    begin
        return query
        select * from books
        where author_id = author_get_all_books.user_id;
    end;
    $$;

    -- Stored Procedure untuk menampilkan semua penerbit (Penerbit)
    -- Usage: SELECT * FROM publisher_get_all_publishers();
    create or replace function publisher_get_all_publishers()
    returns table(id uuid, name text, email text, created_at timestamp with time zone, created_by uuid)
    language plpgsql as $$
    begin
        return query
        select * from publishers;
    end;
    $$;

    -- Stored Procedure untuk menampilkan semua pengguna (Admin)
    -- Usage: SELECT * FROM admin_get_all_users();
    create or replace function admin_get_all_users()
    returns table(id uuid, email text, password text, role_id uuid, created_at timestamp with time zone)
    language plpgsql as $$
    begin
        return query
        select * from users;
    end;
    $$;

    -- Stored Procedure untuk menampilkan semua transaksi penjualan (Admin)
    -- Usage: SELECT * FROM admin_get_all_sales();
    create or replace function admin_get_all_sales()
    returns table(id uuid, book_id uuid, user_id uuid, sale_date timestamp with time zone, amount numeric)
    language plpgsql as $$
    begin
        return query
        select * from sales;
    end;
    $$;

    -- Stored Procedure untuk menampilkan total semua saldo transaksi platform yang sudah ditarik (Admin)
    -- Usage: SELECT * FROM admin_get_total_withdrawn_balance();
    create or replace function admin_get_total_withdrawn_balance()
    returns table(total_withdrawn_balance numeric)
    language plpgsql as $$
    begin
        return query
        select sum(amount) as total_withdrawn_balance
        from royalties
        where withdraw_date is not null;
    end;
    $$;

    -- Stored Procedure untuk menampilkan total semua saldo transaksi platform yang belum ditarik oleh user (Admin)
    -- Usage: SELECT * FROM admin_get_total_unwithdrawn_balance();
    create or replace function admin_get_total_unwithdrawn_balance()
    returns table(total_unwithdrawn_balance numeric)
    language plpgsql as $$
    begin
        return query
        select sum(amount) as total_unwithdrawn_balance
        from royalties
        where withdraw_date is null;
    end;
    $$;

    -- Stored Procedure untuk menampilkan jumlah buku (Admin)
    -- Usage: SELECT * FROM admin_get_total_books();
    create or replace function admin_get_total_books()
    returns table(total_books int)
    language plpgsql as $$
    begin
        return query
        select count(*) as total_books from books;
    end;
    $$;

    -- Stored Procedure untuk menampilkan jumlah penerbit (Admin)
    -- Usage: SELECT * FROM admin_get_total_publishers();
    create or replace function admin_get_total_publishers()
    returns table(total_publishers int)
    language plpgsql as $$
    begin
        return query
        select count(*) as total_publishers from publishers;
    end;
    $$;

    -- Stored Procedure untuk menampilkan jumlah pengguna (Admin)
    -- Usage: SELECT * FROM admin_get_total_users();
    create or replace function admin_get_total_users()
    returns table(total_users int)
    language plpgsql as $$
    begin
        return query
        select count(*) as total_users from users;
    end;
    $$;

    -- Stored Procedure untuk menampilkan jumlah transaksi penjualan buku (Admin)
    -- Usage: SELECT * FROM admin_get_total_sales();
    create or replace function admin_get_total_sales()
    returns table(total_sales int)
    language plpgsql as $$
    begin
        return query
        select count(*) as total_sales from sales;
    end;
    $$;

    -- Stored Procedure untuk menampilkan total pendapatan kuartal (Penulis)
    -- Usage: SELECT * FROM author_get_total_revenue_quartal('user-id');
    create or replace function author_get_total_revenue_quartal(user_id uuid)
    returns table(quarter int, total_revenue numeric)
    language plpgsql as $$
    begin
        return query
        select extract(quarter from sale_date) as quarter, sum(amount) as total_revenue
        from sales
        where user_id = author_get_total_revenue_quartal.user_id
        group by extract(quarter from sale_date)
        order by quarter;
    end;
    $$;

    -- Stored Procedure untuk menampilkan total pendapatan tahunan (Penulis)
    -- Usage: SELECT * FROM author_get_total_revenue_year('user-id');
    create or replace function author_get_total_revenue_year(user_id uuid)
    returns table(year int, total_revenue numeric)
    language plpgsql as $$
    begin
        return query
        select extract(year from sale_date) as year, sum(amount) as total_revenue
        from sales
        where user_id = author_get_total_revenue_year.user_id
        group by extract(year from sale_date)
        order by year;
    end;
    $$;

    -- Stored Procedure untuk memeriksa izin akses halaman buku berdasarkan user_id dan book_id
    -- Usage: SELECT * FROM check_page_permission('user-id', 'book-id', page_number);
    create or replace function check_page_permission(user_id uuid, book_id uuid, page_number int)
    returns table(has_permission boolean)
    language plpgsql as $$
    begin
        return query
        select exists (
            select 1
            from page_permissions
            where user_id = check_page_permission.user_id
            and book_id = check_page_permission.book_id
            and page_number = check_page_permission.page_number
        ) as has_permission;
    end;
    $$;
    ```

5. Eksekusi skrip SQL yang berada di folder `supabase` untuk membuat tabel dan kebijakan RLS:

    ```bash
    psql -h your-supabase-host -d your-supabase-db -U your-supabase-user -f supabase/schema.sql
    psql -h your-supabase-host -d your-supabase-db -U your-supabase-user -f supabase/rls.sql
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

### Kontribusi

Kontribusi sangat diterima! Silakan buka issue atau kirim pull request.

### Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.
