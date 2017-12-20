const pass = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require('../db/controllers/userController.js');
require('dotenv').config();

const passport = pass.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_LOCAL_DIRECT || 'http://ec2-54-163-98-154.compute-1.amazonaws.com/auth/google/callback',
    passReqToCallback: true,
  },
  ((req, accessToken, refreshToken, profile, cb) => {
  // change from profile.id
    req.session.user = profile.emails[0].value;
    user.post({ body: profile.emails[0].value }, (err, userRes) => {
      cb(err, userRes);
    });
  }),
));

pass.serializeUser((serializedUser, done) => {
  done(null, serializedUser);
});

pass.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports.passport = passport;
