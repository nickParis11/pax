const db = require('../db-index.js');

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
  upvoteAverages: (user) => { // add cb
    db.Vote.findAll({ where: { userId: user, upvote: true } }) // need to pass in user Id
      .then((upvotedArticleIDs) => { // an array of article ids
        // declare number of articles, tone sum
        const articleNum = upvotedArticleIDs.length;
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
        console.log(articleNum);
        console.log(toneSums);
        upvotedArticleIDs.forEach((articleID) => {
          // query for said articles
          db.Article.findOne({
            where: {
              id: articleID,
            },
          }).then((article) => { // add article's tone scores to respective tone sum
            console.log('article', article);
            // for (let tone in article) {
            // }
          });
        });
      }).catch((err) => {
        console.log('Error getting article tone averages', err);
      });
    // convert the sum to averages
    // return averages in an appropriate format
  },
};
