/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

//-----------------------------GET----------------------------->

//get login page and renders it with buttons
router.get('/', (req, res) => {

  //if logged in --->redirect from /register ---> /urls
  if (req.session["userId"] !== undefined) {
    res.redirect("/");
    return;
  }

  // res.render('login');
  res.json({ message: 'Login page placeholder' });
});

//button click gets login route for specific user clicked based off of id
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  //set a cookie using cookie parser
  req.session.user_id = userId;
  // redirect to /
  res.redirect('/');
});

//-----------------------------POST----------------------------->

//add a post route for user security. for now get request buttons as per above request will work just fine

//-----------------------------EXPORTS----------------------------->

module.exports = router;
