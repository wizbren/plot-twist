const db = require('../connection');


const getAllStories = () => {
  return db.query('SELECT * FROM stories ORDER BY id;')
    .then((data) => {
      return data.rows;
    });
};


const getStoryById = (id) => {
  return db.query('SELECT * FROM stories WHERE id = $1;')
    .then((data) => {
      return data.rows[0];
    });
};


const getStoriesByUserId = (owner_id) => {
  return db.query('SELECT * FROM stories WHERE owner_id = $1', [owner_id])
    .then((data) => {
      return data.rows;
    });
};


const getStoryByTitle = (title) => {
  return db.query('SELECT * FROM stories WHERE title = $1', [title])
    .then((data) => {
      return data.rows[0];
    });
};


module.exports = {
  getAllStories,
  getStoryById,
  getStoriesByUserId,
  getStoryByTitle
};