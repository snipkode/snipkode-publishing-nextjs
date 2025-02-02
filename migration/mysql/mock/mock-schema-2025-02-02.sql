-- Insert dummy data into roles table
insert into roles (id, name) values
    (uuid(), 'penulis'),
    (uuid(), 'penerbit'),
    (uuid(), 'editor'),
    (uuid(), 'admin');  -- Added admin role

-- Insert dummy data into users table with hashed passwords
insert into users (id, email, password, role_id, created_at) values
    (uuid(), 'penulis1@example.com', sha2('password1', 256), (select id from roles where name = 'penulis'), current_timestamp),
    (uuid(), 'penerbit1@example.com', sha2('password2', 256), (select id from roles where name = 'penerbit'), current_timestamp),
    (uuid(), 'editor1@example.com', sha2('password3', 256), (select id from roles where name = 'editor'), current_timestamp),
    (uuid(), 'admin1@example.com', sha2('password4', 256), (select id from roles where name = 'admin'), current_timestamp);  -- Added admin user

-- Insert dummy data into user_details table
insert into user_details (user_id, full_name, date_of_birth, address, phone_number, identity_number, created_at) values
    ((select id from users where email = 'penulis1@example.com'), 'Penulis One', '1990-01-01', 'Address 1', '1234567890', 'ID123456', current_timestamp),
    ((select id from users where email = 'penerbit1@example.com'), 'Penerbit One', '1985-02-02', 'Address 2', '0987654321', 'ID654321', current_timestamp),
    ((select id from users where email = 'editor1@example.com'), 'Editor One', '1980-03-03', 'Address 3', '1122334455', 'ID112233', current_timestamp),
    ((select id from users where email = 'admin1@example.com'), 'Admin One', '1975-04-04', 'Address 4', '5566778899', 'ID445566', current_timestamp);  -- Added admin user details

-- Insert dummy data into publishers table
insert into publishers (id, name, email, created_by, created_at) values
    (uuid(), 'Publisher One', 'publisher1@example.com', (select id from users where email = 'penerbit1@example.com'), current_timestamp);

-- Insert dummy data into books table
insert into books (id, title, author_id, publisher_id, editor_id, published_at) values
    (uuid(), 'Book One', (select id from users where email = 'penulis1@example.com'), (select id from publishers where name = 'Publisher One'), (select id from users where email = 'editor1@example.com'), current_timestamp);

-- Insert dummy data into book_contributors table
insert into book_contributors (id, book_id, user_id, role_id, invited_at) values
    (uuid(), (select id from books where title = 'Book One'), (select id from users where email = 'penulis1@example.com'), (select id from roles where name = 'penulis'), current_timestamp);

-- Insert dummy data into book_pages table
insert into book_pages (id, book_id, page_number, content, created_at) values
    (uuid(), (select id from books where title = 'Book One'), 1, 'Content of page 1', current_timestamp),
    (uuid(), (select id from books where title = 'Book One'), 2, 'Content of page 2', current_timestamp);

-- Insert dummy data into sales table
insert into sales (id, book_id, user_id, sale_date, amount, midtrans_order_id, midtrans_transaction_status, midtrans_transaction_token) values
    (uuid(), (select id from books where title = 'Book One'), (select id from users where email = 'penulis1@example.com'), current_timestamp, 100000, 'order123', 'success', 'token123');

-- Insert dummy data into page_permissions table
insert into page_permissions (id, user_id, book_id, page_number, granted_at) values
    (uuid(), (select id from users where email = 'penulis1@example.com'), (select id from books where title = 'Book One'), 1, current_timestamp);

-- Insert dummy data into affiliates table
insert into affiliates (id, user_id, book_id, affiliate_link, created_at) values
    (uuid(), (select id from users where email = 'penulis1@example.com'), (select id from books where title = 'Book One'), 'http://affiliate-link.com', current_timestamp);
