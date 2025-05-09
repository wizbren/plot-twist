const db = require('../connection');


const getAllStories = () => {
  return db.query('SELECT * FROM stories ORDER BY id;')
    .then((data) => {
      return data.rows;
    });
};


const getStoryById = (storyId) => {
  return db.query('SELECT * FROM stories WHERE id = $1;', [storyId])
    .then((data) => {
      return data.rows[0];
    });
};

//------------------------------------------------> ✅✅✅
const getStoriesByUserId = (ownerId) => {
  return db.query('SELECT * FROM stories WHERE owner_id = $1', [ownerId])
    .then((data) => {
      return data.rows;
    });
};


const getStoryByTitle = (title) => {
  return db.query('SELECT * FROM stories WHERE title = $1', [title])
    .then((data) => {
      return data.rows[0];
    });
};


const getCompletedStories = () => {
  return db.query ('SELECT * FROM stories WHERE complete = true;')
    .then((data) => {
      return data.rows;
    });
};


const getInProgressStories = () => {
  return db.query ('SELECT * FROM stories WHERE complete = false;')
    .then((data) => {
      return data.rows;
    });
};

//--------------------------------------------------> ✅✅✅
/*Change the name*/
const getInProgressStoriesNotOwnedByUser = (userId) => {
  const query = `
    SELECT stories.*
    FROM stories
    JOIN contributions ON contributions.story_id = stories.id
    WHERE stories.complete = false
    AND stories.owner_id != $1
    AND contributions.user_id = $1;
  `;
  return db.query(query, [userId])
    .then((data) => {
      return data.rows;
    });
};

//--------------------------------------------------> ✅✅✅
/*Change the name*/
const getCompletedStoriesNotOwnedByUser = (userId) => {
  const query = `
  SELECT stories.*
  FROM stories
  JOIN contributions ON contributions.story_id = stories.id
  WHERE stories.complete = true
  AND stories.owner_id != $1
  AND contributions.user_id = $1;
  `;
  return db.query(query, [userId])
    .then((data) => {
      return data.rows;
    });
};

//------------------------------------------------> ✅✅✅
/*Change the name*/
const getSpecificInProgressStoryNotOwnedByUser = (storyId, userId) => {
  return db.query('SELECT * FROM stories WHERE id = $1 AND owner_id != $2 AND complete = false;', [storyId, userId])
    .then((data) => {
      return data.rows[0];
    });
};

//------------------------------------------------> ✅✅✅
/*Change the name???*/
const getSpecificCompletedStoryById = (storyId) => {
  return db.query('SELECT * FROM stories WHERE id = $1 AND complete = true;', [storyId])
    .then((data) => {
      return data.rows[0];
    });
};

//------------------------------------------------> ✅✅✅
const getInProgressStoryByOwner = (storyId, userId) => {
  return db.query('SELECT * FROM stories WHERE id = $1 AND owner_id = $2 AND complete = false;', [storyId, userId])
    .then((data) => {
      return data.rows[0];
    });
};

/* CHECK BELOW */
//------------------------------------------------> ✅✅✅
const finishStory = (story_id) => {
  const queryComplete = `
    UPDATE stories
    SET complete = true
    WHERE id = $1
    RETURNING *;
  `;
  return db.query(queryComplete, [story_id])
    .then(result => result.rows[0]);
};

//------------------------------------------------> ✅✅✅
const addInitialStoryContent = (owner_id, title, text_body) => {
  const storyQuery = `
    INSERT INTO stories (owner_id, title, text_body)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  return db.query(storyQuery, [owner_id, title, text_body])
    .then(storyResult => {
      const story = storyResult.rows[0];
      return story;
    });
};

//------------------------------------------------> ✅✅✅
const clearPendingContributions = (story_id) => {
  const clearPending = `
    UPDATE contributions
    SET pending = false
    WHERE story_id = $1 AND pending = true
    RETURNING *;
  `;

  return db.query(clearPending, [story_id])
    .then(result => result.rows);
};

/* THESE MIGHT NOT BE OK */

//contributor submits a paragraph and it is added to the stack of pending contributions
const submitContribution = (user_id, story_id, text) => {
  const storyContribution = `
  INSERT INTO contributions (user_id, story_id, text)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;                                 //Changed contribution_id in the INSERT line to user_id, to match the column in function parameter
  return db.query(storyContribution, [user_id, story_id, text])
  .then(result => result.rows[0]);      //Changed from result.rows => result.rows[0], because it's only returning one row of data (the new contribution)
};

//------------------------------------------------> ✅✅✅
const approveContribution = (contribution_id) => {
  const queryUpdateStory = `
    UPDATE stories
    SET text_body = CONCAT(stories.text_body, ' ', contributions.text)
    FROM contributions
    WHERE contributions.id = $1 AND stories.id = contributions.story_id;
  `;
  //Below marks contribution as approved
  const queryApproveStory = `
    UPDATE contributions
    SET pending = false
    WHERE id = $1;
  `;
  //Run the queryUpdateStory to update the story
  return db.query(queryUpdateStory, [contribution_id])
    .then(() => {
      return db.query(queryApproveStory, [contribution_id]);
    });
};


// Get all pending contributions for a story by story id
const getPendingContributionsByStoryId = (story_id) => {
  const query = `
  SELECT contributions.*, users.name
  FROM contributions
  JOIN users ON users.id = contributions.user_id
  WHERE contributions.story_id = $1
  AND contributions.pending = true;
  `;
  return db.query(query, [story_id])
    .then((result) => result.rows);
};

const countContributionLikes = (contributionId) => {
  const query = `
    SELECT COUNT(*) AS like_count
    FROM likes
    WHERE contribution_id = $1;
  `;

  return db.query(query, [contributionId])
    .then(result => result.rows[0].like_count);
};

module.exports = {
  getAllStories,
  getStoryById,
  getStoriesByUserId,
  getStoryByTitle,
  getCompletedStories,
  getInProgressStories,
  getInProgressStoriesNotOwnedByUser,
  getCompletedStoriesNotOwnedByUser,
  getSpecificInProgressStoryNotOwnedByUser,
  getSpecificCompletedStoryById,
  getInProgressStoryByOwner,
  finishStory,
  addInitialStoryContent,
  clearPendingContributions,
  submitContribution,
  approveContribution,
  getPendingContributionsByStoryId,
  countContributionLikes
};