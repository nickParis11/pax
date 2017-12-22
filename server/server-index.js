// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const googleLogin = require('./server-helpers/googleLogin.js');
// const analyze = require('./server-helpers/analyze.js');
// const vote = require('./server-helpers/vote.js');
// const userDataGetter = require('./server-helpers/userData');

// const app = express();
// const PORT = 3000;

// app.use(express.static(`${__dirname}/../client/dist/`));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
// }));
// app.use(googleLogin.passport.initialize());
// app.use(googleLogin.passport.session());

// app.get(
//   '/auth/google',
//   googleLogin.passport.authenticate('google', { scope: ['profile', 'email'] }),
// );

// app.get(
//   '/auth/google/callback',
//   googleLogin.passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   },
// );

// app.get('/api/getUser', (req, res) => {
//   res.send(req.session.user);
// });

// app.get('/api/logoutUser', (req, res) => {
//   req.session.user = null;
//   res.send();
// });

// app.post('/api/analyze', (req, res) => {
//   analyze.analyzeText(req.body.data, 'Your Input', req.body.data, req.session.user, res, req.body.data, false);
// });

// app.post('/api/extract', (req, res) => {
//   analyze.analyzeUrl(req.body.data, req.session.user, res);
// });
// app.get('/api/vote/:id', (req, res) => {
//   // Params is a string, undefined will be a string, not a native value.
//   if (req.params.id !== 'undefined') {
//     vote.retrieveVotes(req.params.id, req.session.user, (votes) => {
//       res.send(votes);
//     });
//   } else {
//     // An unregistered user is looking up an article that does not exist in the database.
//     // Therefore, vote counts should be zero.
//     res.send({
//       downvote: false,
//       downVoteCount: 0,
//       upvote: false,
//       upVoteCount: 0,
//     });
//   }
// });

// app.post('/api/vote', (req, res) => {
//   vote.submitVote(req.session.user, req.body.article_id, req.body.upvote, (votes) => {
//     res.send(votes);
//   });
// });

// // Get average score of tones user upvoted
// app.get('/api/user/upvoteAverages', (req, res) => {
//   console.log('req.session', req.session.user);
//   if (!!req.session.user) {
//     userDataGetter.getUpvoteAverage(req.session.user, (toneAverages) => {
//       res.send(toneAverages);
//     });
//   } else {
//     res.send({
//       anger: 0,
//       disgust: 0,
//       fear: 0,
//       joy: 0,
//       sadness: 0,
//       analytical: 0,
//       confident: 0,
//       tentative: 0,
//       openness: 0,
//       conscientiousness: 0,
//       extraversion: 0,
//       agreeableness: 0,
//       emotional_range: 0,
//     });
//   }
// });

// app.get('/api/user/allArticles', (req, res) => {
//   userDataGetter.getArticlesByUser(req.session.user, (articles) => {
//     res.send(articles);
//   });
// });

<<<<<<< HEAD
app.get('/api/userarticles', (req, res) => {
  res.send('retrieved from server @ /api/userarticles ');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

=======
// app.listen(PORT, () => {
//   console.log(`Listening on ${PORT}`);
// });
>>>>>>> Fix promise pyramid
