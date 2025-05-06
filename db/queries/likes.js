const db = require('../connection');


/*Not very useful outside of testing*/
const getAllLikes = () => {
  return db.query('SELECT * FROM likes;')
    .then((data) => {
      return data.rows;
    });
};


const getLikesByUserId = (user_id) => {
  return db.query('SELECT * FROM likes WHERE user_id = $1;', [user_id])
    .then((data) => {
      return data.rows;
    });
};


const getLikesByContributionId = (contribution_id) => {
  return db.query('SELECT * FROM likes WHERE contribution_id = $1;', [contribution_id])
    .then((data) => {
      return data.rows;
    });
};


module.exports = {
  getAllLikes,
  getLikesByUserId,
  getLikesByContributionId
};