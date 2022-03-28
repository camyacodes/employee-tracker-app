INSERT INTO departments (name)
VALUES 
    ('Customer Service'),
    ('Bakery'),
    ('Pharmacy'),
    ('Deli');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Baker', 50000, 2),
    ('Pharmacist', 78000, 3),
    ('Customer Care Associate', 35000, 1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES
    ('Lewys', 'Everett', 1),
    ('Idrees', 'Harper', 2),
    ('Kieran', 'Timms', 1),
    ('Kayla', 'Baldwin', 3),
    ('Ammar', 'East', 3),
    ('Honor', 'Markham', 2),
    ('Samirah', 'Johnston', 3),
    ('Zayd', 'Everett', 3);
    

