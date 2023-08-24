CREATE TABLE IF NOT EXISTS billing (
    id integer PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    balance INT NOT NULL,
    expire_date VARCHAR(30) DEFAULT NULL,
    status VARCHAR(35) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id)
);