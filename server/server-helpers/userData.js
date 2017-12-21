const userController = require('../db/controllers/userController');
const voteController = require('../db/controllers/voteController');
const articleController = require('../db/controllers/articleController');

const getUpvoteAverage = (user, cb) => {
  console.log('================> INSIDE USER DATA:', user);
  userController.upvoteAverages(user, cb);
};

const getArticlesByUser = (username, cb) => {
  const articleIds = [];

  userController.get({ body: { username } }, (found) => {
    voteController.getAllVotesBy(found.id, (allVotes) => {
      allVotes.forEach((article) => {
        articleIds.push(articleController.get(article.dataValues.articleId));
      });
      Promise.all(articleIds)
        .then((articles) => {
          cb(articles);
        })
        .catch((err) => {
          console.log('Error getting all articles:', err);
        });
    });
  });
};

module.exports.getUpvoteAverage = getUpvoteAverage;
module.exports.getArticlesByUser = getArticlesByUser;
