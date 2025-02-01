-- Insert dummy data into roles table
insert into roles (id, name) values
    (uuid_generate_v4(), 'penulis'),
    (uuid_generate_v4(), 'penerbit'),
    (uuid_generate_v4(), 'editor');

-- Insert dummy data into users table
insert into users (id, email, password, role_id) values
    (uuid_generate_v4(), 'penulis1@example.com', 'password1', (select id from roles where name = 'penulis')),
    (uuid_generate_v4(), 'penerbit1@example.com', 'password2', (select id from roles where name = 'penerbit')),
    (uuid_generate_v4(), 'editor1@example.com', 'password3', (select id from roles where name = 'editor'));

-- Insert dummy data into user_details table
insert into user_details (user_id, full_name, date_of_birth, address, phone_number, identity_number) values
    ((select id from users where email = 'penulis1@example.com'), 'Penulis One', '1990-01-01', 'Address 1', '1234567890', 'ID123456'),
    ((select id from users where email = 'penerbit1@example.com'), 'Penerbit One', '1985-02-02', 'Address 2', '0987654321', 'ID654321'),
    ((select id from users where email = 'editor1@example.com'), 'Editor One', '1980-03-03', 'Address 3', '1122334455', 'ID112233');

-- Insert dummy data into publishers table
insert into publishers (id, name, email, created_by) values
    (uuid_generate_v4(), 'Publisher One', 'publisher1@example.com', (select id from users where email = 'penerbit1@example.com'));

-- Insert dummy data into books table
insert into books (id, title, author_id, publisher_id, editor_id) values
    (uuid_generate_v4(), 'Book One', (select id from users where email = 'penulis1@example.com'), (select id from publishers where name = 'Publisher One'), (select id from users where email = 'editor1@example.com'));

-- Insert dummy data into book_contributors table
insert into book_contributors (id, book_id, user_id, role_id) values
    (uuid_generate_v4(), (select id from books where title = 'Book One'), (select id from users where email = 'penulis1@example.com'), (select id from roles where name = 'penulis'));

-- Insert dummy data into book_pages table
insert into book_pages (id, book_id, page_number, content) values
    (uuid_generate_v4(), (select id from books where title = 'Book One'), 1, 'Content of page 1'),
    (uuid_generate_v4(), (select id from books where title = 'Book One'), 2, 'Content of page 2');

-- Insert dummy data into sales table
insert into sales (id, book_id, user_id, amount, midtrans_order_id, midtrans_transaction_status, midtrans_transaction_token) values
    (uuid_generate_v4(), (select id from books where title = 'Book One'), (select id from users where email = 'penulis1@example.com'), 100000, 'order123', 'success', 'token123');

-- Insert dummy data into page_permissions table
insert into page_permissions (id, user_id, book_id, page_number) values
    (uuid_generate_v4(), (select id from users where email = 'penulis1@example.com'), (select id from books where title = 'Book One'), 1);

-- Insert dummy data into affiliates table
insert into affiliates (id, user_id, book_id, affiliate_link) values
    (uuid_generate_v4(), (select id from users where email = 'penulis1@example.com'), (select id from books where title = 'Book One'), 'http://affiliate-link.com');
