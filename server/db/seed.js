const Promise = require('bluebird');
const conn2 = require('./connexion/connexion2');

let conn;

const sqlDrop = 'DROP DATABASE IF EXISTS pax;';
const sqlSchema =
      `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL UNIQUE,
  sessionId VARCHAR(1024)
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  user_Id SERIAL REFERENCES users(id),
  user_text VARCHAR(1500),
  is_link BOOLEAN,
  result INT,
  polarity VARCHAR(10),
  polarity_score VARCHAR(10),
  anger VARCHAR(10),
  disgust VARCHAR(10),
  fear VARCHAR(10),
  joy VARCHAR(10),
  sadness VARCHAR(10),
  analytical VARCHAR(10),
  confident VARCHAR(10),
  tentative VARCHAR(10),
  openness VARCHAR(10),
  conscientiousness VARCHAR(10),
  extraversion VARCHAR(10),
  agreeableness VARCHAR(10),
  emotional_range VARCHAR(10)
);

CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id SERIAL REFERENCES users (id),
  article_id SERIAL REFERENCES articles (id),
  voted BOOLEAN,
  upvote BOOLEAN,
  downvote BOOLEAN
);`;

console.log('@@@@@@@@@@@@@@@@@@@@@@ START @@@@@@@@@@@@@@@@@@@@@@@@@');

conn2.sqlConnection2.query(sqlDrop, (err, res) => { // Drop the pax database, if it exists.
  return new Promise((resolve, reject) => {
    if (err) {
      console.log(err.stack);
      reject(err);
    } else if (res) {
      console.log(res.rows);
      resolve(res);
    }
  });
})
  .then(() => { // Check if a pax database exists.
    const query = "SELECT 1 FROM pg_database WHERE datname='pax'";
    conn2.sqlConnection2.query(query, (err, res) => {
      if (err) {
        console.error('Error checking if pax exists:', err);
        return err;
      } else {
        console.log(`Pax rowCount is: ${res.rowCount}`);
        // If it does not exist, create pax.
        if (res.rowCount === 0) {
          return res;
        } else {
          return new Error('Pax rowCount is greater than zero.');
        }
      }
    });
  })
  .then(() => { // Create the pax database.
    const sqlCreate = 'CREATE DATABASE pax;';
    return conn2.sqlConnection2.query(sqlCreate, (err, res) => {
      if (err) {
        console.error('Error creating pax:', err);
        return err;
      } else {
        console.log('Created pax database:', res);
        return res;
      }
    });
  })
  .then(() => { // Retrive the database.
    const query = "SELECT 1 FROM pg_database WHERE datname='pax'";
    conn = require('./connexion/db-index');
    return conn.sqlConnection.query(query, (err, res) => {
      if (err) {
        console.error('Error retrieving pax:', err);
        return err;
      } else {
        console.log(`Pax exists: ${res.rowCount}` !== 0);
        return res;
      }
    });
  })
  .then(() => { // Retrieve pax tables.
    const query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';";
    return conn.sqlConnection.query(query, (err, res) => {
      if (err) {
        console.error('Error retrieving pax tables:', err);
        return err;
      } else {
        console.log('Tables in pax: ', res.rows);
        return res;
      }
    });
  })
  .then((tables) => { // Delete tables in pax.
    return Promise.all(tables.rows.map((table) => {
      console.log('Current table: ', table.table_name);
      const dropTableQuery = `DROP TABLE IF EXISTS ${table.table_name} CASCADE`;
      return new Promise((reject, resolve) => {
        conn.sqlConnection.query(dropTableQuery, (err, res) => {
          if (err) {
            console.error('Error deleting table:', err);
            return reject(err);
          } else {
            return resolve(res);
          }
        });
      })
        .then(() => {
          const checkTableQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';";
          return conn.sqlConnection.query(checkTableQuery, (err, res) => {
            if (err) {
              console.error('Error retrieving pax tables:', err);
              return err;
            } else {
              console.log(`Just erased table: ${table.table_name}`);
              console.log('Result after erase:', res.rows);
              return res;
            }
          });
        });
    }));
  })
  .then(() => { // Create the pax schema.
    return conn.sqlConnection.query(sqlSchema, (err, res) => {
      if (err) {
        console.error('Error creating pax schema:', err);
        return err;
      } else {
        console.log('Created pax schema:', res);
        return res;
      }
    });
  })
  .then(() => { // Retrieve the pax schema.
    const query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';";
    return conn.sqlConnection.query(query, (err, res) => {
      if (err) {
        console.error('Error retrieving pax schema:', err);
        return err;
      } else {
        console.log('Retrieved schema after schema sql: ', res.rows.length);
        return res;
      }
    });
  })
  .then(() => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@ DONE @@@@@@@@@@@@@@@@@@@@@@@@@');
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });
