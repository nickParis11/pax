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
  if (req.body.url) {
    extractArticle(req.body.data, (extractErr, article) => {
      if (extractErr) {
        res.send(extractErr);
      } else {
        analyzeInput(article.article, (analyzeErr, analysis) => {
          if (analyzeErr) {
            res.send(analyzeErr);
          } else {
            res.send(analysis);
          }
        });
      }
    });
  } else {
    analyzeInput(req.body.data, (analyzeErr, analysis) => {
      if (analyzeErr) {
        res.send(analyzeErr);
      } else {
        res.send(analysis);
      }
    });
  }
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
