/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
// const storyQueries = require('../db/queries/storyQueries')

//-----------------------------GET----------------------------->

//get all IN PROGRESS stories that user DOES NOT own
router.get('/contribute', (req, res) => {

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //Database query to get all stories a user is currently making contributions on
  storyQueries.getInProgressStoriesByUserId(req.session['user_id'])
    .then((stories) => {
      //render results of query
      const templateVars = { stories }
      // res.render('contribute', templateVars);
      res.json({ message: 'Contribution page placeholder' });
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
      const templateVars = { stories }
      res.render('read', templateVars);
      // res.json(stories);
    });
});

//get specific IN PROGRESS story that user DOES NOT own
router.get('/contribute/:story_id', (req, res) => {

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //database query to get a specific story based on a specific user_id that they are contributing to
  storyQueries.getInProgressStoryByUserId(req.session['user_id'])
    .then((stories) => {
      //render results of query
      const templateVars = { stories }
      res.render('contribute_story_id', templateVars);
      // res.json(stories);
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
  storyQueries.getCompleteStoryByUserId(req.session['user_id'])
    .then((stories) => {
      //render results of query
      const templateVars = { stories }
      res.render('read_story_id', templateVars);
      // res.json(stories);
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
      const templateVars = { stories }
      res.render('owner_id_story_id', templateVars);
      // res.json(stories);
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
      const templateVars = { stories }
      res.render('owners_stories', templateVars);
      // res.json(stories);
    });
});

//-----------------------------POST----------------------------->

// this will take inputs from the owners story and append them to the story
// the first input will be a title from the owner
// the second input will be the first paragraph from the owner
// all other appended inputs will be from contributions
router.post('/:owner_id/:story_id', (req, res) => {
  const { owner_id, story_id } = req.params;
  const { title, text_body, contribution_id, action } = req.body; //action is set to approved when approve button is clicked by owner

  // If it's the initial contribution
  if (title && text_body) {
    return storyQueries.addInitialStoryContent(owner_id, story_id, title, text_body) // this query needs to initialise a story with the data here
      .then(() => {
        res.redirect(`/${owner_id}/${story_id}`)
      })
      .catch(err => res.status(500).send(err.message));
  }

  // If the owner approves a contribution
  if (action === 'approve') {
    return storyQueries.approveContribution(contribution_id, story_id) //this query needs to append the existing story at the passed story id and add contribution id
      .then(() => {
        return storyQueries.clearPendingContributions(story_id) //query must delete all pending contributions in datatable
      })
      .then(() => {
        res.redirect(`/${owner_id}/${story_id}`)
      })
  }

  // If the owner finishes the story
  if (action === 'finish') {
    return storyQueries.finishStory(story_id) //this query should switch is complete boolean to true
      .then(() => {
        res.redirect(`/${owner_id}/${story_id}`)
      })
  }

  // Default fallback
  res.status(400).send('Invalid request'); //idk why we would hit this error, but if none of the above are true this error reads out
});

// submit button will add contribution to feed
// note: this should not refresh the page!
router.post('/contribute/:story_id', (req, res) => {
  const { story_id } = req.params;
  const { text_body } = req.body;
  const user_id = req.session['user_id']; //individual contributing the text

  //error handling for blank submissions
  if (!text_body) {
    return res.status(400).send('No paragraph submitted');
  }

  storyQueries.submitContribution(user_id, story_id, text_body) //this query should insert a contribution paragraph into the contributions table (maybe user_id -> contributor_id??)
    .then(() => res.status(200).send('Contribution submitted for approval'))
});

//-----------------------------EXPORTS----------------------------->

module.exports = router;
