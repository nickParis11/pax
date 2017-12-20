const vote = require('../db/controllers/voteController.js');
const userController = require('../db/controllers/userController.js');

const submitVote = (session, article, upvote, cb) => {
  userController.get({ body: { username: session } }, (user) => {
    vote.makeVote(user.dataValues.id, article, upvote, (articleEntry) => {
      vote.getVotes(articleEntry[1][0].dataValues.articleId)
        .then((votes) => {
          cb(votes);
        });
    });
  });
};

const retrieveVotes = (article, user, cb) => {
  vote.getVotes(article, user)
    .then((votes) => {
      console.log(votes);
      cb(votes);
    })
    .catch((err) => {
      console.log('Error retrieving votes: ', err);
    });
};

module.exports.submitVote = submitVote;
module.exports.retrieveVotes = retrieveVotes;
