const { Client } = require('pg');
require('dotenv').config();


// ******************************** db elements set up

const dbPwd = process.env.LOCAL === '1' ? process.env.LOCAL_DB_PASSWORD : process.env.DEPLOYED_DB_PASSWORD;
const dbUser = process.env.LOCAL === '1' ? process.env.LOCAL_DB_USER : process.env.DEPLOYED_DB_USER;
const dbHost = process.env.LOCAL === '1' ? process.env.LOCAL_DB_HOST : process.env.DEPLOYED_DB_HOST;
const dbName = process.env.LOCAL === '1' ? process.env.LOCAL_DB_NAME : process.env.DEPLOYED_DB_NAME;


// ******************** pg part *************

const client = new Client({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPwd,
  port: 5432,
});

client.connect();


/*
client.query('select * from users', (err, res) => {
  console.log(err ? err.stack : res.rows);
  // make sure to uncomment client.end() if running other queries in this page with pg module
  client.end();
});
<<<<<<< fe1505c23e45d6e733b22e19d2149a32323e6587


exports.sqlConnection = client;
exports.sequelLizeConnection = sequelize;
=======
*/


// only uncomment this part if you wanna test insertion
// make sure to uncomment client.end() if there is no client.end after these lines

/*
client.query('insert into users (name) values ($1);',['Katelyn'], (err, res) => {
  console.log(err ? err.stack : res);
  //client.end();
})
*/


exports.sqlConnection = client;

