var express = require('express');
var app = express();

var port = 8080;
var path = require('path');
var bodyParser = require('body-parser');

var displayHandler = require('./js/displayHandler'); //module for request
var insertHandler = require('./js/insertHandler');
var editHandler = require('./js/editHandler');

// pattern generator
app.set('views', __dirname + '/pages');
app.set('view engine', 'ejs');

// load static file from pages
app.use(express.static(path.join(__dirname, 'pages')));
//middleware for json
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/', displayHandler.displayItems);
app.get('/edit', editHandler.displayEditItems);
app.get('/edit/:id', editHandler.displayOneItem);
app.post('/edit/editItem', editHandler.editRow);
app.get('/add', insertHandler.loadAddPage);
app.post('/add/newItem', insertHandler.addRow);

// processing errors
app.use(function(err, req, res, next){
    if (err) console.log(err.stack);
    res.status(500).send('something went wrong');

});

app.listen(port, function() {
    console.log('Connection established on ' + port);
});
