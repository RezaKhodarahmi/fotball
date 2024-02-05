const AddNameEditorTable = (db) => 
  db.run(`ALTER TABLE editor ADD COLUMN name`, (err) => {
      if (err) {
          console.log('V2 Applied');
  }});
  

const v2 = [AddNameEditorTable];

module.exports = v2