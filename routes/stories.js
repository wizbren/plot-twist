/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
//const storyQueries = require('../db/queries/storyQueries')

//-----------------------------GET----------------------------->

//get all IN PROGRESS stories that user DOES NOT own
router.get('/write', (req, res) => {

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //Database query to get all stories a user is currently making contributions on
  storyQueries.getInProgressStoriesByUserId(req.session['user_id']) //use cookies to set this value req.cookies.id
    .then((stories) => {
      //render results of query
      const templateVars = { stories }
      res.render('stories', templateVars);
      // res.json(stories);
    });
});

//get all COMPLETE stories that user DOES NOT own
router.get('/read', (req, res) => {

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //database query to get all completed stories that a user made contributions on
  storyQueries.getCompleteStoriesByUserId(req.session['user_id'])
    .then((stories) => {
      //render results of query
      // res.render('stories');
      res.json(stories);
    });
});

//get all stories that user owns (owner_id)
router.get('/:owner_id', (req, res) => {

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //database query to get all stories associated with users owner_id
  storyQueries.getStoriesByOwnerId(req.session['user_id'])
    .then((stories) => {
      //render results of query
      // res.render('stories');
      res.json(stories);
    });
});

//get specific IN PROGRESS story that user DOES NOT own
router.get('/write/:story_id', (req, res) => {

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //database query to get a specific story based on a specific user_id that they are contributing to
  storyQueries.getInProgressStoryByUserId(req.session['user_id'])
    .then((stories) => {
      //render results of query
      // res.render('stories');
      res.json(stories);
    });
});

//get specific COMPLETE story
router.get('/read/:story_id', (req, res) => {

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //database query to get a specific completed story
  storyQueries.getCompleteStoryByUserId()
    .then((stories) => {
      //render results of query
      // res.render('stories');
      res.json(stories);
    });
});

//get specific story that user owns (owner_id)
router.get('/:owner_id/:story_id', (req, res) => {

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //database query to get a specific story that a user owns
  //note, this will only matter if the story is in progress
  //completed stories will route to /read/:story_id
  storyQueries.getStoryByOwnerId(req.session['user_id'])
    .then((stories) => {
      //render results of query
      // res.render('stories');
      res.json(stories);
    });
});

//-----------------------------POST----------------------------->

// this will take inputs from the owners story and append them to the story
// the first input will be a title from the owner
// the second input will be the first paragraph from the owner
// all other appended inputs will be from contributions
router.post('/:owner_id/:story_id', (req, res) => {

});

// submit button will add contribution to feed
// note: this should not refresh the page!
router.post('/write/:story_id', (req, res) => {

});

//-----------------------------EXPORTS----------------------------->

module.exports = router;
