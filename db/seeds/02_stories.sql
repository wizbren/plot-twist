TRUNCATE TABLE stories RESTART IDENTITY CASCADE;


INSERT INTO stories (owner_id, title, text_body, complete) VALUES (2, 'Hollow Knight', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', true);
INSERT INTO stories (owner_id, title, text_body, complete) VALUES (3, 'Baldurs Gate', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', false);
INSERT INTO stories (owner_id, title, text_body, complete) VALUES (1, 'Elder Scrolls', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', false);