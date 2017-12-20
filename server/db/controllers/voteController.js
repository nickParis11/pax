const db = require('../db-index.js');
const userController = require('./userController.js');

module.exports = {
  store: (username, article) => {
    userController.get({ body: { username } }, (user) => {
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
            db.Vote.update(
              { voted: true, upvote: true, downvote: false },
              {
                where: { userId: user, articleId: article },
                returning: true,
              },
            )
              .then((res) => {
                cb(res);
              })
              .catch((err) => {
                console.log('Error upvoting article:', err);
              });
          } else {
            db.Vote.update(
              { voted: false, upvote: false, downvote: false },
              {
                where: { userId: user, articleId: article },
                returning: true,
              },
            )
              .then((res) => {
                cb(res);
              })
              .catch((err) => {
                console.log('Error removing upvote:', err);
              });
          }
        });
    } else {
      db.Vote.findOne({ where: { userId: user, articleId: article, downvote: true } })
        .then((found) => {
          if (found === null) {
            db.Vote.update(
              { voted: true, upvote: false, downvote: true },
              {
                where: { userId: user, articleId: article },
                returning: true,
              },
            )
              .then((res) => {
                cb(res);
              })
              .catch((err) => {
                console.log('Error downvoting article:', err);
              });
          } else {
            db.Vote.update(
              { voted: false, upvote: false, downvote: false },
              {
                where: { userId: user, articleId: article },
                returning: true,
              },
            )
              .then((res) => {
                cb(res);
              })
              .catch((err) => {
                console.log('Error removing downvote:', err);
              });
          }
        });
    }
  },
  getVotes: (article, user) => {
    return db.Vote.findAll({ where: { articleId: article, upvote: true } })
      .then((articleUpvotes) => {
        return articleUpvotes.length;
      })
      .then((upvoteCount) => {
        return db.Vote.findAll({ where: { articleId: article, downvote: true } })
          .then((articleDownvotes) => {
            return { downVoteCount: articleDownvotes.length, upVoteCount: upvoteCount };
          })
          .catch((err) => {
            console.error('Error getting downvotes:', err);
          });
      })
      .then((voteCounts) => {
        if (user) {
          return db.Vote.findOne({ where: { articleId: article, userId: user } })
            .then((userVoteData) => {
              voteCounts.upvote = userVoteData.dataValues.upvote;
              voteCounts.downvote = userVoteData.dataValues.downvote;
              return voteCounts;
            });
        } else { // User is undefined, and therefore unregistered.
          // Not currently used, but in place for when non-registered-user routing is clarified.
          voteCounts.upvote = false;
          voteCounts.downvote = false;
          return voteCounts;
        }
      })
      .catch((err) => {
        console.error('Error getting voting data:', err);
      });
  },
};
