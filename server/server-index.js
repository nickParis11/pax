const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const score = require('./algorithm.js');
const analyzeInput = require('./toneAnalyzer');
const aylienHelpers = require('./aylienHelpers');
const user = require('./db/controllers/userController.js');
const article = require('./db/controllers/articleController.js');

require('dotenv').config();

passport.use(new FacebookStrategy(
  {
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: process.env.FB_LOCAL_DIRECT || 'http://ec2-54-163-98-154.compute-1.amazonaws.com/auth/facebook/callback',
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    req.session.user = profile.id;
    user.post({ body: profile.id }, (err, user) => {
      done(err, user);
    });
  },
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const app = express();
const PORT = 3000;
app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
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

  analyzeInput(req.body.data)
    .then((tone) => {
      analysis.tone = tone;
      aylienHelpers.sentimentAnalysis(req.body.data)
        .then((sentiment) => {
          analysis.sentiment = sentiment;
          analysis.score = score.scoreAnalysis(analysis.tone);
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
      analyzeInput(encodeURI(text.article))
        .then((tone) => {
          analysis.tone = tone;
          aylienHelpers.sentimentAnalysis(text.article)
            .then((sentiment) => {
              analysis.sentiment = sentiment;
              analysis.score = score.scoreAnalysis(analysis.tone);
              !!req.session.user ? article.store(analysis, req.session.user, req.body.data, true) : null;
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
  res.send({ downVoteCount: 0, upVoteCount: 0, });
});

app.post('/api/vote', (req, res) => {
  // Expects an article id and user id, either in req.body or as a param.
  // Update the database:
    // Decrement / increment the vote count for the article.
    // Set the user's vote status for the article (downvote / upvote / neither).
  // Return vote count for the article.
  res.send({ downVoteCount: 0, upVoteCount: 0, });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

