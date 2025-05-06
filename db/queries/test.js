/*
const { Pool } = require('pg');
const stories = require('./stories');

const db = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm',
  port: 5432
});


stories.getInProgressStoryByOwner(3, 3)
  .then(data => {
    console.log('All Stories:', data);
    db.end();
  })
  .catch(err => {
    console.error('Query failed:', err);
    db.end();
  });
*/