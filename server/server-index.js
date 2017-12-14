const express = require('express');
const bodyParser = require('body-parser');
const analyzeInput = require('./toneAnalyzer');
const aylienHelpers = require('./aylienHelpers');
const score = require('./algorithm.js');
// const db = require('./db/db-index.js');

const app = express();

const PORT = 3000;


app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
// app.post('/api/sentiment', (req, res) => {
//   aylienHelpers.sentimentAnalysis(req.body.data, (err, sentiment) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(sentiment);
//     }
//   });
// });

app.post('/api/vote', (req, res) => {
  res.send(null);
});

app.post('/login', (req, res) => {
  console.log(req.body);
  // if user doesn't exists
  // respond to sign up
  // if password doesn't match
  // respond wrong password
  // otherwise
  // start a session for user
  // respond that user is logged in
  res.send(null);
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  // if user already exists
  // respond that username is taken
  // otherwise
  // hash password
  // add user and password to database
  // start a session for the user
  // respond that the user is logged in
  res.send(null);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

