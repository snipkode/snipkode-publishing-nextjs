DELIMITER //

-- Procedure to get available books for reading
-- Usage: CALL get_available_books();
CREATE PROCEDURE get_available_books()
BEGIN
    SELECT * FROM books;
END //

-- Procedure to get subscription packages
-- Usage: CALL get_subscription_packages();
CREATE PROCEDURE get_subscription_packages()
BEGIN
    SELECT * FROM subscription_packages;
END //

DELIMITER ;
