const pp = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const user = require('../db/controllers/userController.js');
require('dotenv').config();

const passport = pp.use(new FacebookStrategy(
  {
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: process.env.FB_LOCAL_DIRECT || 'http://ec2-54-163-98-154.compute-1.amazonaws.com/auth/facebook/callback',
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    req.session.user = profile.id;
    user.post({ body: profile.id }, (err, userRes) => {
      done(err, userRes);
    });
  },
));

pp.serializeUser((serializedUser, done) => {
  done(null, serializedUser);
});

pp.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports.passport = passport;