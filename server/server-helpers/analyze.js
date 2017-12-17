const trust = require('./algorithm.js');
const analyzeTone = require('./toneAnalyzer');
const aylienHelpers = require('./aylienHelpers');
const article = require('../db/controllers/articleController.js');

const analyzeText = (text, res) => {
  const analysis = {};

  analyzeTone(text.article)
    .then((tone) => {
      analysis.tone = JSON.parse(tone);
      aylienHelpers.sentimentAnalysis(text.article)
        .then((sentiment) => {
          analysis.sentiment = sentiment;
          analysis.score = trust.trustAnalysis(analysis.tone);
          res.send(analysis);
        })
        .catch((err) => {
          res.send('Error analyzing sentiment:', err);
        });
    })
    .catch((err) => {
      res.send('Error analyzing tone:', err);
    });
};

const analyzeUrl = (url, res) => {
  aylienHelpers.extractArticle(url)
    .then((text) => {
      analyzeText(text, res);
    })
    .catch((err) => {
      console.log('Error extracting article:', err);
    });
};

module.exports.analyzeText = analyzeText;
module.exports.analyzeUrl = analyzeUrl;
