const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const facebookLogin = require('./server-helpers/facebookLogin.js');
const analyze = require('./server-helpers/analyze.js');
const vote = require('./server-helpers/vote.js');

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

app.get('/api/vote/:id', (req, res) => {
  vote.retrieveVotes(req.params.id);
  res.send({ downVoteCount: 1, upVoteCount: 7 });
});

app.post('/api/vote', (req, res) => {
  vote.submitVote(req.session.user, req.body.article_id, req.body.upvote);
  // Return vote counts for the article.
  res.send(200);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
