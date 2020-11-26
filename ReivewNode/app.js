var express = require('express')
var app = express();
var path = require('path')

//npm i handlebars consolidate --save
const engines = require('consolidate');
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.render('index')
})
fs = require('fs')
var fileName = "user.txt"
app.post('/doAdd',(req,res)=>{
    let name = req.body.txtName;
    let password = req.body.txtPassword;
    let user = name + ';' + password;
    fs.appendFileSync(fileName,'/' + user);
    //redirec user to Index
    res.redirect('/');
})

app.get('/login',(req,res)=>{
    res.render('login');
})
app.post('/doLogin',(req,res)=>{
    let name = req.body.txtName;
    let password = req.body.txtPassword;
    let textFile = fs.readFileSync(fileName,"utf8");
    users = textFile.split('/');
    //remove the first element because it is empty
    users.shift();
    users.forEach(element => {
        nameF = element.split(';')[0];
        passF = element.split(';')[1];
        if(name==nameF && password == passF){
            res.end('Valid user!')
            return;
        }
    });
    res.end('Invalid user!')
})
var PORT = process.env.PORT || 3000;
app.listen(PORT)
console.log('Server is running at PORT ' + PORT)