DROP TABLE IF EXISTS likes CASCADE;


CREATE TABLE likes (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  contribution_id INTEGER REFERENCES contributions(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, contribution_id)
);


/*Is a "composite primary key" the right move here?*/