const textAnalyzerController = require('../controllers').textAnalyzer;
const usersController = require('../controllers').users

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      message: 'welcome to the textAnalyzer API!',
    })
  });
  app.post('/api/textAnalyzer', textAnalyzerController.create);
  app.get('/api/textAnalyzer', textAnalyzerController.list);
  app.post('/api/textAnalyzer/:userId/items', usersController.create)
};