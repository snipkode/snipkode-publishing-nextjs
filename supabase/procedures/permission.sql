-- Stored Procedure untuk memeriksa izin akses halaman buku berdasarkan user_id dan book_id
-- Usage: SELECT * FROM cek_izin_halaman('user-id', 'book-id', page_number);
create or replace function cek_izin_halaman(user_id uuid, book_id uuid, page_number int)
returns table(has_permission boolean)
language plpgsql as $$
begin
    return query
    select exists (
        select 1
        from page_permissions
        where user_id = cek_izin_halaman.user_id
        and book_id = cek_izin_halaman.book_id
        and page_number = cek_izin_halaman.page_number
    ) as has_permission;
end;
$$;