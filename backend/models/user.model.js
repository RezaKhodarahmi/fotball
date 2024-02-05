const sql = require("../database.js");

// constructor
const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};

User.findByEmail = (email, result) => {
  sql.get(`SELECT * FROM user WHERE email = "${email}"`, (err, row) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (row) {
      console.log("found user: ", row);
      result(null, row);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

User.create = (newUser, result) => {
  sql.run("INSERT INTO user (name, email, password) values (? ,?, ?)", [newUser.name, newUser.email, newUser.password], (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { ...newUser });
  });
};

module.exports = User;