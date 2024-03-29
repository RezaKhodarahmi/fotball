var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5');
const migrations  = require('./migrations/migrations');

const DBSOURCE = "db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    } else {
      console.log('Connected to the SQLite database.');
      for (const migration of migrations){
        migration(db);
      }
    }
});

module.exports = db
