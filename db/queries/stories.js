const db = require('../connection');


const getAllStories = () => {
  return db.query('SELECT * FROM stories ORDER BY id;')
    .then((data) => {
      return data.rows;
    });
};


const getStoryById = (storyId) => {
  return db.query('SELECT * FROM stories WHERE id = $1;', [storyId])
    .then((data) => {
      return data.rows[0];
    });
};


const getStoriesByUserId = (ownerId) => {
  return db.query('SELECT * FROM stories WHERE owner_id = $1', [ownerId])
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


const getCompletedStories = () => {
  return db.query ('SELECT * FROM stories WHERE complete = true;')
    .then((data) => {
      return data.rows;
    });
};


const getInProgressStories = () => {
  return db.query ('SELECT * FROM stories WHERE complete = false;')
    .then((data) => {
      return data.rows;
    });
};

/*Change the name*/
const getInProgressStoriesNotOwnedByUser = (userId) => {
  return db.query('SELECT * FROM stories WHERE complete = false AND owner_id != $1;', [userId])
    .then((data) => {
      return data.rows;
    });
};

/*Change the name*/
const getCompletedStoriesNotOwnedByUser = (userId) => {
  return db.query('SELECT * FROM stories WHERE owner_id != $1 AND complete = true;', [userId])
    .then((data) => {
      return data.rows;
    });
};

/*Change the name*/
const getSpecificInProgressStoryNotOwnedByUser = (storyId, userId) => {
  return db.query('SELECT * FROM stories WHERE id = $1 AND owner_id != $2 AND complete = false;', [storyId, userId])
    .then((data) => {
      return data.rows[0];
    });
};

/*Change the name???*/
const getSpecificCompletedStoryById = (storyId) => {
  return db.query('SELECT * FROM stories WHERE id = $1 AND complete = true;', [storyId])
    .then((data) => {
      return data.rows[0];
    });
};


const getInProgressStoryByOwner = (storyId, userId) => {
  return db.query('SELECT * FROM stories WHERE id = $1 AND owner_id = $2 AND complete = false;', [storyId, userId])
    .then((data) => {
      return data.rows[0];
    });
};


module.exports = {
  getAllStories,
  getStoryById,
  getStoriesByUserId,
  getStoryByTitle,
  getCompletedStories,
  getInProgressStories,
  getInProgressStoriesNotOwnedByUser,
  getCompletedStoriesNotOwnedByUser,
  getSpecificInProgressStoryNotOwnedByUser,
  getSpecificCompletedStoryById,
  getInProgressStoryByOwner
};