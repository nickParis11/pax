const db = require('../db-index.js');

module.exports = {
  store: (analysis) => {
    db.Article.findOrCreate({ where: {} })
      .then((article) => {
        res.send(article);
      });
  },
};
