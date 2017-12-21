const vote = require('../db/controllers/voteController.js');
const userController = require('../db/controllers/userController.js');

const submitVote = (session, article, upvote, cb) => {
  userController.get({ body: { username: session } }, (userEntry) => {
    vote.makeVote(userEntry.dataValues.id, article, upvote, (articleEntry) => {
      vote.getVotes(articleEntry[1][0].dataValues.articleId, userEntry.dataValues.id)
        .then((votes) => {
          cb(votes);
        });
    });
  });
};

const retrieveVotes = (article, username, cb) => {
  userController.get({ body: { username } }, (userEntry) => {
    vote.getVotes(article, userEntry.dataValues.id)
      .then((votes) => {
        cb(votes);
      })
      .catch((err) => {
        console.log('Error retrieving votes: ', err);
      });
  });
};

module.exports.submitVote = submitVote;
module.exports.retrieveVotes = retrieveVotes;
