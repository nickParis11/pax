const express = require('express');
const bodyParser = require('body-parser');
const analyzeInput = require('./toneAnalyzer.js');
const extractArticle = require('./aylienHelpers.js');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/analyze', (req, res) => {
  analyzeInput(req.body.data, (analyzeErr, analysis) => {
    if (analyzeErr) {
      res.send(analyzeErr);
    } else {
      res.send(analysis);
    }
  });
});

app.post('/api/extract', (req, res) => {
  extractArticle(req.body.url, (err, article) => {
    if (err) {
      res.send(err);
    } else {
      res.send(article);
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
