var mssql = require('mssql');
var queries = require('./queries');

module.exports = {

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