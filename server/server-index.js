const express = require('express');
const bodyParser = require('body-parser');
const analyzeInput = require('./toneAnalyzer.js');
const aylienHelpers = require('./aylienHelpers.js');


const app = express();

const PORT = 3000;



app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/admin/build/npm', (req, res) => {
	const hook = req.body;
	//if ( hook.action === 'closed' && hook.merged) {
		sh.exec('echo '+JSON.stringify(hook)+' > merged-pull-request/PR'+hook.hook.id/*hook.mergedat || 5*/);
	//}
	console.log('extract req = ',req.body.zen)

  console.log('testing git hook @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

  sh.echo('hello world from /admin/build/npm server-index ');

});

app.post('/api/analyze', (req, res) => {
  analyzeInput(req.body.data, (err, analysis) => {
    if (err) {
      res.send(err);
    } else {
      res.send(analysis);
    }
  });
});

app.post('/api/extract', (req, res) => {
  aylienHelpers.extractArticle(req.body.data, (err, article) => {
    if (err) {
      res.send(err);
    } else {
      res.send(article);
    }
  });
});

app.post('/api/sentiment', (req, res) => {
  aylienHelpers.sentimentAnalysis(req.body.data, (err, sentiment) => {
    if (err) {
      res.send(err);
    } else {
      res.send(sentiment);
    }
  });
});

app.post('/api/vote', (req, res) => {
  res.send(null);
});

app.post('/login', (req, res) => {
  res.send(null);
});

app.post('/signup', (req, res) => {
  res.send(null);
});

require('./routes')(app);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

