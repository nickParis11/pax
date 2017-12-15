const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const score = require('./algorithm.js');
const analyzeInput = require('./toneAnalyzer');
const aylienHelpers = require('./aylienHelpers');
const userController = require('./db/controllers/userController.js');

require('dotenv').config();

passport.use(new FacebookStrategy(
  {
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback' || 'http://ec2-54-163-98-154.compute-1.amazonaws.com//auth/facebook/callback',
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    req.session.user = profile.id;
    userController.user.post({ body: profile.id }, (err, user) => { // send in sessionID
      return done(err, user);
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
  res.send(req.session.user ? true : false);
});

app.post('/api/analyze', (req, res) => {
  const analysis = {};
  analyzeInput(req.body.data, (err, tone) => {
    if (err) {
      console.log('Error getting tone:', err);
    } else {
      analysis.tone = JSON.parse(tone);
      aylienHelpers.sentimentAnalysis(req.body.data, (error, sentiment) => {
        if (error) {
          console.log('Error getting sentiment:', error);
        } else {
          analysis.sentiment = sentiment;
          analysis.score = score.scoreAnalysis(JSON.parse(tone));
          res.send(analysis);
        }
      });
    }
  });
});

app.post('/api/extract', (req, res) => {
  const analysis = {};
  aylienHelpers.extractArticle(req.body.data, (err, article) => {
    if (err) {
      console.log('Error extracting article: ', err);
    } else {
      analyzeInput(article.article, (error, tone) => {
        if (error) {
          console.log('Error getting tone:', error);
        } else {
          analysis.tone = JSON.parse(tone);
          aylienHelpers.sentimentAnalysis(article.article, (er, sentiment) => {
            if (er) {
              console.log('Error getting sentiment:', er);
            } else {
              analysis.sentiment = sentiment;
              analysis.score = score.scoreAnalysis(JSON.parse(tone));
              res.send(analysis);
            }
          });
        }
      });
    }
  });
});

app.post('/api/vote', (req, res) => {
  res.send(null);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

