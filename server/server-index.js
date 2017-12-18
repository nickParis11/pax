const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const facebookLogin = require('./server-helpers/facebookLogin.js');
const analyze = require('./server-helpers/analyze.js');

const app = express();
const PORT = 3000;
app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(facebookLogin.passport.initialize());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.get('/auth/facebook', facebookLogin.passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  facebookLogin.passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

app.get('/api/getUser', (req, res) => {
  res.send(req.session.user);
});

app.get('/api/logoutUser', (req, res) => {
  req.session.user = null;
  res.send();
});

app.post('/api/analyze', (req, res) => {
  analyze.analyzeText(req.body.data, req.session.user, res, req.body.data, false);
});

app.post('/api/extract', (req, res) => {
  analyze.analyzeUrl(req.body.data, req.session.user, res);
});

app.post('/api/vote', (req, res) => {
  console.log(req.body);

  // Update the database:
  // Decrement / increment the vote count for the article.
  // Set the user's vote status for the article (downvote / upvote / neither).
  // Return vote count for the article.
  // res.send({ downVoteCount: 0, upVoteCount: 0 });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
