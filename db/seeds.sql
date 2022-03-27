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
    ('Lewys', 'Everett', 1, 1),
    ('Idrees', 'Harper', 2, 2),
    ('Kieran', 'Timms', 1, 2),
    ('Kayla', 'Baldwin', 3, 2),
    ('Ammar', 'East', 3, 2),
    ('Honor', 'Markham', 2, 2),
    ('Samirah', 'Johnston', 1, 2),
    ('Zayd', 'Everett', 3, 2);
    

