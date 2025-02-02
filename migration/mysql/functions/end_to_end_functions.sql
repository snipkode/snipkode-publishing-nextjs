DELIMITER //

-- Function to get user role and details
-- Usage: SELECT get_user_info(1);
CREATE FUNCTION get_user_info(user_id INT) RETURNS JSON
BEGIN
    DECLARE user_info JSON;
    SET user_info = JSON_OBJECT(
        'role', get_user_role(user_id),
        'details', get_user_details(user_id)
    );
    RETURN user_info;
END //

-- Function to get all publisher and book details
-- Usage: SELECT get_publisher_and_books(1);
CREATE FUNCTION get_publisher_and_books(publisher_id INT) RETURNS JSON
BEGIN
    DECLARE publisher_books JSON;
    SELECT JSON_OBJECT(
        'publisher', (SELECT * FROM publishers WHERE id = publisher_id),
        'books', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'title', title)) FROM books WHERE publisher_id = publisher_id)
    ) INTO publisher_books;
    RETURN publisher_books;
END //

DELIMITER ;
