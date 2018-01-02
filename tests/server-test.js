const expect = require('chai');
const chaiHTTP = require('chai-http');

const app = require('../server/index.js');
const db = require('../server/db/index.js');
const user = require('../server/db/controllers/userController.js');
const article = require('../server/db/controllers/articleController.js');
const vote = require('../server/db/controllers/voteController.js');

describe('Route testing', () => {
  chai.use(chaiHTTP);
  const server;

  before(() => {
    server = app.listen(1337, () => {
      console.log('Testing is listening on port 1337');
    });
  });

  after(() => {
    server.close();
  });

  beforeEach(() => {
    chai.request('http://127.0.0.1:1337/api/logoutUser', (err, res, body) {});

    // create user to use in tests
    const user = 'testbot@gmail.com';

    // create an article to submit via text
    const text = 'To be, or not to be, that is the question: Whether tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep No more; and by a sleep, to say we end the heart-ache, and the thousand natural shocks that Flesh is heir to? Tis a consummation devoutly to be wished. To die, to sleep, To sleep, perchance to Dream; aye, theres the rub, for in that sleep of death, what dreams may come, when we have shuffled off this mortal coil, must give us pause. Theres the respect that makes Calamity of so long life: For who would bear the Whips and Scorns of time, the Oppressors wrong, the proud mans Contumely, the pangs of despised Love, the Law’s delay, the insolence of Office, and the spurns that patient merit of the unworthy takes, when he himself might his Quietus make with a bare Bodkin? Who would Fardels bear, to grunt and sweat under a weary life, but that the dread of something after death, the undiscovered country, from whose bourn no traveller returns, puzzles the will, and makes us rather bear those ills we have, than fly to others that we know not of. Thus conscience does make cowards of us all, and thus the native hue of Resolution Is sicklied oer, with the pale cast of Thought, And enterprises of great pitch and moment, with this regard their Currents turn awry, And lose the name of Action';

    // create an article to submit via url
    const link = 'http://www.cnn.com/2017/12/22/politics/donald-trump-no-news-conference/index.html';

    // remove articles, user, vote relations from database so they can be created later in the test
    user.get({ body: { username: 'testbot@gmail.com' } }, (found) => {
      db.Vote.destroy({ where: { userId: found.dataValues.id } })
        .then(() => {
          return db.Article.destroy({ where: { user_text: text } })
        })
        .then(() => {
          return db.Article.destroy({ where: { user_text: link } })
        })
        .then(() => {
          db.User.destroy({ where: { id: found.dataValues.id } })
        })
        .catch((err) => {
          console.log('Error removing test items from database:', err);
        });
    });
  })

  it('Should make a get request to /', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should make a post request to /api/analyze', (done) => {
    chai.request('http://127.0.0.1:3000')
      .post('/api/analyze', { data: text })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.data).to.have.property('id');
        expect(res.data.id).to.be.a('number');
        expect(res.data).to.have.property('title');
        expect(res.data.title).to.be.a('string');
        expect(res.data).to.have.property('tone');
        expect(res.data.tone).to.be.a('object');
        expect(res.data).to.have.property('score');
        expect(res.data.score).to.be.a('number');
        expect(res.data).to.have.property('sentiment');
        expect(res.data.sentiment).to.be.a('object');
        expect(res.data).to.have.property('summary');
        expect(res.data.summary).to.be.a('string');
        done();
      });
  });

  it('Should make a post request to /api/extract', (done) => {
    chai.request('http://127.0.0.1:3000')
      .post('/api/extract', { data: link })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.data).to.have.property('id');
        expect(res.data.id).to.be.a('number');
        expect(res.data).to.have.property('title');
        expect(res.data.title).to.be.a('string');
        expect(res.data).to.have.property('tone');
        expect(res.data.tone).to.be.a('object');
        expect(res.data).to.have.property('score');
        expect(res.data.score).to.be.a('number');
        expect(res.data).to.have.property('sentiment');
        expect(res.data.sentiment).to.be.a('object');
        expect(res.data).to.have.property('summary');
        expect(res.data.summary).to.be.a('string');
        done();
      });
  });

  // store article to database
  it('Should store an article to the database', (done) => {
    chai.request('http://127.0.0.1:3000')
      .post('api/analyze', {  })
  })
  // store user to database
  // store votes relation to database

})
