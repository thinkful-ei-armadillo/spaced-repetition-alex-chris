--psql -U postgres -d spaced_repetition -f ./seeds/seed.tables.sql
--heroku pg:psql -f ./seeds/seed.tables.sql

BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Dutch', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'eekhorn', 'squirrel', 2),
  (2, 1, 'hoed', 'hat', 3),
  (3, 1, 'vrouw', 'woman', 4),
  (4, 1, 'snelweg', 'highway', 5),
  (5, 1, 'zeikenhuis', 'hospital', 6),
  (6, 1, 'kerk', 'church', 7),
  (7, 1, 'grappid', 'comic', 8),
  (8, 1, 'gebouw', 'building', 9),
  (9, 1, 'voedsel', 'food', 10),
  (10, 1, 'politieagent', 'policeman', 11),
  (11, 1, 'boom', 'tree', null); 

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
