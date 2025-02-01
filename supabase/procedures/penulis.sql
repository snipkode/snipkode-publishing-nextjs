-- Stored Procedure untuk menampilkan saldo by user_id yang belum ditarik (Penulis)
-- Usage: SELECT * FROM penulis_get_saldo('user-id');
create or replace function penulis_get_saldo(user_id uuid)
returns table(total_balance numeric)
language plpgsql as $$
begin
    return query
    select sum(amount) as total_balance
    from royalties
    where user_id = penulis_get_saldo.user_id and withdraw_date is null;
end;
$$;

-- Stored Procedure untuk menampilkan semua buku berdasarkan user_id (Penulis)
-- Usage: SELECT * FROM penulis_get_buku('user-id');
create or replace function penulis_get_buku(user_id uuid)
returns table(id uuid, title text, author_id uuid, publisher_id uuid, editor_id uuid, published_at timestamp with time zone)
language plpgsql as $$
begin
    return query
    select * from books
    where author_id = penulis_get_buku.user_id;
end;
$$;

-- Stored Procedure untuk menampilkan semua penerbit (Penerbit)
-- Usage: SELECT * FROM penerbit_get_all();
create or replace function penerbit_get_all()
returns table(id uuid, name text, email text, created_at timestamp with time zone, created_by uuid)
language plpgsql as $$
begin
    return query
    select * from publishers;
end;
$$;

-- Stored Procedure untuk menampilkan total pendapatan kuartal (Penulis)
-- Usage: SELECT * FROM penulis_get_pendapatan_kuartal('user-id');
create or replace function penulis_get_pendapatan_kuartal(user_id uuid)
returns table(quarter int, total_revenue numeric)
language plpgsql as $$
begin
    return query
    select extract(quarter from sale_date) as quarter, sum(amount) as total_revenue
    from sales
    where user_id = penulis_get_pendapatan_kuartal.user_id
    group by extract(quarter from sale_date)
    order by quarter;
end;
$$;

-- Stored Procedure untuk menampilkan total pendapatan tahunan (Penulis)
-- Usage: SELECT * FROM penulis_get_pendapatan_tahunan('user-id');
create or replace function penulis_get_pendapatan_tahunan(user_id uuid)
returns table(year int, total_revenue numeric)
language plpgsql as $$
begin
    return query
    select extract(year from sale_date) as year, sum(amount) as total_revenue
    from sales
    where user_id = penulis_get_pendapatan_tahunan.user_id
    group by extract(year from sale_date)
    order by year;
end;
$$;


-- Stored Procedure untuk menampilkan total semua saldo transaksi platform yang sudah ditarik (Admin)
-- Usage: SELECT * FROM admin_get_saldo_ditarik();
create or replace function admin_get_saldo_ditarik()
returns table(total_withdrawn_balance numeric)
language plpgsql as $$
begin
    return query
    select sum(amount) as total_withdrawn_balance
    from royalties
    where withdraw_date is not null;
end;
$$;

create or replace function admin_get_saldo(_is_withdrawn boolean)
returns table(total_balance numeric)
language plpgsql as $$
begin
    return query
    select coalesce(sum(amount), 0) as total_balance
    from royalties
    where (_is_withdrawn and withdraw_date is not null)
       or (not _is_withdrawn and withdraw_date is null);
end;
$$;
