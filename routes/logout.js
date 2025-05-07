/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

//-----------------------------GET----------------------------->

//-----------------------------POST----------------------------->

//when user clicks logout ---> clears cookie and redirects to /login
router.post('/', (req, res) => {
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }
  req.session = null;  // Destroy the session
  res.redirect('/login');
});

//-----------------------------EXPORTS----------------------------->

module.exports = router;
