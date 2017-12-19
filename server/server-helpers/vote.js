const vote = require('../db/controllers/voteController.js');
const user = require('../db/controllers/userController.js');

const submitVote = (session, article, upvote) => {
  user.get({ body: { username: session } }, (user) => {
    vote.makeVote(user.dataValues.id, article, upvote, (article) => {
      console.log('=========> SUBMIT VOTE ARTICLE VALUE:', article[1])
      // vote.getVotes(article);
    });
  });
}

module.exports.submitVote = submitVote;
