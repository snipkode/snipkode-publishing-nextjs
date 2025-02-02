DELIMITER //

-- Procedure to add a new book
-- Usage: CALL add_new_book('Book Title', 1, 1, 1, '2023-01-01');
CREATE PROCEDURE add_new_book(
    IN title VARCHAR(255),
    IN author_id INT,
    IN publisher_id INT,
    IN editor_id INT,
    IN published_at DATE
)
BEGIN
    INSERT INTO books (title, author_id, publisher_id, editor_id, published_at)
    VALUES (title, author_id, publisher_id, editor_id, published_at);
END //

-- Procedure to update book details
-- Usage: CALL update_book_details(1, 'Updated Title', 1, 1, 1, '2023-01-01');
CREATE PROCEDURE update_book_details(
    IN book_id INT,
    IN title VARCHAR(255),
    IN author_id INT,
    IN publisher_id INT,
    IN editor_id INT,
    IN published_at DATE
)
BEGIN
    UPDATE books
    SET title = title,
        author_id = author_id,
        publisher_id = publisher_id,
        editor_id = editor_id,
        published_at = published_at
    WHERE id = book_id;
END //

DELIMITER ;
