-- Step 3: orders table
-- In the orders.sql file, write out the code for the following problems:
-- 1. Create a table called orders that records: order_id, person_id, product_name, product_price, quantity.
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    person_id INTEGER,
    product_name VARCHAR(30),
    product_price NUMERIC,
    quantity NUMERIC
);

-- 2. Add 5 orders to the orders table.
-- A. Make orders for at least two different people.
-- B. person_id should be different for different people.
INSERT INTO
    orders(person_id, product_name, product_price, quantity)
VALUES
    (1, 'Treasure Island', 7.99, 2),
    (2, 'Bean Boxed Set', 16.17, 3),
    (3, 'Amelia Bedelia Chapter Book', 15.60, 1),
    (4, 'Echo Show 15', 279.98, 3);

-- 5. Select all the records from the orders table.
SELECT
    *
FROM
    orders;

-- 6. Calculate the total number of products ordered.
SELECT
    SUM(quantity)
FROM
    orders;

-- 7. Calculate the total order price.
SELECT
    SUM(product_price * quantity)
FROM
    orders;

-- 8. Calculate the total order price by a single person_id.
SELECT
    person_id,
    SUM(product_price * quantity)
FROM
    orders
GROUP BY
    person_id;