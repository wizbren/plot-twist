/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
//const loginQueries = require('../db/queries/loginQueries')

//-----------------------------GET----------------------------->

//get login page and renders it
router.get('/', (req, res) => {
  res.render('login');
  res.json(login);
});

//-----------------------------POST----------------------------->

router.post('', (req, res) => {
  //database query to get a specific user based on their info (id||username||password)
  loginQueries.getUser()
    .then((user) => {
      res.redirect('/')
    })
});

//-----------------------------EXPORTS----------------------------->

module.exports = router;
