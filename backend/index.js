const mysql = require("mysql2");
const express = require("express");
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const fs = require('fs');
const cookieParser = require('cookie-parser')
app.use(cookieParser('secret key'))

//mysql connect
const connection = mysql.createConnection({
  connectionLimit: 5,
  host: "localhost",
  user: "happy_homes",
  database: "happyhomes",
  password: "Raziel123"
});

app.options('*', cors()) // include before other routes

// get villages
app.get('/villages_released', cors(), async function(req, res) {
  connection.connect(function(err){
    if (err) throw err;
    connection.query("SELECT * FROM `villages_released`", function (err, rows, fields) {
      if (err) throw err;
      res.send(rows)
    })
  })
})

//login check
app.post('/admin-login-check', cors(), async function(req, res) {
  connection.connect(function(err){
    connection.query("SELECT * FROM users WHERE session_id = '"+ req.body.id + "'", function (err, rows, fields) {
      if (!rows.length) {
        // not admin
        res.send(err) 
      } else {
        // is admin
        res.send(rows) 
      }
    })
    

  })
})

//login
app.post('/admin-login', cors(), async function(req, res) {
  connection.connect(function(err){
    connection.query("SELECT * FROM users WHERE username = '"+ req.body.username + "' AND password = '" + req.body.password + "';", function (err, rows, fields) {
            res.send(rows) 
            if (!rows.length) {
            } else {
              connection.query("UPDATE users SET session_id = '" + req.body.id + "' WHERE username = '"+ req.body.username + "' AND password = '" + req.body.password + "';")
            }
    })
    

  })
})

//get single village 
app.post('/single_village', cors(), async function(req, res, id) {
  id = req.body.id;
  connection.connect(function(err){
    if (err) throw err;
    connection.query('SELECT * FROM villages_released WHERE id = "' + id + '";', function (err, rows, fields) {
      if (err) throw err;
      res.send(rows)
    })
  })
})

//insert project
app.post('/insert-project', cors(), async function(req, res) {
  const object = req.body.projectAdd;
  console.log(object)
  connection.connect(function(err){
    if (err) throw err;
    connection.query("INSERT INTO `villages_released`(`name`, `link`, `description_features`, `about`, `howtoride_all`, `howtoride_personal`, `category`, `price`, `photos`, `id`) VALUES ('" + object.header + "','" + object.link + "','" + object.features + "','" + object.about + "','" + object.howtoride_all + "','" + object.howtoride_personal + "','" + object.category + "','" + object.price + "','" + object.photos + "','" + object.id + "')", function (err, rows, fields) {
      if (err) throw err;
      res.send(rows)
    })
  })
})


app.listen(3000, ()=>console.log("Server listening on 3000"));
