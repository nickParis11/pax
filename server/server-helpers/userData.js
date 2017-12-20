const userController = require('../db/controllers/userController');

const getUpvoteAverage = (user, cb) => {
  userController.upvoteAverages(user, cb);
};

module.exports.getUpvoteAverage = getUpvoteAverage;
