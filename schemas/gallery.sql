CREATE TABLE IF NOT EXISTS gallery (
    id integer PRIMARY KEY AUTO_INCREMENT,
    image_thumbnail VARCHAR(255) NOT NULL,
    image_original VARCHAR(255) NOT NULL,
    property_id INT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (property_id) REFERENCES properties (id)
);