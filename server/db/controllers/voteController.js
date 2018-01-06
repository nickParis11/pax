const db = require('../index.js');
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
          console.error('Error storing article in votes table:', err);
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
                console.error('Error removing upvote:', err);
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
                console.error('Error downvoting article:', err);
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
                console.error('Error removing downvote:', err);
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
              const response = Object.assign(voteCounts);
              response.upvote = userVoteData.dataValues.upvote;
              response.downvote = userVoteData.dataValues.downvote;
              return response;
            });
        } else { // User is undefined, and therefore unregistered.
          // Not currently used, but in place for when non-registered-user routing is clarified.
          const response = Object.assign(voteCounts);
          response.upvote = false;
          response.downvote = false;
          return response;
        }
      })
      .catch((err) => {
        console.log('Error getting voting data:', err);
      });
  },
  getAllVotesBy: (user, cb) => {
    db.Vote.findAll({ where: { userId: user } })
      .then((allVotes) => {
        cb(null, allVotes);
      })
      .catch((err) => {
        cb(`Error getting all votes by user: ${err}`);
      });
  },
};
