create or replace procedure pendaftaran_user(
    p_email text,
    p_password text,
    p_role_name text,
    p_full_name text,
    p_date_of_birth date
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
    insert into user_details (user_id, full_name, date_of_birth) values
        (v_user_id, p_full_name, p_date_of_birth);
end;
$$;

-- Usage example:
-- call pendaftaran_user(
--     'ardi@snipkode.com',
--     '123456',
--     'penulis',
--     'Ardi Wijaya',
--     '2025-02-15'
-- );