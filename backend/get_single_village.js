const mysql = require("mysql2");
const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const connection = mysql.createConnection({
  connectionLimit: 5,
  host: "localhost",
  user: "happy_homes",
  database: "happyhomes",
  password: "Raziel123"
});
app.options('*', cors()) // include before other routes


app.listen(3000, ()=>console.log("Сервер запущен..."));
