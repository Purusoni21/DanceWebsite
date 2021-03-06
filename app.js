const express = require("express");
const path = require("path");
const app= express();
const bodyparser = require('body-parser')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance',{ useNewUrlParser: true});
const port = 8000;

// define mongoose schema 
var contactschema = new mongoose.Schema({
    name : String,
    phonenumber :Number,
    email : String,
    address : String,
    desc : String
});

var contact = mongoose.model('contact', contactschema);

app.use(`/static`, express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))



app.get('/',(req,res)=>{
    const params= { }
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params= { }
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.status(200).send(" This item has been save to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
})


app.listen(port, ()=>{
    console.log('the application started successfully on port ${port}');
});