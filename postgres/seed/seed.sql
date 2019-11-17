BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) VALUES ('nah', 'nah@gmail.com', 4, '2019-01-01');
INSERT INTO login (hash, email) VALUES ('$2a$10$7sTP3TpCINU1O05wq1aeWePsOtnfFZzwUcohw788diHe37V9P9kry', 'nah@gmail.com');

COMMIT;