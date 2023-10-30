const mysql = require("mysql2");
const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(cookieParser('secret key'))
app.options('*', cors()) // include before other routes

//mysql connect
const connection = mysql.createPool({
    connectionLimit: 5,
    host: "raziel666.beget.tech",
    user: "raziel666_hhomes",
    database: "raziel666_hhomes",
    password: "Raziel123",
    waitForConnections: true,
    connectTimeout: 15000,
    rowsAsArray: false,
    enableKeepAlive: true,
    multipleStatements: true
});

// get villages released
app.get('/villages_released', cors(), async function (req, res) {
    connection.query("SELECT * FROM `villages_released`", function (err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    })
})

// get villages instock
app.get('/villages_instock', cors(), async function (req, res) {
    connection.query("SELECT * FROM `villages_instock`", function (err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    })
})

//login check
app.post('/admin-login-check', cors(), async function (req, res) {
    connection.query("SELECT * FROM users WHERE session_id = '" + req.body.id + "'", function (err, rows, fields) {
        if (!rows.length) {
            // not admin
            res.send(err)
        } else {
            // is admin
            res.send(rows)
        }
    })
})

//login
app.post('/admin-login', cors(), async function (req, res) {
    connection.query("SELECT * FROM users WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "';", function (err, rows, fields) {
        res.send(rows)
        if (!rows.length) {
        } else {
            connection.query("UPDATE users SET session_id = '" + req.body.id + "' WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "';")
        }
    })
})

//get contacts
app.get('/get-contact-info', cors(), async function (req, res) {
    connection.query("SELECT * FROM `contacts`", function (err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    })
})

//change contacts
app.post('/set-contact-info', cors(), async function (req, res) {
    connection.query("UPDATE contacts SET time = '" + req.body.contactsToUpdate.time + "', adress = '" + req.body.contactsToUpdate.adress + "', phone = '" + req.body.contactsToUpdate.phone + "', email = '" + req.body.contactsToUpdate.email + "', description = '" + req.body.contactsToUpdate.description + "' WHERE 1;")
})

//get single village 
app.post('/single_village', cors(), async function (req, res, id) {
    id = req.body.id;
    connection.query('SELECT * FROM villages_released WHERE id = "' + id + '";', function (err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    })
})

//get single village instock
app.post('/single_village_instock', cors(), async function (req, res, id) {
    id = req.body.id;
    connection.query('SELECT * FROM villages_instock WHERE id = "' + id + '";', function (err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    })
})

//insert project
app.post('/insert-project', cors(), async function (req, res) {
    const object = req.body.projectAdd;
    connection.query("INSERT INTO `villages_instock`(`name`, `link`, `description`, `category`, `price`, `photos`, `howtoride_all`, `howtoride_personal`, `about`, `interactive`, `id`, `coordinates`, `type`) VALUES ('" + object.header + "','" + object.link + "','" + object.features + "','" + object.category + "','" + object.price + "','" + object.photos + "','" + object.howtoride_all + "','" + object.howtoride_personal + "','" + object.about + "','" + object.interactive + "','" + object.id + "','" + object.coordinates +"','" + object.type + "')", function (err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    })
})
//delete project
app.post('/delete-project', cors(), async function (req, res) {
    const object = req.body;
    connection.query("DELETE FROM `"+ object.deleteProject.where +"` WHERE `id` = '" + object.deleteProject.id + "'" , function (err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    })
})


app.listen(3000, () => console.log("Server listening on 3000"));
