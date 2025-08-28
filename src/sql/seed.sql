INSERT INTO users(name,email,password_hash,role) VALUES
('Alice Patient','alice@test.com','$2b$10$W0QpKl4a7/8W8X9Jlq6TKeKkZ5X5K6L9Y0b3A9Y8Y8Y8Y8Y8Y8Y8Y8','patient'),
('Bob Doctor','bob@test.com','$2b$10$W0QpKl4a7/8W8X9Jlq6TKeKkZ5X5K6L9Y0b3A9Y8Y8Y8Y8Y8Y8Y8Y8','doctor');

INSERT INTO doctors(user_id,specialization,license,schedules) VALUES
((SELECT id FROM users WHERE email='bob@test.com'),'cardiology','MD123456',
 '[{"day":1,"start":"08:00","end":"12:00","duration":30}]');
