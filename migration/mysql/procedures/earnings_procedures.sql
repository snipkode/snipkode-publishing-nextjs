DELIMITER //

-- Procedure to record author earnings
-- Usage: CALL record_author_earnings(1, 1, 100.00);
CREATE PROCEDURE record_author_earnings(
    IN user_id INT,
    IN book_id INT,
    IN amount DECIMAL(10, 2)
)
BEGIN
    INSERT INTO royalties (user_id, book_id, amount, created_at)
    VALUES (user_id, book_id, amount, NOW());
END //

-- Procedure to record editor earnings
-- Usage: CALL record_editor_earnings(1, 1, 50.00);
CREATE PROCEDURE record_editor_earnings(
    IN user_id INT,
    IN book_id INT,
    IN amount DECIMAL(10, 2)
)
BEGIN
    INSERT INTO royalties (user_id, book_id, amount, created_at)
    VALUES (user_id, book_id, amount, NOW());
END //

-- Procedure to record publisher earnings
-- Usage: CALL record_publisher_earnings(1, 1, 150.00);
CREATE PROCEDURE record_publisher_earnings(
    IN user_id INT,
    IN book_id INT,
    IN amount DECIMAL(10, 2)
)
BEGIN
    INSERT INTO royalties (user_id, book_id, amount, created_at)
    VALUES (user_id, book_id, amount, NOW());
END //

DELIMITER ;
