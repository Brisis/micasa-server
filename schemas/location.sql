CREATE TABLE IF NOT EXISTS locations (
    id integer PRIMARY KEY AUTO_INCREMENT,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    map_coordinates TEXT DEFAULT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);