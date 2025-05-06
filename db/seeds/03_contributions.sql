TRUNCATE TABLE contributions RESTART IDENTITY CASCADE;


INSERT INTO contributions (user_id, story_id, text, pending) VALUES (3, 2, 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', TRUE);
INSERT INTO contributions (user_id, story_id, text, pending) VALUES (3, 1, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', FALSE);
INSERT INTO contributions (user_id, story_id, text, pending) VALUES (1, 2, 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', TRUE);