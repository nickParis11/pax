const vote = require('../db/controllers/voteController.js');
const user = require('../db/controllers/userController.js');

const submitVote = (session, article, upvote) => {
  user.get({ body: { username: session } }, (user) => {
    vote.makeVote(user.dataValues.id, article, upvote, (article) => {
      vote.getVotes(article[1][0].dataValues.articleId);
    });
  });
}

module.exports.submitVote = submitVote;
