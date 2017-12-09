const promise = require('bluebird');
let PORT = parseInt(process.env.PORT,10) || '5432';


let options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options);
const connectionString = `postgres://localhost:${PORT}/naturalLanguage-dev`;
console.log(PORT, 'port');
const db = pgp(connectionString);