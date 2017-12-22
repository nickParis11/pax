const trust = require('./algorithm.js');
const analyzeTone = require('./toneAnalyzer');
const aylienHelpers = require('./aylienHelpers');
const article = require('../db/controllers/articleController.js');
const vote = require('../db/controllers/voteController.js');

const analyzeText = (text, title, summary, session, res, input, bool) => {
  const analysis = {
    title,
    summary,
  };

  analyzeTone(text)
    .then((tone) => {
      analysis.tone = JSON.parse(tone);
      return aylienHelpers.sentimentAnalysis(text)
    })
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
        return article.getID(input)
        .then((articleID) => {
          analysis.id = articleID.dataValues.id;
          res.send(analysis);
        })
      }
    })
    .catch((err) => {
      res.status(500);
      res.write('Error analyzing tone:', err);
    });
};

const analyzeUrl = (link, session, res) => {
  const text = {};
  aylienHelpers.extractArticle(link)
    .then((extracted) => {
      text.article = extracted.article;
      text.title = extracted.title;
      return aylienHelpers.summary(link)
    })
    .then((summary) => {
      analyzeText(text.article, text.title, summary.sentences, session, res, link, true);
    })
    .catch((err) => {
      res.status(500);
      res.write('Error extracting article:', err);
    });
};

module.exports.analyzeText = analyzeText;
module.exports.analyzeUrl = analyzeUrl;
