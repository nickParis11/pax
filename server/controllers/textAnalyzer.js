const textAnalyzer = require('../db/models').textAnalyzer;

module.exports = {
  create(req,res) {
    return textAnalyzer
      .create({
        title: req.body.title,
      })
      .then(textAnalyzer => res.status(201).send(textAnalyzer))
      .catch(error => res.status(400).send(error));
  },
  list(req,res) {
    return textAnalyzer
      .all()
      .then(textAnalyzer => res.status(200).send(textAnalyzer))
      .catch(error => res.status(400).send(error));
  }
};