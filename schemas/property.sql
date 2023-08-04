CREATE TABLE IF NOT EXISTS properties (
    id integer PRIMARY KEY AUTO_INCREMENT,
    location_id INT NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    cover_image TEXT DEFAULT NULL,
    video VARCHAR(255) DEFAULT NULL,
    description TEXT NOT NULL,
    amenities TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    status VARCHAR(35) NOT NULL,
    purpose VARCHAR(35) NOT NULL,
    average_rating DOUBLE PRECISION DEFAULT 0.00,
    status_expire_date TIMESTAMP NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (location_id) REFERENCES locations (id)
);