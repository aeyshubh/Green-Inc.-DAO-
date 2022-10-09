const express = require("express");
const envFile = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path")
const session = require("express-session")
const ethers = require("ethers")

const connectDB = require('./server/database/connection')

envFile.config({path:"config.env"});

const app = express();
const PORT = process.env.PORT ||8080;


//to configure session
app.use(session({
    secret : "secret-key",
    resave : false,
    saveUninitialized : false,
}));

// to log request
app.use(morgan("tiny"));

//mongoDB connection~
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))

//set view
app.set("view engine","ejs");

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//load router file
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log('Server runnning on http://localhost:'+PORT)});
