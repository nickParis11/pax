const promise = require('bluebird');
let PORT = parseInt(process.env.PORT,10) || '3000';


let options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options);
const connectionString = `postgres://localhost:${PORT}/textAnalyzer`;
const = pgp(connectionString);

