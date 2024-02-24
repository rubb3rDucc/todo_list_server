-- CREATE OR REPLACE FUNCTION update_modified_column()
--     RETURNS TRIGGER AS
-- $$
-- BEGIN
--     NEW.last_login_at = now();
--     RETURN NEW;
-- END;
-- $$ language 'plsql';
--
-- CREATE TRIGGER update_user
--     BEFORE UPDATE
--     ON user_login_data
--     FOR EACH ROW
-- EXECUTE PROCEDURE update_modified_column();

CREATE TABLE user_login_data
(
    user_id       serial       NOT NULL primary key,
    username      varchar(257) NOT NULL,
    password      varchar(257) NOT NULL,
    email         varchar(257) NOT NULL,
    created_at    TIMESTAMPTZ  NOT NULL,
    last_login_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_profile_data
(
    user_id       serial       NOT NULL primary key,
    username      varchar(257) NOT NULL,
    created_at    TIMESTAMPTZ  NOT NULL,
    last_login_at TIMESTAMPTZ DEFAULT NOW(),
    constraint fk_login_profile
        foreign key (user_id)
            REFERENCES user_login_data (user_id)
);

CREATE TABLE todos
(
    list_id    SERIAL      NOT NULL PRIMARY KEY,
    title      TEXT,
    content    TEXT,
    completed  boolean,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    constraint fk_list_todo
        foreign key (list_id)
            REFERENCES todos (list_id),
    constraint fk_profile_list
        foreign key (list_id)
            REFERENCES user_profile_data (user_id)
);

CREATE TABLE todo
(
    list_id      SERIAL      NOT NULL,
    todo_id      SERIAL      NOT NULL PRIMARY KEY,
    title        TEXT,
    content      TEXT,
    completed    boolean,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    constraint fk_list_todo
        foreign key (list_id)
            REFERENCES todos (list_id)
);

SELECT * FROM user_profile_data WHERE user_id = 231;

DO $$
DECLARE
   user_id_one   INTEGER := 1;
   user_id_two VARCHAR(50) := 'John';
   last_name  VARCHAR(50) := 'Doe';
   payment    NUMERIC(11,2) := 20.5;
BEGIN
    c := a + b;
    RAISE NOTICE'Value of c: %', c;
END $$;

insert into user_login_data (user_id, username, password, email) VALUES (231,'jens', 'jens','jens@wundergraph.com');
insert into user_profile_data (user_id, username) VALUES (231,'jens');

insert into todo (user_id, todo_id, title, content, completed) VALUES (231, 1, 'test title', 'do stuff', false);
insert into todo (user_id, todo_id, title, content, completed) VALUES (231, 2, 'another test title', 'do more stuff', false);

SELECT * FROM todo WHERE user_id = '231';
SELECT * FROM todo;

DELETE FROM todo WHERE user_id = '231';
DELETE FROM todo WHERE todo_id = '1';

UPDATE todo SET title = 'new title blue' WHERE todo_id = '2';
UPDATE todo SET content = 'new content orange' WHERE todo_id = '2';
UPDATE todo SET completed = false WHERE todo_id = '2';
UPDATE todo SET completed = true WHERE todo_id = '2';


UPDATE todo SET title = 'new title red' WHERE todo_id = '1';
UPDATE todo SET content = 'new content purple' WHERE todo_id = '1';
UPDATE todo SET completed = false WHERE todo_id = '1';
UPDATE todo SET completed = true WHERE todo_id = '1';