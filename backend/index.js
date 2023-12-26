const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const mysql = require("mysql2");
const fileUpload = require('express-fileupload');


const connection = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "hhomes",
    database: "happyhomes",
    password: "Raziel123",
    waitForConnections: true,
    connectTimeout: 15000,
    rowsAsArray: false,
    enableKeepAlive: true,
    multipleStatements: true
});
app.use(bodyParser.json());
app.use(cookieParser('secret key'))
app.use(cors())
app.use(fileUpload());
app.options('*', cors()) // include before other routes
const secret = '58107da8-49e5-44da-bff6-698658300185'

// get villages released
app.get('/villages_released', cors(), async function (req, res) {
    connection.query("SELECT * FROM `villages_released`", function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err}`);
        res.send(rows)
    })
})

// get villages instock
app.get('/villages_instock', cors(), async function (req, res) {
    connection.query("SELECT * FROM `villages_instock`", function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err}`);
        res.send(rows)
    })
})

// get homes
app.get('/homes_instock', cors(), async function (req, res) {
    connection.query("SELECT * FROM `homes`", function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err}`);
        res.send(rows)
    })
})


// get sales
app.get('/sales', cors(), async function (req, res) {
    connection.query("SELECT * FROM `sales`", function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err}`);
        res.send(rows)
    })
})

//auth check & expire update if is admin
app.post('/admin-login-check', cors(), async function (req, res) {
    const thisDate = Math.round(Date.now() / 1000);
    jwt.verify(req.body.token, secret, (err, decoded) => {
        if (err) {
            res.send({"isAdmin": false})
        } else {
            connection.query("SELECT * FROM users WHERE username = '" + decoded.username + "' AND password = '" + decoded.password + "';", function (err, rows, fields) {
                if (err) res.send({"isAdmin": false})
                else {
                    if (rows[0].exp < thisDate) res.send({"isAdmin": false})
                    else {
                        const newDate = Math.round(Date.now() / 1000 + (60 * 60 * 24))
                        connection.query("UPDATE `users` SET `exp` = '" + newDate + "' WHERE 1;")
                        res.send({"isAdmin": true})
                    }
                }
            })
        }
    })
})

//auth
app.post('/admin-login', cors(), async function (req, res) {
    const nextExpire = Math.round(Date.now() / 1000 + (60 * 60 * 24))

    connection.query("SELECT * FROM users WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "';", function (err, rows, fields) {
        if (err) {
            console.log(err)
            res.send({"error": true})
        } else if (rows.length <= 0) {
            res.send({"error": true})
        } else {
            connection.query("UPDATE `users` SET `exp` = '" + nextExpire + "' WHERE 1;")
            const user = jwt.sign(
                {
                    username: req.body.username,
                    password: req.body.password,
                }, secret)
            res.send({"token": user})
        }
    })

})

//get contacts
app.get('/get-contact-info', cors(), async function (req, res) {
    connection.query("SELECT * FROM `contacts`", function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err}`);
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
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err}`);
        res.send(rows)
    })
})

//get single village instock
app.post('/single_village_instock', cors(), async function (req, res, id) {
    id = req.body.id;
    connection.query('SELECT * FROM villages_instock WHERE id = "' + id + '";', function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err}`);
        res.send(rows)
    })
})

//add project
app.post('/insert-project', cors(), async function (req, res) {
    const object = req.body.projectAdd;
    console.log(object.photo)
    connection.query("INSERT INTO `villages_instock`(`name`, `link`, `description`, `category`, `price`, `photos`, `howtoride_all`, `howtoride_personal`, `about`, `interactive`, `id`, `coordinates`, `type`) VALUES ('" + object.header + "','" + object.link + "','" + object.features + "','" + object.category + "','" + object.price + "','" + object.photo + "','" + object.howtoride_all + "','" + object.howtoride_personal + "','" + object.about + "','" + object.interactive + "','" + object.id + "','" + object.coordinates + "','" + object.type + "')", function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err}`);
        res.send(rows)
    })
})

//add home
app.post('/insert-home', cors(), async function (req, res) {
    const object = req.body.homeAdd;
    console.log(object)
    connection.query("INSERT INTO `homes`(`name`, `space`, `size`, `price`, `rooftype`, `walltype`, `foundation`, `photos`, `type`, `floor`) VALUES ('" + object.name + "','" + object.space + "','" + object.size + "','" + object.price + "','" + object.rooftype + "','" + object.walltype + "','" + object.foundation + "','" + object.photo + "','" + object.type + "','" + object.floor + "')", function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err} \n`);
        res.send(rows)
    })
})

//add sale
app.post('/insert-sale', cors(), async function (req, res) {
    const object = req.body.homeAdd;
    console.log(object)
    connection.query("INSERT INTO `sales`(`name`, `description`, `enddate`, `photos`) VALUES ('" + object.name + "','" + object.description + "','" + object.endDate + "','" + object.photo + "')", function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err} \n`);
        res.send(rows)
    })
})

//delete sale
app.post('/delete-sale', cors(), async function (req, res) {
    const object = req.body;
    connection.query("DELETE FROM `" + object.deleteProject.where + "` WHERE `name` = '" + object.deleteProject.name + "'", function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err}`);
        res.send(rows)
    })
})

//edit project
app.post('/edit-project', cors(), async function (req, res) {
    const object = req.body;
    console.log(object)
})

//delete project
app.post('/delete-project', cors(), async function (req, res) {
    const object = req.body;
    connection.query("DELETE FROM `" + object.deleteProject.where + "` WHERE `id` = '" + object.deleteProject.id + "'", function (err, rows, fields) {
        if (err) fs.appendFileSync('errors.log', `${Date.now()}: ${err}`);
        res.send(rows)
    })
})

app.listen(3000, () => console.log("Server listening on 3000"));