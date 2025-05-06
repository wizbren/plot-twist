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

//get login page and renders it with buttons
router.get('/', (req, res) => {
  // res.render('login');
  //use buttons to send id
  res.json(login);
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  //set a cookie using cookie parser
  // redirect to /
});

//-----------------------------POST----------------------------->

//add a post route for user security

//-----------------------------EXPORTS----------------------------->

module.exports = router;
