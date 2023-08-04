CREATE TABLE IF NOT EXISTS billing (
    id integer PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    balance DECIMAL NOT NULL,
    expire_date TIMESTAMP NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id)
);