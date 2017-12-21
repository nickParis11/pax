const userController = require('../db/controllers/userController');
const voteController = require('../db/controllers/voteController');

const getUpvoteAverage = (user, cb) => {
  console.log('================> USER', user);
  userController.upvoteAverages(user, cb);
};

const getArticlesByUser = (user) => {
  const articles = [];
  userController.get(user, (found) => {
    vote.getAllVotesBy(found.id, (allVotes) => {
      // for each item in allVotes
        // get the article id
        // look up that article id in the articles table
        // push article to articles array
      // return the articles array
    });
  });
};

module.exports.getUpvoteAverage = getUpvoteAverage;
