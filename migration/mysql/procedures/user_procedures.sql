DELIMITER //

-- Procedure to register a new user
-- Usage: CALL register_user('email@example.com', 'hashed_password', 1);
CREATE PROCEDURE register_user(
    IN email VARCHAR(255),
    IN password VARCHAR(255),
    IN role_id INT
)
BEGIN
    INSERT INTO users (email, password, role_id, created_at)
    VALUES (email, password, role_id, NOW());
END //

-- Procedure to authenticate a user
-- Usage: CALL authenticate_user('email@example.com', 'hashed_password');
CREATE PROCEDURE authenticate_user(
    IN email VARCHAR(255),
    IN password VARCHAR(255)
)
BEGIN
    DECLARE user_count INT;
    SELECT COUNT(*) INTO user_count
    FROM users
    WHERE email = email AND password = password;
    
    IF user_count = 1 THEN
        SELECT 'Authenticated' AS status;
    ELSE
        SELECT 'Authentication Failed' AS status;
    END IF;
END //

DELIMITER ;
