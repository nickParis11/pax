const db = require('../db-index.js');
const user = require('./userController.js');

module.exports = {
  store: (username, article) => {
    user.get({ body: { username } }, (user) => {
      db.Vote.findOrCreate({
        where: {
          userId: user.id,
          articleId: article,
        },
        defaults: {
          voted: false,
          upvote: false,
          downvote: false,
        },
      })
      .catch((err) => {
        console.log('Error storing article in votes table:', err);
      });
    });
  },
  makeVote: (user, article, upvote, cb) => {
    if (upvote) {
      db.Vote.update({ voted: true, upvote: true, downvote: false },
        { where: { userId: user, articleId: article },
          returning: true })
        .then((res) => {
          cb(res);
        })
        .catch((err) => {
          console.log('Error upvoting article:', err);
        });
    } else {
      db.Vote.update({ voted: true, upvote: false, downvote: true },
        { where: { userId: user, articleId: article } })
        .catch((err) => {
          console.log('Error downvoting article:', err);
        });
    }
  },
  getVotes: (article) => {
    db.Vote.findAll({ where: { articleId: article } })
      .then((res) => {
        console.log('============> RESPONSE FROM GETVOTES', res);
      })
      .catch((err) => {
        console.log('Error getting votes for article:', err)
      });
    // for each occurence
      // if upvote is true
        // upvote + 1
      // else if downvote is true
        // downvote + 1

    // return votes
  },
};
