const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const facebookLogin = require('./server-helpers/facebookLogin.js');
const trust = require('./server-helpers/algorithm.js');
const analyzeTone = require('./server-helpers/toneAnalyzer');
const aylienHelpers = require('./server-helpers/aylienHelpers');
const article = require('./db/controllers/articleController.js');

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
  const analysis = {};

  analyzeTone(req.body.data)
    .then((tone) => {
      analysis.tone = tone;
      aylienHelpers.sentimentAnalysis(req.body.data)
        .then((sentiment) => {
          analysis.sentiment = sentiment;
          analysis.score = trust.trustAnalysis(analysis.tone);
          res.send(analysis);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/api/extract', (req, res) => {
  const analysis = {};

  aylienHelpers.extractArticle(req.body.data)
    .then((text) => {
      // analysis.summary = text.sentences;
      analyzeTone(text.article)
        .then((tone) => {
          analysis.tone = JSON.parse(tone);
          aylienHelpers.sentimentAnalysis(text.article)
            .then((sentiment) => {
              analysis.sentiment = sentiment;
              analysis.score = trust.trustAnalysis(analysis.tone);
              if (req.session.user) {
                article.store(analysis, req.session.user, req.body.data, true)
              }
              res.send(analysis);
            })
            .catch((err) => {
              res.send(err);
            });
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/api/vote', (req, res) => {
  // Expects an article id, either in req.body or as a param.
  // Return vote count for the article.
  res.send({ downVoteCount: 0, upVoteCount: 0 });
});

app.post('/api/vote', (req, res) => {
  // Expects an article id and user id, either in req.body or as a param.
  // Update the database:
  // Decrement / increment the vote count for the article.
  // Set the user's vote status for the article (downvote / upvote / neither).
  // Return vote count for the article.
  res.send({ downVoteCount: 0, upVoteCount: 0 });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

