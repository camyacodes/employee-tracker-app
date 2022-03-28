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

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Lewys', 'Everett', 1, NULL),
    ('Idrees', 'Harper', 2, NULL),
    ('Kieran', 'Timms', 1, 2),
    ('Kayla', 'Baldwin', 3, 1),
    ('Ammar', 'East', 3, 1),
    ('Honor', 'Markham', 2, 1),
    ('Samirah', 'Johnston', 1, 2),
    ('Zayd', 'Everett', 3, 2);
    

