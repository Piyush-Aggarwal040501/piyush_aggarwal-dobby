const express = require('express');
const mongoose = require('mongoose');
const dotenv  = require("dotenv");
const cookieParser = require("cookie-parser");

const path = require('path');



const app = express();



app.use(express.json());
app.use(cookieParser());


app.use(express.static('public'));

// to get data of config.env
dotenv.config({path:'./config.env'});

// connecting with database 
require('./db/connection')


app.use(express.static("client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

})
  

// geeting all rquests 
app.use(require('./router/signup'));
app.use(require('./router/login'));
app.use(require('./router/logout'));
app.use(require('./router/details'));
app.use(require('./router/addImage'));





const port = process.env.PORT || 5000;

// app.use(express.static("client/build"));
// app.get("/*", function(req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });


app.listen(port,()=>{
    console.log(`the server is running at http://localhost:${port}`)
})