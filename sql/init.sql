CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);

INSERT INTO users(email,password)
VALUES
('ghanshyamthacker3011@gmail.com','30112004');

CREATE TABLE payment_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_on_card VARCHAR(100),
    card_number VARCHAR(30),
    cvc VARCHAR(10),
    expiry_month VARCHAR(10),
    expiry_year VARCHAR(10)
);

INSERT INTO payment_details(
name_on_card,
card_number,
cvc,
expiry_month,
expiry_year
)
VALUES(
'Ghanshyam Thacker',
'4111111111111111',
'123',
'12',
'2028'
);