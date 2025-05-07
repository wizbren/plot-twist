// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const stories = require('./db/queries/stories');


const PORT = process.env.PORT || 8080;
const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['your-secret-key', 'another-secret-key'],
  maxAge: 24 * 60 * 60 * 1000
}));
app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const userApiRoutes = require('./routes/users-api');
// const widgetApiRoutes = require('./routes/widgets-api');
const storiesRoutes = require('./routes/stories');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use('/api/users', userApiRoutes);
// app.use('/api/widgets', widgetApiRoutes);
app.use('/stories', storiesRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes)
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get('/', (req, res) => {
//   res.render('index');
// });

//replaced the above with this for rendering the home page. I did this becuase our homepage will need to render in some number of stories
app.get('/', (req, res) => {
  console.log(`user ID is set to ${req.session['user_id']}`)
  if (!req.session['user_id']) {
    res.redirect('/login');
    return;
  }

  stories.getAllStories()
    .then((stories) => {
      // console.log(stories);
      //render results of query
      // const templateVars = { stories }
      // res.render('stories', templateVars);
      res.json({ message: 'front page placeholder', stories});
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error loading front page stories');
    });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
