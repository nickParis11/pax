const userController = require('../db/controllers/userController');
const voteController = require('../db/controllers/voteController');
const articleController = require('../db/controllers/articleController');

const getUpvoteAverage = (user, cb) => {
  userController.upvoteAverages(user, cb);
};

const getArticlesByUser = (username, cb) => {
  const articleIds = [];
  const voteInfo = {};

  userController.get({ body: { username } }, (found) => {
    voteController.getAllVotesBy(found.id, (getVotesErr, allVotes) => {
      if (getVotesErr) {
        cb(getVotesErr);
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
            const articlesResponse = Array.from(articles);
            articlesResponse.forEach((item, index) => {
              articlesResponse[index].dataValues.downvote = voteInfo[item.dataValues.id].downvote;
              articlesResponse[index].dataValues.upvote = voteInfo[item.dataValues.id].upvote;
              articlesResponse[index].dataValues.voted = voteInfo[item.dataValues.id].voted;
            });
            articlesResponse.sort((a, b) => {
              return b.dataValues.createdAt - a.dataValues.createdAt;
            });
            cb(null, articlesResponse);
          })
          .catch((err) => {
            console.error(`Error getting all articles: ${err}`);
          });
      }
    });
  });
};

module.exports.getUpvoteAverage = getUpvoteAverage;
module.exports.getArticlesByUser = getArticlesByUser;
