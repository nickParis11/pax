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
      db.Vote.findOne({ where: { userId: user, articleId: article, upvote: true } })
        .then((found) => {
          if (found === null) {
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
            db.Vote.update({ voted: false, upvote: false, downvote: false},
              { where: { userId: user, articleId: article },
                returning: true })
              .then((res) => {
                cb(res);
              })
              .catch((err) => {
                console.log('Error removing upvote:', err);
              });
          }
        })
    } else {
      db.Vote.findOne({ where: { userId: user, articleId: article, downvote: true } })
        .then((found) => {
          if (found === null) {
            db.Vote.update({ voted: true, upvote: false, downvote: true },
              { where: { userId: user, articleId: article },
                returning: true })
              .then((res) => {
                cb(res);
              })
              .catch((err) => {
                console.log('Error downvoting article:', err);
              });
          } else {
            db.Vote.update({ voted: false, upvote: false, downvote: false},
              { where: { userId: user, articleId: article },
                returning: true })
              .then((res) => {
                cb(res);
              })
              .catch((err) => {
                console.log('Error removing downvote:', err);
              });
          }
        })
    }
  },
  getVotes: (article) => {
    return db.Vote.findAll({ where: { articleId: article, upvote: true } })
      .then((up) => {
        return up.length;
      })
      .then((upvotes) => {
        return db.Vote.findAll({ where: { articleId: article, downvote: true } })
          .then((down) => {
            return { downVoteCount: down.length, upVoteCount: upvotes };
          })
          .catch((err) => {
            console.log('Error getting downvotes:', err)
          })
      })
      .catch((err) => {
        console.log('Error getting upvotes:', err)
      });
  },
};
