var mssql = require('mssql');
var path = require('path');
var queries = require('./queries');

module.exports = {
    loadAddPage: function(req, res) {
        res.render(path.join(__dirname, '../pages/add_item_page'));
    },
    loadEditPage: function(req, res) {
        res.render(path.join(__dirname, '../pages/edit_item_page'));
    },
    addRow: function(req, res) {
        console.log(req.body);
        queries.insertItem(req.body, req, res);
    },
    editRow: function(req, res) {
        console.log(req.body);
        queries.editItem(req.body, req, res);
    },
    editOneRow: function(req, res) {
        console.log(req.body);
        queries.editOneItem(req.body, req, res);
    }
}