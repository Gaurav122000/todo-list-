const express  = require('express');
const app = express();
const path = require('path');
const port = 8000;//port number
const db = require('./config/mongoose');//mongoose for db connectivity

app.set('view engine', "ejs");//view engine
app.set('views', path.join(__dirname,'views'));//path to views

app.use(express.urlencoded({ extended: true }))//parser it's a middleware
app.use(express.static('assets'));//static assets middleware
app.use('/',require('./routes'));//routes

app.listen(port, function(err){
    if (err) {
        console.log("Error in eunning the server",err);
    }
    console.log('yup!My Server is running on port', port)
})