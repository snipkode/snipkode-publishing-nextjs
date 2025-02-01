-- Stored Procedure untuk membagi fee dan mencatat riwayat royalti
create or replace procedure bagi_royalti(sale_id uuid, book_id uuid, amount numeric) 
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
