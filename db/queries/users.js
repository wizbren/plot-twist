const db = require('../connection');

const getAllUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};


const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
    .then((data) => {
      return data.rows[0];
    });
};


const getUserByName = (name) => {
  return db.query('SELECT * FROM users WHERE name = $1;', [name])
    .then((data) => {
      return data.rows[0];
    });
};


const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE email = $1;', [email])
    .then((data) => {
      return data.rows[0];
    });
};


module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  getUserByEmail
};