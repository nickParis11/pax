const express = require('express');
const bodyParser = require('body-parser');
const analyzeInput = require('./toneAnalyzer.js');
const aylienHelpers = require('./aylienHelpers.js');
const score = require('./algorithm.js');
// const db = require('./db/db-index.js');

const app = express();

const PORT = 3000;


app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/analyze', (req, res) => {
  analyzeInput(req.body.data, (err, analysis) => {
    if (err) {
      res.send(err);
    } else {
      console.log(score.scoreAnalysis(JSON.parse(analysis)));
      res.send(analysis);
    }
  });
});

app.post('/api/extract', (req, res) => {
  aylienHelpers.extractArticle(req.body.data, (err, article) => {
    if (err) {
      res.send(err);
    } else {
      res.send(article);
    }
  });
});

app.post('/api/sentiment', (req, res) => {
  aylienHelpers.sentimentAnalysis(req.body.data, (err, sentiment) => {
    if (err) {
      res.send(err);
    } else {
      res.send(sentiment);
    }
  });
});

app.post('/api/vote', (req, res) => {
  res.send(null);
});

app.post('/login', (req, res) => {
  res.send(null);
});

app.post('/signup', (req, res) => {
  res.send(null);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

