CREATE TABLE users (
    user_name varchar(50) PRIMARY KEY,
    password varchar(50),
    email varchar(50),
    city varchar(50),
    is_admin BOOLEAN
);

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name varchar(50),
    region varchar(50)
);

CREATE TABLE historical_data (
    id SERIAL PRIMARY KEY,
    city_id int references cities(id),
    year int,
    population int
);
