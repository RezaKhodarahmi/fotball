var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Editor = require('../models/editor.model');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    req.imageName = Date.now() + '.jpeg';
    cb(null, req.imageName);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  const editor = new Editor({
    name: req.body.name,
    userId: req.userId,
    imageUrl: req.imageName,
    object: decodeURIComponent(req.body.json.replace('data:text/json;charset=utf-8,', ''))
  });

  if (req.body.editorId) {
    Editor.findById(req.body.editorId, (err, row) => {
      fs.unlink('public/uploads/' + row.imageUrl, (err) => {
        if (err) {
            throw err;
        }
      });
      Editor.updateById(req.body.editorId, editor, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Editor."
          });
        else res.status(200).send('Image uploaded and saved successfully.');
      });
    });
  } else {
    Editor.create(editor, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Editor."
        });
      else res.status(200).send('Image uploaded and saved successfully.');
    });
  }
});

router.get('/', function(req, res) {
  Editor.getAll(req.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving editors."
      });
    else res.send(data);
  });
});

router.get('/:id', function(req, res) {
  Editor.findById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
});

router.delete('/:id', function(req, res) {
  Editor.remove(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
});

module.exports = router;
