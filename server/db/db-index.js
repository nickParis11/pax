const promise = require('bluebird');

const PORT = parseInt(process.env.PORT, 10) || '5432';


const options = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);

const connectionString = `postgres://localhost:${PORT}/naturalLanguage-dev`;
const db = pgp(connectionString);
