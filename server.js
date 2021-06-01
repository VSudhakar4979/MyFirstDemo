const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var isuserLoggedin = false;
const fs = require('fs');
var products = {};

fs.readFile('models/products.json', (err, data) => {
    products = JSON.parse(data.toString());
});

function validateUser(req, res, next) {
    if (isuserLoggedin) {
        next();
    }
    else {
        res.sendFile(__dirname + '/login.html');
    }
}
app.listen(port, () => {
    console.log("server started on port:", port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("*********Request Recieved******", new Date());
    next();
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username == "sudhakar.venati" && password == "password") {
        isuserLoggedin = true;
        res.sendFile(__dirname + '/home.html');
    }
    else {
        res.sendFile(__dirname + '/login.html');
    }
});
app.get('/profile', validateUser, (req, res) => {
    res.download(__dirname + '/models/vsr.docx');
});
app.get('/products', validateUser, (req, res) => {
    res.json(products);
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

