var express = require('express')
var app = express();
var path = require('path')

//npm i handlebars consolidate --save
const engines = require('consolidate');
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

//allow to read data from textbox(one time only)
//cho phep doc du lieu tu Texbox
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname) +  '/index.html');
})
app.get('/animal',(req,res)=>{
    res.sendFile(path.join(__dirname) +  '/animal.html');
})

app.get('/product',(req,res)=>{
    res.render('addProduct.hbs');
})
var productFile = "Product.txt";
app.post('/doAddProduct',(req,res)=>{
    let name = req.body.txtName;
    let price = req.body.txtPrice;
    let product = name + ';' + price;
    fs.appendFileSync(productFile,'/'+ product);
    //go to homepage
    res.redirect('/');

})

var fs = require('fs')
var fileName = 'data.txt';

app.get('/viewAll',(req,res)=>{
    // res.write('<html>');
    // res.write('<body>')
    // res.write('<ul>')
    // data = fs.readFileSync(fileName,'utf8');
    // var animals = data.split(';');
    // animals.shift();//remove the first element
    // animals.forEach(element => {
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


app.get('/viewP',(req,res)=>{
    let data = fs.readFileSync(productFile,"utf8");
    let products = data.split('/');
    products.shift();
    console.debug(products)
    let model = [];
    products.forEach(element => {
        let info = element.split(';');
        let p2 = {
            'name' : info[0],
            'price' : info[1]
        }
        model.push(p2);
    });
    console.debug(model)
    res.render('viewAll',{data:model});
})

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug('Server is running on port: ' + PORT);
