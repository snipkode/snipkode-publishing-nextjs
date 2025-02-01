create or replace procedure pendaftaran_user() 
language plpgsql
as $$
begin
    -- Insert dummy data into roles table
    insert into roles (id, name) values
        (uuid_generate_v4(), 'penulis'),
        (uuid_generate_v4(), 'penerbit'),
        (uuid_generate_v4(), 'editor'),
        (uuid_generate_v4(), 'admin');  -- Added admin role

    -- Insert dummy data into users table with hashed passwords
    insert into users (id, email, password, role_id) values
        (uuid_generate_v4(), 'penulis1@example.com', crypt('password1', gen_salt('bf')), (select id from roles where name = 'penulis')),
        (uuid_generate_v4(), 'penulis2@example.com', crypt('password2', gen_salt('bf')), (select id from roles where name = 'penulis')),
        (uuid_generate_v4(), 'penerbit1@example.com', crypt('password3', gen_salt('bf')), (select id from roles where name = 'penerbit')),
        (uuid_generate_v4(), 'penerbit2@example.com', crypt('password4', gen_salt('bf')), (select id from roles where name = 'penerbit')),
        (uuid_generate_v4(), 'editor1@example.com', crypt('password5', gen_salt('bf')), (select id from roles where name = 'editor')),
        (uuid_generate_v4(), 'editor2@example.com', crypt('password6', gen_salt('bf')), (select id from roles where name = 'editor')),
        (uuid_generate_v4(), 'admin1@example.com', crypt('password7', gen_salt('bf')), (select id from roles where name = 'admin'));  -- Added admin user

    -- Insert dummy data into user_details table
    insert into user_details (user_id, full_name, date_of_birth, address, phone_number, identity_number) values
        ((select id from users where email = 'penulis1@example.com'), 'Penulis One', '1990-01-01', 'Address 1', '1234567890', 'ID123456'),
        ((select id from users where email = 'penulis2@example.com'), 'Penulis Two', '1991-02-02', 'Address 2', '0987654321', 'ID654321'),
        ((select id from users where email = 'penerbit1@example.com'), 'Penerbit One', '1985-03-03', 'Address 3', '1122334455', 'ID112233'),
        ((select id from users where email = 'penerbit2@example.com'), 'Penerbit Two', '1986-04-04', 'Address 4', '5566778899', 'ID445566'),
        ((select id from users where email = 'editor1@example.com'), 'Editor One', '1980-05-05', 'Address 5', '6677889900', 'ID778899'),
        ((select id from users where email = 'editor2@example.com'), 'Editor Two', '1981-06-06', 'Address 6', '7788990011', 'ID889900'),
        ((select id from users where email = 'admin1@example.com'), 'Admin One', '1975-07-07', 'Address 7', '8899001122', 'ID990011');  -- Added admin user details
end;
$$;
