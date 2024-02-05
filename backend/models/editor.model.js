const db = require("../database.js");

// constructor
const Editor = function(editor) {
  this.name = editor.name;
  this.userId = editor.userId;
  this.imageUrl = editor.imageUrl;
  this.object = editor.object;
};

Editor.findById = (id, result) => {
  db.get(`SELECT * FROM editor WHERE id = ${id}`, (err, row) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (row) {
      console.log("found editor: ", row);
      result(null, row);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Editor.getAll = (userId, result) => {
  let query = `SELECT id, imageUrl, name FROM editor where userId = ${userId}`;

  db.all(query, (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, rows);
  });
};

Editor.updateById = (id, editor, result) => {
  db.run(
    "UPDATE editor SET name = ?, imageUrl = ?, object = ? WHERE id = ?",
    [editor.name, editor.imageUrl, editor.object, id],
    (err) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, { id: id, ...editor });
    }
  );
};

Editor.create = (newEditor, result) => {
  db.run("INSERT INTO editor (name, imageUrl, object, userId) values (? ,?, ?, ?)", [newEditor.name, newEditor.imageUrl, newEditor.object, newEditor.userId], (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { ...newEditor });
  });
};

Editor.remove = (id, result) => {
  db.run("DELETE FROM editor WHERE id = ?", id, (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("deleted tutorial with id: ", id);
    result(null, id);
  });
};

module.exports = Editor;