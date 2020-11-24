var express = require('express')
var app = express();
var path = require('path')

//npm i handlebars consolidate --save
const engines = require('consolidate');
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');


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

app.get('/viewAll',(req,res)=>{
    // res.write('<html>');
    // res.write('<body>')
    // res.write('<ul>')
    // data = fs.readFileSync(fileName,'utf8');
    // var animals = data.split(';');
    // animals.shift();//remove the first element
    //     res.write('<li>'+ element + '</li>')
    // });
    // res.write('</ul>')
    // res.write('</body>')
    // res.write('</html>');
    data = fs.readFileSync(fileName,'utf8');
    var animals = data.split(';');
    animals.shift();//remove the first element
    res.render('animals',{model:animals})

})

app.post('/addAnimal',(req,res)=>{
    var name = req.body.animalName;
    fs.appendFileSync(fileName,';'+name);
    //go to homepage
    res.redirect('/');
})

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug('Server is running on port: ' + PORT);
