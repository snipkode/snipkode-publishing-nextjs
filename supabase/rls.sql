-- Enable RLS for the users table
alter table users enable row level security;

-- Create policy for users table
create policy "Allow access to own user data" on users
  for select using (auth.uid() = id);

-- Enable RLS for the user_details table
alter table user_details enable row level security;

-- Create policy for user_details table
create policy "Allow access to own user details" on user_details
  for select using (auth.uid() = user_id);

-- Enable RLS for the books table
alter table books enable row level security;

-- Create policy for books table
create policy "Allow access to related books" on books
  for select using (
    auth.uid() = author_id or
    auth.uid() = publisher_id or
    auth.uid() = editor_id
  );

-- Enable RLS for the book_contributors table
alter table book_contributors enable row level security;

-- Create policy for book_contributors table
create policy "Allow access to related book contributors" on book_contributors
  for select using (
    auth.uid() = user_id or
    auth.uid() in (select author_id from books where books.id = book_contributors.book_id) or
    auth.uid() in (select publisher_id from books where books.id = book_contributors.book_id) or
    auth.uid() in (select editor_id from books where books.id = book_contributors.book_id)
  );

-- Enable RLS for the sales table
alter table sales enable row level security;

-- Create policy for sales table
create policy "Allow access to related sales" on sales
  for select using (
    auth.uid() in (select author_id from books where books.id = sales.book_id) or
    auth.uid() in (select publisher_id from books where books.id = sales.book_id) or
    auth.uid() = user_id
  );

-- Enable RLS for the royalties table
alter table royalties enable row level security;

-- Create policy for royalties table
create policy "Allow access to related royalties" on royalties
  for select using (
    auth.uid() in (select author_id from books where books.id = royalties.book_id) or
    auth.uid() in (select publisher_id from books where books.id = royalties.book_id) or
    auth.uid() = user_id
  );

-- Enable RLS for the documents table
alter table documents enable row level security;

-- Create policy for documents table
create policy "Allow access to own documents" on documents
  for select using (auth.uid() = user_id);

-- Enable RLS for the royalty_history table
alter table royalty_history enable row level security;

-- Create policy for royalty_history table
create policy "Allow access to related royalty history" on royalty_history
  for select using (
    auth.uid() in (select author_id from books where books.id = royalty_history.book_id) or
    auth.uid() in (select publisher_id from books where books.id = royalty_history.book_id) or
    auth.uid() = user_id
  );
