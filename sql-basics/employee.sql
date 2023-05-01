-- Step 5: employee table¶
-- In the employee.sql file, write out the code for the following problems:
-- 1. List all employee first and last names only that live in Calgary.
SELECT
    first_name,
    last_name
FROM
    employee
WHERE
    city = 'Calgary';

-- 2. Find the birth_date for the youngest employee.
SELECT
    first_name,
    last_name,
    birth_date
FROM
    employee
ORDER BY
    birth_date DESC
LIMIT
    1;

-- 3. Find the birth_date for the oldest employee.
SELECT
    first_name,
    last_name,
    birth_date
FROM
    employee
ORDER BY
    birth_date ASC
LIMIT
    1;

-- 4. Find everyone that reports to Nancy Edwards (use the ReportsTo column). 
-- * You will need to query the employee table to find the id for Nancy Edwards
SELECT
    *
FROM
    employee
WHERE
    reports_to = (
        SELECT
            employee_id
        FROM
            employee
        WHERE
            first_name = 'Nancy'
            AND last_name = 'Edwards'
    );

-- 5. Count how many people live in Lethbridge.
SELECT
    COUNT(city)
FROM
    employee
WHERE
    city = 'Lethbridge'