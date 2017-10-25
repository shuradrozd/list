var mssql = require('mssql');
var connection = require('./config');
module.exports = {
    tableRows: ``,
    getAllItems: function(req, res){
        var self = this;
        self.tableRows = ``;
        var request = new mssql.Request(connection);
        request.query("SELECT * FROM Todo");
        request.stream = true;
        request.on('row', function(row){
            self.tableRows += `<tr>
                <td>${row.name}</td>
                <td>${row.description}</td>
                <td>${row.completed? 'yes' : 'no'}</td>
                   </tr>`;
        })
        request.on('done',  function(){
            res.render('index', {data: self.tableRows});
        })
    },

    getAllEditItems: function(req, res){
        var self = this;
        self.tableRows = ``;
        var request = new mssql.Request(connection);
        request.query("SELECT * FROM Todo");
        request.stream = true;
        request.on('row', function(row){
            self.tableRows += `<tr>
                <td><input type="button" value ="edit" id=${row.id}> ${row.name}</td>
                <td>${row.description}</td>
                <td>${row.completed? 'yes' : 'no'}</td>
                   </tr>`;
        })
        request.on('done',  function(){
            res.render('edit', {data: self.tableRows});
        })
    },
    editOneItem: function(req, res){
        var self = this;
        self.oneRow = ``;
        var request = new mssql.Request(connection);
        request.query("SELECT * FROM Todo WHERE id = 1");
        request.stream = true;
        request.on('row', function(row){
            self.oneRow += `<div class="panel well">
    <h3>Edit Item</h3>
    <div class="form-group">
        <label>Name:<input type="text" class="form-control" value="${row.name}"></label>
    </div>
    <div class="form-group">
        <label>Description:<input type="text" class="form-control" value="${row.description}"></label>
    </div>
    <div class="form-group">
        <label>Completed:<input type="checkbox" value="${row.completed}"></label>
    </div>
    <div class="form-group">
        <a href="edit" class="btn btn-lg btn-info" id="btn">Apply</a>
        <h5 style="color:#f00; font-weight: bold" id="errorMsg"></h5>
    </div>
</div>  `;



        })
        request.on('done',  function(){
            res.render('edit/1', {Row: self.oneRow});
        })
    },
    insertItem: function(data, req, res) {
        var inserts = {
            name: data.name,
            description: data.description,
            completed: parseInt(data.completed)
        };
        var ps = new mssql.PreparedStatement(connection);
        ps.input('name', mssql.Text);
        ps.input('description', mssql.Text);
        ps.input('completed', mssql.Int);
        ps.prepare("INSERT INTO Todo (name, description, completed) VALUES(@name,@description,@completed)", function(err){
            if (err) console.log(err);
           ps.execute(inserts, function(err) {
                if (err) console.log(err);
                console.log('Add Item');
                ps.unprepare();
            });
        });
    },
    editItem: function(data, req, res) {
        var inserts = {
            name: data.name,
            description: data.description,
            completed: parseInt(data.completed)
        };
        var ps = new mssql.PreparedStatement(connection);
        ps.input('name', mssql.Text);
        ps.input('description', mssql.Text);
        ps.input('completed', mssql.Int);
        ps.prepare("UPDATE Todo SET name = @name, description = @description, completed = @completed WHERE )", function(err){
            if (err) console.log(err);
            ps.execute(inserts, function(err) {
                if (err) console.log(err);
                console.log('Add Item');
                ps.unprepare();
            });
        });
    }
}