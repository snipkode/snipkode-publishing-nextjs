DELIMITER //

-- Procedure to handle user registration and authentication
-- Usage: CALL handle_user_registration('email@example.com', 'hashed_password', 1);
CREATE PROCEDURE handle_user_registration(
    IN email VARCHAR(255),
    IN password VARCHAR(255),
    IN role_id INT
)
BEGIN
    CALL register_user(email, password, role_id);
    CALL authenticate_user(email, password);
END //

-- Procedure to handle publisher management
-- Usage: CALL handle_publisher_management('Publisher Name', 'email@example.com', 1);
CREATE PROCEDURE handle_publisher_management(
    IN name VARCHAR(255),
    IN email VARCHAR(255),
    IN created_by INT
)
BEGIN
    CALL add_publisher(name, email, created_by);
    CALL get_publishers();
END //

-- Procedure to handle book management
-- Usage: CALL handle_book_management('Book Title', 1, 1, 1, '2023-01-01');
CREATE PROCEDURE handle_book_management(
    IN title VARCHAR(255),
    IN author_id INT,
    IN publisher_id INT,
    IN editor_id INT,
    IN published_at DATE
)
BEGIN
    CALL add_new_book(title, author_id, publisher_id, editor_id, published_at);
    CALL update_book_details(LAST_INSERT_ID(), title, author_id, publisher_id, editor_id, published_at);
END //

-- Procedure to handle reading and subscription management
-- Usage: CALL handle_subscription_management();
CREATE PROCEDURE handle_subscription_management()
BEGIN
    CALL get_available_books();
    CALL get_subscription_packages();
END //

-- Procedure to handle earnings for authors, editors, and publishers
-- Usage: CALL handle_earnings(1, 1, 100.00, 'author');
CREATE PROCEDURE handle_earnings(
    IN user_id INT,
    IN book_id INT,
    IN amount DECIMAL(10, 2),
    IN role VARCHAR(255)
)
BEGIN
    IF role = 'author' THEN
        CALL record_author_earnings(user_id, book_id, amount);
    ELSEIF role = 'editor' THEN
        CALL record_editor_earnings(user_id, book_id, amount);
    ELSEIF role = 'publisher' THEN
        CALL record_publisher_earnings(user_id, book_id, amount);
    END IF;
END //

DELIMITER ;
