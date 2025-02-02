DELIMITER //

-- Function to get the role of a user by user_id
-- Usage: SELECT get_user_role(1);
CREATE FUNCTION get_user_role(user_id INT) RETURNS VARCHAR(255)
BEGIN
    DECLARE role_name VARCHAR(255);
    SELECT r.name INTO role_name
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.id = user_id;
    RETURN role_name;
END //

-- Function to get the details of a user by user_id
-- Usage: SELECT get_user_details(1);
CREATE FUNCTION get_user_details(user_id INT) RETURNS JSON
BEGIN
    DECLARE user_details JSON;
    SELECT JSON_OBJECT(
        'full_name', ud.full_name,
        'date_of_birth', ud.date_of_birth,
        'address', ud.address,
        'phone_number', ud.phone_number,
        'identity_number', ud.identity_number
    ) INTO user_details
    FROM user_details ud
    WHERE ud.user_id = user_id;
    RETURN user_details;
END //

DELIMITER ;
