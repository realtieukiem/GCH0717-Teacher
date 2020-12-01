//npm install express handlebars consolidate --save

var express = require('express');
var app = express();
var path = require('path');

//npm install handlebars consolidate --save
const engine = require('consolidate');
app.engine('hbs', engine.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'))

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

fs = require('fs');
var fileName = 'user.txt';

app.post('/doAdd', (req, res) => {
    let name = req.body.txtName;
    let password = req.body.txtPassword;
    let errorNameMessage = null;
    let errorPasswordMessage = null;
    if (name.length <= 3) {
        errorNameMessage = "name's length must over 3 words"
    }
    if (password.length <= 6) {
        errorPasswordMessage = "password's length must over 6 words";
    }
    if (errorNameMessage != null || errorPasswordMessage != null) {
        let errorData = { username: errorNameMessage, password: errorPasswordMessage }
        res.render('index', { error: errorData })
        return;
    }

    let user = name + ';' + password;
    fs.appendFileSync(fileName, '/' + user);
    res.redirect('/');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/doLogin', (req, res) => {
    let name = req.body.txtName;
    let password = req.body.txtPassword;
    let textFile = fs.readFileSync(fileName, "utf8");
    user = textFile.split('/');
    //move the first element because it is empty
    user.shift();
    user.forEach(element => {
        nameF = element.split(';')[0];
        passF = element.split(';')[1];
        if (name == nameF && password == passF) {
            res.end("Valid user !");
            return;
        }
    });
    res.end("Invalid user !");
})

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Sever is running at PORT ' + PORT);