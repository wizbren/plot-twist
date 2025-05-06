const db = require('../connection');


const getAllContributions = () => {
  return db.query('SELECT * FROM contributions ORDER BY id;')
    .then((data) => {
      return data.rows;
    });
};


const getContributionById = (id) => {
  return db.query('SELECT * FROM contributions WHERE id = $1;', [id])
    .then((data) => {
      return data.rows[0];
    });
};


const getContributionsByUserId = (user_id) => {
  return db.query('SELECT * FROM contributions WHERE user_id = $1;', [user_id])
    .then((data) => {
      return data.rows;
    });
};


const getContributionsByStoryId = (story_id) => {
  return db.query('SELECT * FROM contributions WHERE story_id = $1;', [story_id])
    .then((data) => {
      return data.rows;
    });
};


module.exports = {
  getAllContributions,
  getContributionById,
  getContributionsByUserId,
  getContributionsByStoryId
};