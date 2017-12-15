//console.log('sequelize connexion @@@@@@@@@@@@@@@@@@@@@@@@@@@ =',conn.sequelLizeConnection);

var conn2 = require('./connexion/connexion2');
var conn;

var sqlDrop = 'DROP DATABASE IF EXISTS pax;'
var sqlCreate='CREATE DATABASE pax;'
var sqlSchema=
`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(40) NOT NULL
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


var showTables = function  () {
  conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';",(err,res)=>{
    if (err) {
      return console.log('error checking if pax exist', err)
    }
    console.log('tables = ',res.rows)
  });
}

console.log('@@@@@@@@@@@@@@@@@@@@@@ new try @@@@@@@@@@@@@@@@@@@@@@@@@');

conn2.sqlConnection2.query(sqlDrop, (err, res) => {
  console.log(err ? err.stack : res.rows);
      // check if pax exist
      conn2.sqlConnection2.query("SELECT 1 FROM pg_database WHERE datname='pax'",(err,res)=>{
        if (err) {
          return console.log('error checking if pax exist', err)
        }
        console.log('does pax exist = ',res.rowCount)
        // if it does not exist
        if ( res.rowCount === 0 ) {
          // create pax
          conn2.sqlConnection2.query(sqlCreate, (err, res) => {
              if (err) {
                return console.log('error creating pax', err)
              }
              console.log('just created pax', res);
              conn=require('./connexion/db-index');
              conn.sqlConnection.query("SELECT 1 FROM pg_database WHERE datname='pax'",(err,res)=>{
                if (err) {
                  return console.log('error retrieving pax' ,err)
                }
                console.log('does pax exist = ',res.rowCount !== 0);
                conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';",(err,res)=>{
                  if (err) {
                    return console.log('error retrieving pax tables' ,err)
                  }
                  console.log('tables in pax = ',res.rows);
                  res.rows.map(table=>{
                    console.log('current table = ',table.table_name);
                    conn.sqlConnection.query("DROP TABLE IF EXISTS "+table.table_name+" CASCADE",(err,result)=>{
                      if (err) {
                        return console.log('error deleting table',err);
                      }
                      conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';",(err,res)=>{
                        if (err) {
                          return console.log('error retrieving pax tables' ,err);
                        }
                        console.log('just erased table : ',table.table_name);
                        console.log('@@@@@@@@@@@@@@@@@@@@res after erasing  = ',res.rows);
                        
                      });
                    });
                  });
                  conn.sqlConnection.query(sqlSchema, (err, res) => {
                      if (err) {
                        return console.log('error creating pax schema', err)
                      }
                      console.log('just created pax schema', res);
                      //conn.sqlConnection.query();
                      conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';",(err,result)=>{
                        if (err) {
                          return console.log('error retrieving pax schema', err)
                        }
                        console.log('retrieved schema after schema sql = ',result.rows.length)
                      })
                  });
                })
              })
          });
        }
      });
});

/*
conn.sqlConnection.query("SELECT 1 FROM pg_database WHERE datname='pax'",(err,res)=>{
  if (err) {
    return console.log('error retrieving pax' ,err)
  }
  console.log('does pax exist = ',res.rowCount !== 0);
  //console.log('res  = ',res);

  conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';",(err,res)=>{
    if (err) {
      return console.log('error retrieving pax tables' ,err)
    }
    console.log('tables in pax = ',res.rows);
    res.rows.map(table=>{
      console.log('current table = ',table.table_name);
      conn.sqlConnection.query("DROP TABLE IF EXISTS "+table.table_name+" CASCADE",(err,result)=>{
        if (err) {
          return console.log('error deleting table',err);
        }
        conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';",(err,res)=>{
          if (err) {
            return console.log('error retrieving pax tables' ,err);
          }
          console.log('just erased table : ',table.table_name);
          console.log('@@@@@@@@@@@@@@@@@@@@res after erasing  = ',res.rows);
          conn.sqlConnection.query(sqlSchema, (err, res) => {
              if (err) {
                return console.log('error creating pax schema', err)
              }
              console.log('just created pax schema', res);
              //conn.sqlConnection.query()
              conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';",(err,result)=>{
                if (err) {
                  return console.log('error retrieving pax schema', err)
                }
                console.log('retrieved schema after schema sql = ',res.rows)
              })
          });
        });
      })
    })
  })
})
*/

/*
conn.sqlConnection.query(sqlDrop, (err, res) => {
  console.log(err ? err.stack : res.rows);
      // check if pax exist
      conn.sqlConnection.query("SELECT 1 FROM pg_database WHERE datname='pax'",(err,res)=>{
        if (err) {
          return console.log('error checking if pax exist', err)
        }
        console.log('does pax exist = ',res.rowCount)
        // if it does not exist
        if ( res.rowCount === 0 ) {
          // create pax
          conn.sqlConnection.query(sqlCreate, (err, res) => {
              if (err) {
                return console.log('error creating pax', err)
              }
              console.log('just created pax', res);

              // does pax exist
              conn.sqlConnection.query("SELECT 1 FROM pg_database WHERE datname='pax'",(err,res)=>{
                if (err) {
                  return console.log('error checking if pax exist', err)
                }
                console.log('does pax exist = ',res.rowCount)
                // show pax tables
                conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';",(err,result)=>{
                  if (err) {
                    return console.log('error checking if pax exist', err)
                  }
                  // 
                  console.log('result in table_name = ',result);
                  // iterate th all remaining tables
                  result.rows.map((table,i)=>{
                    // erase each one
                    conn.sqlConnection.query("DROP TABLE IF EXISTS "+table.table_name+" CASCADE",(err,res)=>{
                      if (err) {
                        return console.log('error deleting table in pax', err);
                      }
                      console.log('deleted table ',table.table_name);
                      console.log('i = ',i);
                      console.log('length = ',result.rows.length);
                      if ( i === result.rows.length-1 ) {
                        console.log('finished erasing&&&&&&&&&&&&&&&&&&&& = ',i )
                        //create schema 
                        console.log('sqlSchema = ',sqlSchema);
                        conn.sqlConnection.query(sqlSchema, (err, res) => {
                            if (err) {
                              return console.log('error creating pax schema', err)
                            }
                            console.log('just created pax schema', res);
                            //conn.sqlConnection.query()
                            conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';",(err,result)=>{
                              if (err) {
                                return console.log('error retrieving pax schema', err)
                              }
                              console.log('retrieved schema after schema sql = ',res.rows)
                            })
                        });
                      }
                    });
                  })
                });
              });
            });
          }
        console.log('does pax exist = ',res.rowCount)
      })
  //conn.sqlConnection.end();
});
*/

/*
//create schema 
conn.sqlConnection.query(sqlSchema, (err, res) => {
    if (err) {
      return console.log('error creating pax schema', err)
    }
    console.log('just created pax schema', res);
});
*/

