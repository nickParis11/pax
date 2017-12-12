const { Client } = require('pg');
require('dotenv').config();
const Sequelize = require('sequelize');

// **************** sequelize pat **************

const sequelize = new Sequelize('test', 'postgres', process.env.LOCAL_DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});


sequelize
  .authenticate()
  .then(() => {
    console.log('sequelize Connection has been established successfully.');
  })
  .catch(err => {
    console.error('sequelize : Unable to connect to the database:', err);
  });

  const User = sequelize.define('sequelizeUser', {
    name: {
      type: Sequelize.STRING
    },
  });

  // force: true will drop the table if it already exists
  User.sync({force: true}).then(() => {
    console.log('Table created');
    return User.create({
      name: 'Robin',
    }).then(()=> {
    	console.log('row ceated');
    	User.findAll().then(users => {
    	  console.log('equivalent select * =',users)
    	})
    });
  });

  // ******************** pg part *************

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

