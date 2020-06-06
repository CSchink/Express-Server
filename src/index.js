const connection = require('./connection.js')
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = "Johnny Be Good"

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Express Router:
// const router = express.Router();
// router.get()
// app.use(router);

app.post('/login', async function(req, res, next){
    console.log(req.body)
    let client = await connection.connect();
    let confirmation = await connection.userCheck(client, req.body.username, req.body.password );
    // res.sendStatus(200)
    if(confirmation){
      const token = jwt.sign("Hello world", secretKey);
      console.log(token);
      res.json(token);
    } else {
        res.sendStatus(400)
    }
    
})

app.use((req, res, next) => {
    console.log("middleware");
    // verify token
    let token = req.headers.authorization;
    console.log(token);

    try {
        let verify =  jwt.verify(token, secretKey);

        console.log(verify);

        // if verifying token succeeds continue
           next()
       
    } catch (error) {
        console.log(error);
        res.sendStatus(401);

        // res.status(500).json("We caught this error");
    }

    // if verifying token throws error, return 401

    // if (req.headers.authorization) {

    // }

    // console.log(req.path);

    // if (req.path === "/") {
    //     next();
    // } else {
    //     //401: Unauthorized
    //     res.sendStatus(401);
    // }

    // next();
})

app.get('/',function(req, res){
    console.log("route handler")
    res.send('Hello John!!');
})

app.get('/listDatabases', async function(req, res){
    let client = await connection.connect();
    let databases = await connection.listDatabases(client);
    res.json(databases)
})

app.get('/listEntries', async function(req, res){
    let client = await connection.connect();
    let entries = await connection.listEntries(client);
    res.json(entries)
})

app.get('/deleteEntries', async function(req, res){
    let client = await connection.connect();
    let update = await connection.deleteEntries(client, "John")
    res.json(update);
})

app.get('/createEntry', async function(req, res){
    let client = await connection.connect();
    let updatedEntry = await connection.createEntry(client, {
        user: "John",
        password: "fr8743gv"
    })
    res.json(updatedEntry);
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Example app is now listening on port 3000')
})

