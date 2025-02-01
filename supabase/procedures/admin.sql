-- Stored Procedure untuk menampilkan semua pengguna (Admin)
-- Usage: SELECT * FROM admin_get_pengguna();
create or replace function admin_get_pengguna()
returns table(id uuid, email text, password text, role_id uuid, created_at timestamp with time zone)
language plpgsql as $$
begin
    return query
    select * from users;
end;
$$;

-- Stored Procedure untuk menampilkan semua transaksi penjualan (Admin)
-- Usage: SELECT * FROM admin_get_penjualan();
create or replace function admin_get_penjualan()
returns table(id uuid, book_id uuid, user_id uuid, sale_date timestamp with time zone, amount numeric)
language plpgsql as $$
begin
    return query
    select * from sales;
end;
$$;

-- Stored Procedure untuk menampilkan semua transaksi penjualan (Admin)
-- Usage: SELECT * FROM admin_get_penjualan();
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
