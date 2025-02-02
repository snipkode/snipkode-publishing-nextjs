DELIMITER //

-- Procedure to record a sale
-- Usage: CALL record_sale(1, 1, '2023-01-01', 100.00, 'order123', 'pending', 'token123');
CREATE PROCEDURE record_sale(
    IN book_id INT,
    IN user_id INT,
    IN sale_date DATE,
    IN amount DECIMAL(10, 2),
    IN midtrans_order_id VARCHAR(255),
    IN midtrans_transaction_status VARCHAR(255),
    IN midtrans_transaction_token VARCHAR(255)
)
BEGIN
    INSERT INTO sales (book_id, user_id, sale_date, amount, midtrans_order_id, midtrans_transaction_status, midtrans_transaction_token)
    VALUES (book_id, user_id, sale_date, amount, midtrans_order_id, midtrans_transaction_status, midtrans_transaction_token);
END //

-- Procedure to update the status of a sale
-- Usage: CALL update_sale_status(1, 'completed');
CREATE PROCEDURE update_sale_status(
    IN sale_id INT,
    IN midtrans_transaction_status VARCHAR(255)
)
BEGIN
    UPDATE sales
    SET midtrans_transaction_status = midtrans_transaction_status
    WHERE id = sale_id;
END //

DELIMITER ;
