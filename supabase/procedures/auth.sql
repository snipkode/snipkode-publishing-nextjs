create or replace procedure pendaftaran_user(
    p_email text,
    p_password text,
    p_role_name text,
    p_full_name text,
    p_date_of_birth date,
    p_address text,
    p_phone_number text,
    p_identity_number text
)
language plpgsql
as $$
declare
    v_user_id uuid;
    v_role_id uuid;
begin
    -- Get role ID based on role name
    select id into v_role_id from roles where name = p_role_name;

    -- Insert into users table
    insert into users (id, email, password, role_id) values
        (uuid_generate_v4(), p_email, crypt(p_password, gen_salt('bf')), v_role_id)
    returning id into v_user_id;

    -- Insert into user_details table
    insert into user_details (user_id, full_name, date_of_birth, address, phone_number, identity_number) values
        (v_user_id, p_full_name, p_date_of_birth, p_address, p_phone_number, p_identity_number);
end;
$$;

-- Usage example:
-- call pendaftaran_user(
--     'user@example.com',
--     'password123',
--     'penulis',
--     'User Name',
--     '1990-01-01',
--     '123 Main St',
--     '555-1234',
--     'ID123456'
-- );
