TRUNCATE TABLE likes RESTART IDENTITY CASCADE;


INSERT INTO likes (user_id, contribution_id) VALUES (1, 3);
INSERT INTO likes (user_id, contribution_id) VALUES (1, 1);
INSERT INTO likes (user_id, contribution_id) VALUES (2, 1);
INSERT INTO likes (user_id, contribution_id) VALUES (2, 2);
INSERT INTO likes (user_id, contribution_id) VALUES (3, 2);
INSERT INTO likes (user_id, contribution_id) VALUES (3, 3);