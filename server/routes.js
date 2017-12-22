const router = require('express').Router();
const analyze = require('./server-helpers/analyze.js');
const vote = require('./server-helpers/vote.js');

router.get('/api/getUser', (req, res) => {
  res.send(req.session.user);
});

router.get('/api/logoutUser', (req, res) => {
  req.session.user = null;
  res.send();
});

router.post('/api/analyze', analyze.analyzeText);

router.post('/api/extract', (req, res) => {
  analyze.analyzeUrl(req.body.data, req.session.user, res)
});

router.get('/api/vote/:id', (req, res) => {
  // Params is a string, undefined will be a string, not a native value.
  if (req.params.id !== 'undefined') {
    vote.retrieveVotes(req.params.id, req.session.user, res);
  } else {
    // An unregistered user is looking up an article that does not exist in the database.
    // Therefore, vote counts should be zero.
    res.send({
      downvote: false,
      downVoteCount: 0,
      upvote: false,
      upVoteCount: 0,
    });
  }
});

router.post('/api/vote', (req, res) => {
  vote.submitVote(req.session.user, req.body.article_id, req.body.upvote, (votes) => {
    res.send(votes);
  });
});

// Get average score of tones user upvoted
router.get('/api/user/upvoteAverages', (req, res) => {
  // console.log('req.session', req.session);
  if (req.session.user) {
    userDataGetter.getUpvoteAverage(req.session.user, (toneAverages) => {
      res.send(toneAverages);
    });
  } else {
    res.send(null);
  }
});

router.get('/api/user/allArticles', (req, res) => {
  userDataGetter.getArticlesByUser(req.session.user, (articles) => {
    res.send(articles);
  });
});

module.exports = router;
