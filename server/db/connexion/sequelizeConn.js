const Sequelize = require('sequelize');


const dbPwd = process.env.LOCAL === '1' ? process.env.LOCAL_DB_PASSWORD : process.env.DEPLOYED_DB_PASSWORD;
const dbUser = process.env.LOCAL === '1' ? process.env.LOCAL_DB_USER : process.env.DEPLOYED_DB_USER;
const dbHost = process.env.LOCAL === '1' ? process.env.LOCAL_DB_HOST : process.env.DEPLOYED_DB_HOST;
const dbName = process.env.LOCAL === '1' ? process.env.LOCAL_DB_NAME : process.env.DEPLOYED_DB_NAME;
const dbName2 = process.env.LOCAL === '1' ? process.env.LOCAL_DB_NAME2 : process.env.DEPLOYED_DB_NAME2;


// **************** sequelize part **************

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

// create bareboen schema
const User = sequelize.define('sequelize_user', {
  name: {
    type: Sequelize.STRING,
  },
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

exports.sequelLizeConnection = sequelize;




// db
//   .authenticate()
//   .then(() => {
//     console.log('Connected to database.');
//   })
//   .catch((err) => {
//     console.log('Unable to connect to database: ', err);
//   });

// const User = db.define('user', {
//   username: Sequelize.STRING,
//   email: Sequelize.STRING,
//   password: Sequelize.STRING,
// });

// const Input = db.define('input', {
//   text: Sequelize.STRING,
//   is_link: Sequelize.BOOLEAN,
//   result: Sequelize.INTEGER,
//   polarity: Sequelize.STRING,
//   polarity_score: Sequelize.INTEGER,
//   anger: Sequelize.INTEGER,
//   disgust: Sequelize.INTEGER,
//   fear: Sequelize.INTEGER,
//   joy: Sequelize.INTEGER,
//   sadness: Sequelize.INTEGER,
//   analytical: Sequelize.INTEGER,
//   confident: Sequelize.INTEGER,
//   tentative: Sequelize.INTEGER,
//   openness: Sequelize.INTEGER,
//   conscientiousness: Sequelize.INTEGER,
//   extraversion: Sequelize.INTEGER,
//   agreeableness: Sequelize.INTEGER,
//   emotional_range: Sequelize.INTEGER,
// });

// const Vote = db.define('vote', {
//   voted: Sequelize.BOOLEAN,
//   upvote: Sequelize.BOOLEAN,
//   downvote: Sequelize.BOOLEAN,
// });

// User.hasMany(Input);
// User.hasMany(Vote);
// Input.hasMany(Vote);

// Input.belongsTo(User);
// Vote.belongsTo(User);
// Vote.belongsTo(Input);

// exports.User = User;
// exports.Input = Input;
// exports.Vote = Vote;
