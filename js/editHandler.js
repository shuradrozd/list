var mssql = require('mssql');
var path = require('path');
var queries = require('./queries');

module.exports = {

   displayEditItems : function (req, res) {
        queries.getAllEditItems(req, res);
   },

    displayOneItem : function (req, res) {
        queries.getOneEditItem(req, res);
   },
    deleteRow : function (req, res) {
        queries.deleteItem(req, res);
    },

   editRow: function(req, res) {
        console.log(req.body);
        queries.editItem(req.body, req, res);
    }

};