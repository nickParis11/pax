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
    extractArticle(req.body.data, (err, article) => {
      if (err) {
        res.send(err)
      } else {
        analyzeInput(article.article, (err, response) => {
          if (err) {
            res.send(err);
          } else {
            res.send(response);
          }
        });
      }
    });
  } else {
    analyzeInput(req.body.data, (err, response) => {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
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
