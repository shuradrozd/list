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
    }
}