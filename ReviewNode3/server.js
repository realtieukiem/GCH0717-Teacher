var express = require('express')
var app= express()

const engines = require('consolidate');
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//register folder public to store: js,css,images
app.use(express.static(__dirname + '/public'))

var fs = require('fs')
var fileName = 'data.txt'
app.get('/',(req,res)=>{
    let fileContent = fs.readFileSync(fileName,"utf8");
    let userText = fileContent.split('/');
    //remove the first because it's empty
    userText.shift();
    let userJson = [];
    userText.forEach(user => {
        let eachU = {
            'name': user.split(':')[0],
            'city': user.split(':')[1]
        }
        userJson.push(eachU)
    });
    res.render('all',{data:userJson})
})
var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Server is running....')