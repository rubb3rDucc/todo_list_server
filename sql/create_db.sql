-- CREATE TABLES
CREATE TABLE IF NOT EXISTS todo_logins
(
    user_id       serial       NOT NULL PRIMARY KEY,
    username      varchar(257) NOT NULL,
    password      varchar(257) NOT NULL,
    email         varchar(257) NOT NULL
);

CREATE TABLE IF NOT EXISTS todo_lists (
    list_id       SERIAL NOT NULL PRIMARY KEY,
    user_id       serial       NOT NULL,
    constraint fk_user_todo foreign key (user_id) REFERENCES todo_logins (user_id)
);

CREATE TABLE IF NOT EXISTS todo_items (
    todo_id       SERIAL NOT NULL PRIMARY KEY,
    user_id       SERIAL NOT NULL,
    list_id       SERIAL NOT NULL,
    content       varchar(257) NOT NULL,
    completed     BOOLEAN,
    constraint fk_list_todo foreign key (list_id) REFERENCES todo_lists (list_id),
    constraint fk_user_todo foreign key (user_id) REFERENCES todo_logins (user_id)
);
