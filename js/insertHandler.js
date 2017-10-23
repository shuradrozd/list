var mssql = require('mssql');
var path = require('path');
var queries = require('./queries');

module.exports = {
    loadAddPage: function(req, res) {
        res.render(path.join(__dirname, '../pages/add_item_page'));
    },
    addRow: function(req, res) {
        console.log('show_item');
        queries.insertItem(req.body, req, res);
    }
}