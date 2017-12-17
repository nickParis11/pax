const db = require('../db-index.js');

module.exports = {
  get: (req, cb) => {
    db.User.find({ where: { username: req.body.username } })
      .then((user) => {
        cb(user);
      });
  },
  post: (req, cb) => {
    db.User.findOrCreate({ where: { username: req.body, sessionId: req.body } })
      .then((user) => {
        cb(null, user);
      });
  },
};
