DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    favorite_color VARCHAR(30),
    age INTEGER
);

CREATE TABLE friends (
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,

    PRIMARY KEY (user_id, friend_id),

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (friend_id)
        REFERENCES users(id),

    CHECK (user_id < friend_id)
);