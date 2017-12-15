const db = require('../db-index.js');

module.exports = {
  user: {
    get: (req, res) => {
      db.User.find({ where: { username: req.body.username } })
        .then((user) => {
          res.send(user);
        });
    },
    post: (req, cb) => {
      db.User.findOrCreate({ where: { username: req } })
        .then((user) => {
          cb(null, user);
        });
    },
  },
};
