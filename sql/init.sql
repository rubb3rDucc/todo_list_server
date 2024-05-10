-- CREATE DB

CREATE DATABASE TEST_TODO_DB;


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

-- insert dummy data

-- first user

insert into todo_logins (user_id, username, password, email)
VALUES (231, 'jens', 'jens', 'jens@wundergraph.com');

insert into todo_lists (list_id, user_id)
VALUES (1, 231);

insert into todo_items (user_id, list_id, todo_id, content, completed)
VALUES (231, 1, 123, 'do stuff', false);

insert into todo_items (user_id, list_id, todo_id, content, completed)
VALUES (231, 1, 443, 'do more stuff', false);

insert into todo_items (user_id, list_id, todo_id, content, completed)
VALUES (231, 1, 192, 'test todo 333', false);

-- second user

insert into todo_logins (user_id, username, password, email)
VALUES (444, 'notauser', 'thepassword', 'notauser@email.com');

insert into todo_lists (list_id, user_id)
VALUES (3, 444);

insert into todo_items (user_id, list_id, todo_id, content, completed)
VALUES (444, 3, 1232, 'do stuff', false);

insert into todo_items (user_id, list_id, todo_id, content, completed)
VALUES (444, 3, 4432, 'do more stuff', false);

insert into todo_items (user_id, list_id, todo_id, content, completed)
VALUES (444, 3, 1922, 'test todo 333', false);