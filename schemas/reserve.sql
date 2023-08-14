CREATE TABLE IF NOT EXISTS reserves (
    id integer PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    view_date VARCHAR(30) DEFAULT NULL,
    comment TEXT DEFAULT NULL,
    status VARCHAR(35) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (property_id) REFERENCES properties (id)
);