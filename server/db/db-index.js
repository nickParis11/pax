const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: process.env.LOCAL_DB_PASSWORD,
  port: 5432,
});

client.connect();

/*

// only uncomment this part if you wanna test insertion
// make sure to uncomment client.end() if there is no client.end after these lines

client.query('insert into users (name) values ($1);',['Katelyn'], (err, res) => {
  console.log(err ? err.stack : res);
  //client.end();
})

*/

client.query('select * from users', (err, res) => {
  console.log(err ? err.stack : res.rows);
  client.end();
});

