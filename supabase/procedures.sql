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
    insert into royalty_history (sale_id, book_id, user_id, amount, created_at) values (sale_id, book_id, author_id, author_fee, now());
    insert into royalty_history (sale_id, book_id, user_id, amount, created_at) values (sale_id, book_id, publisher_id, publisher_fee, now());
    insert into royalty_history (sale_id, book_id, user_id, amount, created_at) values (sale_id, book_id, editor_id, editor_fee, now());
    insert into royalty_history (sale_id, book_id, user_id, amount, created_at) values (sale_id, book_id, 'ID-APL-00001', admin_fee, now()); -- Ganti 'admin-id' dengan ID admin sebenarnya
end;
$$;

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
    select count(*)::int as total_books from books;
end;
$$;

-- Stored Procedure untuk menampilkan jumlah penerbit (Admin)
-- Usage: SELECT * FROM admin_get_total_publishers();
create or replace function admin_get_total_publishers()
returns table(total_publishers int)
language plpgsql as $$
begin
    return query
    select count(*)::int as total_publishers from publishers;
end;
$$;

-- Stored Procedure untuk menampilkan jumlah pengguna (Admin)
-- Usage: SELECT * FROM admin_get_total_users();
create or replace function admin_get_total_users()
returns table(total_users int)
language plpgsql as $$
begin
    return query
    select count(*)::int as total_users from users;
end;
$$;

-- Stored Procedure untuk menampilkan jumlah transaksi penjualan buku (Admin)
-- Usage: SELECT * FROM admin_get_total_sales();
create or replace function admin_get_total_sales()
returns table(total_sales int)
language plpgsql as $$
begin
    return query
    select count(*)::int as total_sales from sales;
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
