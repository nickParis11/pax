const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const googleLogin = require('./server-helpers/googleLogin.js');
const router = require('./routes.js');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use('/', router);
app.use(googleLogin.passport.initialize());
app.use(googleLogin.passport.session());

app.get(
  '/auth/google',
  googleLogin.passport.authenticate('google', { scope: ['profile', 'email'] }),
);

app.get(
  '/auth/google/callback',
  googleLogin.passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  },
);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
