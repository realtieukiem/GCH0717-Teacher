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
    let userJson = readDataFromFile();
    res.render('all',{data:userJson})
})

app.get('/delete',(req,res)=>{
    let nameToDelete = req.query.name;
    //1.Load data from file to array
    let userJson = readDataFromFile();
    //2.find user in array and delete
    let indexToRemove = -1;
    for(i=0;i<userJson.length;i++){
        if(userJson[i].name==nameToDelete){
            indexToRemove = i;
            break;
        }
    }
    userJson.splice(indexToRemove,1);
    //3.Save array to file
    let contentToSave ='';
    for(i=0;i<userJson.length;i++){
        contentToSave += '/' + userJson[i].name + ':' + userJson[i].city;
    }
    fs.writeFileSync(fileName, contentToSave);
    res.redirect('/');
})
app.get('/edit',(req,res)=>{
    let nameToEdit = req.query.name;
    //1.Load data from file to array
    let userJson = readDataFromFile();
    //2.find user in array to edit
    let indexToEdit = -1;
    for(i=0;i<userJson.length;i++){
        if(userJson[i].name==nameToEdit){
            indexToEdit = i;
            break;
        }
    }
    res.render('edit',{data:userJson[indexToEdit]})
})
app.post('/update',(req,res)=>{
    let nameToUpdate = req.body.txtName;
    let cityToUpdate = req.body.txtCity;
     //1.Load data from file to array
     let userJson = readDataFromFile();
     //2.find user in array to update
    let indexToEdit = -1;
    for(i=0;i<userJson.length;i++){
        if(userJson[i].name==nameToUpdate){
            indexToEdit = i;
            break;
        }
    }
    //update array
    userJson[indexToEdit].city = cityToUpdate;
    //3.Save array to file
    let contentToSave ='';
    for(i=0;i<userJson.length;i++){
        contentToSave += '/' + userJson[i].name + ':' + userJson[i].city;
    }
    fs.writeFileSync(fileName, contentToSave);
    res.redirect('/');
     
})

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Server is running....')

function readDataFromFile() {
    let fileContent = fs.readFileSync(fileName, "utf8");
    let userText = fileContent.split('/');
    //remove the first because it's empty
    userText.shift();
    let userJson = [];
    userText.forEach(user => {
        let eachU = {
            'name': user.split(':')[0],
            'city': user.split(':')[1]
        };
        userJson.push(eachU);
    });
    return userJson;
}
