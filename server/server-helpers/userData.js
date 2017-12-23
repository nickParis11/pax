const userController = require('../db/controllers/userController');
const voteController = require('../db/controllers/voteController');
const articleController = require('../db/controllers/articleController');

const getUpvoteAverage = (user, cb) => {
  userController.upvoteAverages(user, cb);
};

const getArticlesByUser = (username, cb) => {
  const response = {}
  const articleIds = [];

  userController.get({ body: { username } }, (found) => {
    voteController.getAllVotesBy(found.id, (allVotes) => {
      response.allVotes = allVotes;
      allVotes.forEach((article) => {
        articleIds.push(articleController.get(article.dataValues.articleId));
      });
      Promise.all(articleIds)
        .then((articles) => {
          response.articles = articles;
          cb(response);
        })
        .catch((err) => {
          res.send(500);
          res.write('Error getting all articles:', err);
        });
    });
  });
};

module.exports.getUpvoteAverage = getUpvoteAverage;
module.exports.getArticlesByUser = getArticlesByUser;
