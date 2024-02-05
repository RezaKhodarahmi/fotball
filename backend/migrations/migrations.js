const v1 = require("./versions/v1");
const v2 = require("./versions/v2");

const migrations = [
  ...v1,
  ...v2
];

module.exports = migrations;