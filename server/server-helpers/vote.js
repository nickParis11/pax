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

const retrieveVotes = (article, username, res) => {
  if (username) {
    userController.get({ body: { username } }, (userEntry) => {
      vote.getVotes(article, userEntry.dataValues.id)
        .then((votes) => {
          res.send(votes);
        })
        .catch((err) => {
          res.status(500);
          res.render('Error retrieving votes: ', err);
        });
    });
  } else {
    vote.getVotes(article, null)
      .then((votes) => {
        res.send(votes);
      })
      .catch((err) => {
        res.status(500);
        res.render('Error retrieving votes: ', err);
      });
  }
};

module.exports.submitVote = submitVote;
module.exports.retrieveVotes = retrieveVotes;
