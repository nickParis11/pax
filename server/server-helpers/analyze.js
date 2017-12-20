const trust = require('./algorithm.js');
const analyzeTone = require('./toneAnalyzer');
const aylienHelpers = require('./aylienHelpers');
const article = require('../db/controllers/articleController.js');
const vote = require('../db/controllers/voteController.js');

const analyzeText = (text, title, summary, session, res, input, bool) => {
  const analysis = {
    title: title,
    summary: summary,
  };

  analyzeTone(text)
    .then((tone) => {
      analysis.tone = JSON.parse(tone);
      aylienHelpers.sentimentAnalysis(text)
        .then((sentiment) => {
          analysis.sentiment = sentiment;
          analysis.score = trust.trustAnalysis(analysis.tone);
          if (session !== undefined) {
            article.store(analysis, session, input, bool, (response) => {
              analysis.id = response.dataValues.id;
              vote.store(session, analysis.id);
              res.send(analysis);
            });
          } else {
            res.send(analysis);
          }
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
      aylienHelpers.summary(link)
        .then((summary) => {
          analyzeText(text.article, text.title, summary.sentences, session, res, link, true);
        })
        .catch((err) => {
          console.log('Error getting summary', err);
        });
    })
    .catch((err) => {
      console.log('Error extracting article:', err);
    });
};

module.exports.analyzeText = analyzeText;
module.exports.analyzeUrl = analyzeUrl;
