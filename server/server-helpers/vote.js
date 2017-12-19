const vote = require('../db/controllers/voteController.js');
const user = require('../db/controllers/userController.js');

const submitVote = (session, article, upvote, cb) => {
  user.get({ body: { username: session } }, (user) => {
    vote.makeVote(user.dataValues.id, article, upvote, (article) => {
      vote.getVotes(article[1][0].dataValues.articleId)
        .then((votes) => {
          cb(votes);
        })
    });
  });
}

const retrieveVotes = (article, cb) => {
  vote.getVotes(article)
    .then((votes) => {
      cb(votes);
    })
    .catch((err) => {
      console.log('Error retrieving votes: ', err);
    });
}

module.exports.submitVote = submitVote;
module.exports.retrieveVotes = retrieveVotes;