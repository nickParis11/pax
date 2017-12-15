const { Client } = require('pg');
require('dotenv').config();
const Sequelize = require('sequelize');

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

// test authentification
sequelize
  .authenticate()
  .then(() => {
    console.log('sequelize Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('sequelize : Unable to connect to the database:', err);
  });

// create barebone schema
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  sessionId: Sequelize.STRING,
});

const Input = sequelize.define('input', {
  text: Sequelize.STRING,
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

User.hasMany(Input);
User.hasMany(Vote);
Input.hasMany(Vote);

Input.belongsTo(User);
Vote.belongsTo(User);
Vote.belongsTo(Input);

exports.User = User;
exports.Input = Input;
exports.Vote = Vote;

// force: true will drop the table if it already exists
User.sync({ force: true }).then(() => {
  console.log('Table created');
  return User.create({
    username: 'Robin',
    sessionId: null,
  }).then(() => {
    console.log('row ceated');
    User.findAll().then((users) => {
      console.log('equivalent select * =', users);
    });
  });
});

// ******************** pg part *************

const client = new Client({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPwd,
  port: 5432,
});

client.connect();

client.query('select * from users', (err, res) => {
  console.log(err ? err.stack : res.rows);
  // make sure to uncomment client.end() if running other queries in this page with pg module
  client.end();
});


// only uncomment this part if you wanna test insertion
// make sure to uncomment client.end() if there is no client.end after these lines

/*
client.query('insert into users (name) values ($1);',['Katelyn'], (err, res) => {
  console.log(err ? err.stack : res);
  //client.end();
})
*/
