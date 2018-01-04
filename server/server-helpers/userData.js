const userController = require('../db/controllers/userController');
const voteController = require('../db/controllers/voteController');
const articleController = require('../db/controllers/articleController');

const getUpvoteAverage = (user, cb) => {
  userController.upvoteAverages(user, cb);
};

const getArticlesByUser = (username, cb) => {
  const articleIds = [];
  let voteInfo = {};

  userController.get({ body: { username } }, (found) => {
    voteController.getAllVotesBy(found.id, (err, allVotes) => {
      if (err) {
        cb(err);
      } else {
        allVotes.forEach((vote) => {
          articleIds.push(articleController.get(vote.dataValues.articleId));
          voteInfo[vote.dataValues.articleId] = {
            downvote: vote.dataValues.downvote,
            upvote: vote.dataValues.upvote,
            voted: vote.dataValues.voted,
          };
        });
        Promise.all(articleIds)
          .then((articles) => {
            articles.forEach((item, index) => {
              articles[index].dataValues.downvote = voteInfo[item.dataValues.id].downvote;
              articles[index].dataValues.upvote = voteInfo[item.dataValues.id].upvote;
              articles[index].dataValues.voted = voteInfo[item.dataValues.id].voted;
            });
            articles.sort((a, b) => {
              return b.dataValues.createdAt - a.dataValues.createdAt
            });
            cb(null, articles);
          })
          .catch((err) => {
            console.log(`Error getting all articles: ${err}`);
          });
      }
    });
  });
};

module.exports.getUpvoteAverage = getUpvoteAverage;
module.exports.getArticlesByUser = getArticlesByUser;
