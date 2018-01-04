const db = require('../index.js');
const Promise = require('bluebird');

module.exports = {
  get: (req, cb) => {
    db.User.find({ where: { username: req.body.username } })
      .then((user) => {
        cb(user);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  post: (req, cb) => {
    db.User.findOrCreate({ where: { username: req.body, sessionId: req.body } })
      .then((user) => {
        cb(null, user);
      });
  },
  upvoteAverages: (username, cb) => {
    module.exports.get({ body: { username } }, (userData) => {
      db.Vote.findAll({ where: { userId: userData.dataValues.id, upvote: true } })
        .then((upvotedArticles) => {
          const articleNum = upvotedArticles.length;
          const toneSums = {
            anger: 0,
            disgust: 0,
            fear: 0,
            joy: 0,
            sadness: 0,
            analytical: 0,
            confident: 0,
            tentative: 0,
            openness: 0,
            conscientiousness: 0,
            extraversion: 0,
            agreeableness: 0,
            emotional_range: 0,
          };

          return Promise.all(upvotedArticles.map((articleId) => {
            return db.Article.findOne({
              where: {
                id: articleId.dataValues.id,
              },
            }).then((article) => { // Add article's tone scores to respective tone sum
              const toneList = article.dataValues;
              Object.keys(toneList).forEach((tone) => {
                const hasTone = Object.prototype.hasOwnProperty.call(toneSums, tone);
                if (hasTone) {
                  toneSums[tone] += toneList[tone];
                }
              });
              return true;
            });
          })).then(() => {
            if (articleNum === 0) {
              return cb(toneSums);
            } else {
              Object.keys(toneSums).forEach((tone) => {
                toneSums[tone] = Math.floor(toneSums[tone] / articleNum);
              });
              return cb(toneSums);
            }
          });
        }).catch((err) => {
          console.log('Error getting article tone averages', err);
        });
    });
  },
};
