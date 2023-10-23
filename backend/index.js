var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost:3306',
  user     : 'Raziel',
  password : 'Raziel123',
  database : 'menagerie'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();