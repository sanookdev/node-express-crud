var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const port = 5000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'laravel_workshop_01'
});

var app = express()
app.use(cors())
app.use(express.json())

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port 5000')
})


app.get('/users', function (req, res, next) {
    connection.query(
      'SELECT * FROM `users`',
      function(err, results, fields) {
        res.json(results);
      }
    );
  })
  
  app.get('/users/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
      'SELECT * FROM `users` WHERE `id` = ?',
      [id],
      function(err, results) {
        res.json(results);
      }
    );
  })