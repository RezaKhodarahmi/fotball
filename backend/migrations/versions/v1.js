const createUserTable = (db) =>
  db.run(`CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text, 
      email text UNIQUE, 
      password text, 
      CONSTRAINT email_unique UNIQUE (email)
      )`,
  (err) => {
      if (err) {
          console.log('Table already created')
      } else {
          var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
          db.run(insert, ["admin","admin@example.com", md5("admin123456")])
          db.run(insert, ["user","user@example.com", md5("user123456")])
      }
  });

const createEditorTable = (db) => 
  db.run(`CREATE TABLE editor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      imageUrl text, 
      object text,
      userId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES user(id)
      )`, (err) => {
        if (err) {
            console.log('Table already created')
    }});
  

const v1 = [createUserTable, createEditorTable];

module.exports = v1