const trust = require('./algorithm.js');
const analyzeTone = require('./toneAnalyzer');
const aylienHelpers = require('./aylienHelpers');
const article = require('../db/controllers/articleController.js');

const analyzeText = (text, session, res, input, bool) => {
  const analysis = {};

  analyzeTone(text)
    .then((tone) => {
      analysis.tone = JSON.parse(tone);
      aylienHelpers.sentimentAnalysis(text)
        .then((sentiment) => {
          analysis.sentiment = sentiment;
          analysis.score = trust.trustAnalysis(analysis.tone);
          if (session !== undefined) {
            article.store(analysis, session, input, bool);
          }
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

const analyzeUrl = (link, session, res) => {
  aylienHelpers.extractArticle(link)
    .then((text) => {
      analyzeText(text.article, session, res, link, true);
    })
    .catch((err) => {
      console.log('Error extracting article:', err);
    });
};

module.exports.analyzeText = analyzeText;
module.exports.analyzeUrl = analyzeUrl;
