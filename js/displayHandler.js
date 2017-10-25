var mssql = require('mssql');

var queries = require('./queries');

module.exports = {
  displayItems: function(req, res) {
      queries.getAllItems(req, res);
  },
  displayEditItems: function(req, res) {
      queries.getAllEditItems(req, res);
    }
};