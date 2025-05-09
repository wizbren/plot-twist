/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const stories = require('../db/queries/stories');

//-----------------------------GET----------------------------->

//get all IN PROGRESS stories that user DOES NOT own
router.get('/contribute', (req, res) => {

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //Database query to get all stories a user is currently making contributions on
  stories.getInProgressStoriesNotOwnedByUser(req.session['user_id'])
    .then((stories) => {
      //render results of query
      const templateVars = { stories, userId: req.session.user_id };
      res.render('read-contribute', templateVars);
      //res.json({ message: 'Contribution page placeholder', stories });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error loading contribute page stories');
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
  stories.getCompletedStoriesNotOwnedByUser(req.session['user_id'])
    .then((stories) => {
      //render results of query
      const templateVars = { stories, userId: req.session.user_id };
      res.render('read-stories', templateVars);
      //res.json({ message: 'Read page placeholder', stories });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error loading read page stories');
    });
});

//get specific IN PROGRESS story that user DOES NOT own
router.get('/contribute/:story_id', (req, res) => {
  const { story_id } = req.params;

  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }
  //database query to get a specific story based on a specific user_id that they are contributing to
  stories.getSpecificInProgressStoryNotOwnedByUser(story_id, req.session['user_id'])
    .then((story) => {
      console.log(story);

      return stories.getPendingContributionsByStoryId(story_id)
        .then((contributions) => {
          const templateVars = {
            story,
            contributions,
            userId: req.session.user_id
          };
          res.render('contribute-story', templateVars);
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(`Error loading contribute page for story_id:${story_id}`);
    });
});

//get specific COMPLETE story
router.get('/read/:story_id', (req, res) => {
  const { story_id } = req.params;

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //database query to get a specific completed story
  stories.getSpecificCompletedStoryById(story_id)
    .then((story) => {
      //render results of query
      const templateVars = { story, userId: req.session.user_id };
      res.render('read-story', templateVars); //ejs file we want to render this data to
      // res.json({ message: `Story_id: ${story_id} read page placeholder`, story });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(`Error loading read page for story_id:${story_id}`);
    });
});

//get specific story that user owns (owner_id)
router.get('/:owner_id/:story_id', (req, res) => {
  const { story_id } = req.params;
  const { owner_id } = req.params;

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //database query to get a specific story that a user owns
  //note, this will only matter if the story is in progress
  //completed stories will route to /read/:story_id
  stories.getInProgressStoryByOwner(story_id, owner_id)
    .then((story) => {
      return stories.getPendingContributionsByStoryId(story_id) //i will likely need this is more than one view
        .then((contributions) => {
          const templateVars = {
            userId: req.session.user_id, //user id for header (would be bette as username)
            story,           // single story object
            contributions    // array of contribution objects
          };
          res.render('owner-page-create', templateVars);
        });
      // res.json({ message: `page placeholder for owner:${owner_id} story:${story_id}`, story });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(`Error loading owner:${owner_id} page for story:${story_id}`);
    });
});

//get all stories that user owns (owner_id)
router.get('/:owner_id', (req, res) => {
  const { owner_id } = req.params;

  //check if logged in. RESTRICTED PERMISSION
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  //database query to get all stories associated with users owner_id
  stories.getStoriesByUserId(owner_id)
    .then((stories) => {
      //render results of query
      const templateVars = { stories, userId: req.session.user_id };
      res.render('owner-page', templateVars);
      //res.json({ message: `page placeholder for owner:${owner_id}`, stories });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(`Error loading stories for owner:${owner_id} page`);
    });
});

//-----------------------------POST----------------------------->

router.post('/create', (req, res) => {
  const ownerId = req.session.user_id;
  const { title, text_body } = req.body;

  stories.addInitialStoryContent(ownerId, title, text_body)
    .then(newStory => {
      res.redirect(`/stories/${ownerId}/${newStory.id}`);
    })
    .catch(err => {
      console.error('Failed to create story:', err);
      res.status(500).send(err.message);
    });
});

// submit button will add contribution to feed
// note: this should not refresh the page!
router.post('/contribute/:story_id', (req, res) => {
  const { story_id } = req.params;
  const { text } = req.body;
  const user_id = req.session['user_id'] || 2; //individual contributing the text

  console.log(story_id, '✅', text, '✅', user_id);

  //error handling for blank submissions
  if (!text) {
    return res.status(400).send('No paragraph submitted');
  }

  console.log("this worked 5: ✅")
  stories.submitContribution(user_id, story_id, text) //this query should insert a contribution paragraph into the contributions table (maybe user_id -> contributor_id??)
    // console.log("this worked 6: ✅")
    .then(() => {
      // res.status(200).send('Contribution submitted for approval')
      res.redirect(`/stories/contribute/${story_id}`)
    })
    .catch(err => {
      console.error('Database query error:', err);
      res.status(500).send('Internal Server Error');
    });
});

// this will take inputs from the owners story and append them to the story
// the first input will be a title from the owner
// the second input will be the first paragraph from the owner
// all other appended inputs will be from contributions
router.post('/:owner_id/:story_id', (req, res) => {
  const { owner_id, story_id } = req.params;
  const { title, text_body, contribution_id, action } = req.body; //action is set to approved when approve button is clicked by owner

  // If it's the initial contribution
  if (title && text_body) {
    return stories.addInitialStoryContent(owner_id, title, text_body) // this query needs to initialise a story with the data here
      .then(() => {
        console.log("this worked 1: ✅")
        res.redirect(`/stories/${owner_id}/${story_id}`)
      })
      .catch(err => res.status(500).send(err.message));
  }

  // If the owner approves a contribution
  if (action === 'approve') {
    return stories.approveContribution(contribution_id, story_id) //this query needs to append the existing story at the passed story id and add contribution id
      .then(() => {
        console.log("this worked 2: ✅")
        return stories.clearPendingContributions(story_id) //query must switch all booleans to false for all pending contributions in datatable
      })
      .then(() => {
        console.log("this worked 3: ✅")
        res.redirect(`/stories/${owner_id}/${story_id}`)
      })
  }

  // If the owner finishes the story
  if (action === 'finish') {
    return stories.finishStory(story_id) //this query should switch is complete boolean to true
      .then(() => {
        console.log("this worked 4: ✅")
        res.redirect(`/stories/read/${story_id}`)
      })
  }

  // Default fallback
  res.status(400).send('Invalid request'); //idk why we would hit this error, but if none of the above are true this error reads out
});

//-----------------------------EXPORTS----------------------------->

module.exports = router;
