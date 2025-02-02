DELIMITER //

-- Procedure to invite a contributor to a book
-- Usage: CALL invite_contributor(1, 2, 3);
CREATE PROCEDURE invite_contributor(
    IN book_id INT,
    IN user_id INT,
    IN role_id INT
)
BEGIN
    INSERT INTO book_contributors (book_id, user_id, role_id, invited_at)
    VALUES (book_id, user_id, role_id, NOW());
END //

DELIMITER ;
