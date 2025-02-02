DELIMITER //

-- Procedure to add a new publisher
-- Usage: CALL add_publisher('Publisher Name', 'email@example.com', 1);
CREATE PROCEDURE add_publisher(
    IN name VARCHAR(255),
    IN email VARCHAR(255),
    IN created_by INT
)
BEGIN
    INSERT INTO publishers (name, email, created_by, created_at)
    VALUES (name, email, created_by, NOW());
END //

-- Procedure to get all publishers
-- Usage: CALL get_publishers();
CREATE PROCEDURE get_publishers()
BEGIN
    SELECT * FROM publishers;
END //

DELIMITER ;
