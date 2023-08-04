CREATE TABLE IF NOT EXISTS rentals (
    id integer PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    expire_date TIMESTAMP NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (property_id) REFERENCES properties (id)
);