const { Client } = require('pg');
require('dotenv').config();

// ******************************** db elements set up

const dbPwd = process.env.LOCAL === '1' ? process.env.LOCAL_DB_PASSWORD : process.env.DEPLOYED_DB_PASSWORD;
const dbUser = process.env.LOCAL === '1' ? process.env.LOCAL_DB_USER : process.env.DEPLOYED_DB_USER;
const dbHost = process.env.LOCAL === '1' ? process.env.LOCAL_DB_HOST : process.env.DEPLOYED_DB_HOST;
const dbName = process.env.LOCAL === '1' ? process.env.LOCAL_DB_NAME : process.env.DEPLOYED_DB_NAME;
const dbName2 = process.env.LOCAL === '1' ? process.env.LOCAL_DB_NAME2 : process.env.DEPLOYED_DB_NAME2;

// create a second connection so i can drop database without error
const conn2 = new Client({
  user: dbUser,
  host: dbHost,
  database: dbName2,
  password: dbPwd,
  port: 5432,
});

conn2.connect();


exports.sqlConnection2= conn2;