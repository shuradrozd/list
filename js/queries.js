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
            self.tableRows += ` <tr>
                <td>${row.name}</td>
                <td>${row.description}</td>
                <td>${row.completed? 'yes' : 'no'}</td>
                   </tr>`;
        })
        request.on('done',  function(affected){
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
                <td>
                  <a href="edit/${row.id}" class="glyphicon glyphicon-pencil" style="cursor: pointer">&nbsp;</a>
                <!--<span id = "${row.id}" class="glyphicon glyphicon-pencil" style="cursor: pointer">&nbsp;</span>-->
                <a href="delete/${row.id}" class="glyphicon glyphicon-remove" style="cursor: pointer">&nbsp;</a>
                    ${row.name}</td>
                <td>${row.description}</td>
                <td>${row.completed? 'yes' : 'no'}</td>
                   </tr>`;
        })
        request.on('done',  function(){
            res.render('edit', {data: self.tableRows});
        })
    },
    getOneEditItem: function(req, res) {

        var inserts = {
            id: parseInt(req.params.id)
        };
        var ps = new mssql.PreparedStatement(connection);
        ps.input('id', mssql.Int);
        ps.prepare("SELECT * FROM Todo WHERE id = @id", function(err){
            if (err) console.log(err);
            ps.execute(inserts, function(err, rows) {
                if (err) console.log(err);
                console.log('Select item by Id');
                //console.log(rows);
                var row = rows.recordset[0];

                res.render('edit_item_page', {
                    id: row.id,
                    name:row.name,
                    description:row.description,
                    completed: row.completed});
                //console.log({id: row.id, name:row.name, description:row.description,
                  //  completed: row.completed ? 'checked': ''});
                ps.unprepare();
            });

        });
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
                console.log('add item');
                ps.unprepare();

            });
        });
    },
    editItem: function(data, req, res) {

        var inserts = {
            id: data.id,
            name: data.name,
            description: data.description,
            completed: parseInt(data.completed)
        };

        console.log(inserts);

        var ps = new mssql.PreparedStatement(connection);
        ps.input('id', mssql.Int);
        ps.input('name', mssql.Text);
        ps.input('description', mssql.Text);
        ps.input('completed', mssql.Int);
        ps.prepare("UPDATE Todo SET name = @name, description = @description, completed = @completed WHERE id = @id", function(err){
            if (err) console.log(err);
            ps.execute(inserts, function(err) {
                if (err) console.log(err);
                console.log('item updated');
                ps.unprepare();

            });
        });
    },
    deleteItem: function(req, res) {
        var inserts = {
            id: parseInt(req.params.id)
        };
        console.log(inserts);
        var ps = new mssql.PreparedStatement(connection);
        ps.input('id', mssql.Int);
        ps.prepare("DELETE FROM Todo WHERE id = @id", function(err){
            if (err) console.log(err);
            ps.execute(inserts, function(err) {
                if (err) console.log(err);
                console.log('item deleted');
                ps.unprepare();
                res.redirect('/edit');
            });
        });
    }
}