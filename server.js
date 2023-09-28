var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
require("dotenv").config()


const port = process.env.PORT || 5000;

const connection  = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'laravel_workshop_01'
});


var app = express()
app.use(cors())
app.use(express.json())

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})


app.get("/", (req, res) => {
  res.send("Hello! Node.js");
});

app.get('/users', function (req, res, next) {
    connection.query(
      'SELECT * FROM `users`',
      function(err, results, fields) {
        if(err){
          return console.error(err.message);
        }
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

  app.put('/users/:id', (req, res, next) => {
    
    let sql = "UPDATE users SET name = ? WHERE id = ?";
    const id = req.params.id;
    let data = [
      'Warat Supaporn', [id]
    ];
    connection.query(sql,data,(err, results) => {
        if(err){
          return console.error(err.message);
        }else{
          console.log('Rows affected:', results.affectedRows);
        }
      }
    );
  })