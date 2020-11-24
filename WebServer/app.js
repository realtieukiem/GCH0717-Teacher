var express = require('express')
var app = express();
var path = require('path')

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname) +  '/index.html');
})
app.get('/animal',(req,res)=>{
    res.sendFile(path.join(__dirname) +  '/animal.html');
})

//allow to read data from textbox(one time only)
//cho phep doc du lieu tu Texbox
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var fs = require('fs')
var fileName = 'data.txt';

app.post('/addAnimal',(req,res)=>{
    var name = req.body.animalName;
    fs.appendFileSync(fileName,';'+name);
    //go to homepage
    res.redirect('/');
})

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug('Server is running on port: ' + PORT);
