const Sequelize = require('sequelize');
require('dotenv').config();

// ******************************** db elements set up

const dbPwd = process.env.LOCAL === '1' ? process.env.LOCAL_DB_PASSWORD : process.env.DEPLOYED_DB_PASSWORD;
const dbUser = process.env.LOCAL === '1' ? process.env.LOCAL_DB_USER : process.env.DEPLOYED_DB_USER;
const dbHost = process.env.LOCAL === '1' ? process.env.LOCAL_DB_HOST : process.env.DEPLOYED_DB_HOST;
const dbName = process.env.LOCAL === '1' ? process.env.LOCAL_DB_NAME : process.env.DEPLOYED_DB_NAME;


// **************** sequelize pat **************

const sequelize = new Sequelize(dbName, dbUser, dbPwd, {
  host: dbHost,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// test authentication
sequelize
  .authenticate()
  .then(() => {
    // sequelize.sync({ force: true });  // uncomment to set up tables
    console.log('sequelize Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('sequelize : Unable to connect to the database:', err);
  });

// create schemas
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  sessionId: Sequelize.STRING,
});

const Article = sequelize.define('article', {
  user_text: Sequelize.STRING,
  is_link: Sequelize.BOOLEAN,
  result: Sequelize.INTEGER,
  polarity: Sequelize.STRING,
  polarity_score: Sequelize.INTEGER,
  anger: Sequelize.INTEGER,
  disgust: Sequelize.INTEGER,
  fear: Sequelize.INTEGER,
  joy: Sequelize.INTEGER,
  sadness: Sequelize.INTEGER,
  analytical: Sequelize.INTEGER,
  confident: Sequelize.INTEGER,
  tentative: Sequelize.INTEGER,
  openness: Sequelize.INTEGER,
  conscientiousness: Sequelize.INTEGER,
  extraversion: Sequelize.INTEGER,
  agreeableness: Sequelize.INTEGER,
  emotional_range: Sequelize.INTEGER,
});

const Vote = sequelize.define('vote', {
  voted: Sequelize.BOOLEAN,
  upvote: Sequelize.BOOLEAN,
  downvote: Sequelize.BOOLEAN,
});

// define relationships
User.hasMany(Article);
User.hasMany(Vote);
Article.hasMany(Vote);
Article.belongsTo(User);
Vote.belongsTo(User);
Vote.belongsTo(Article);

exports.User = User;
exports.Article = Article;
exports.Vote = Vote;
