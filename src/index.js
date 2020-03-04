const connection = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.send('Hello John!!');
})

app.get('/listDatabases', async function(req, res){
    let client = await connection.connect();
    let databases = await connection.listDatabases(client);
    res.json(databases)
})

// setup another get route for listings
// need a new database function to return listings that takes in a client

app.get('/listEntries', async function(req, res){
    let client = await connection.connect();
    let entries = await connection.listEntries(client);
    res.json(entries)
})

app.get('/deleteEntries', async function(req, res){
    let client = await connection.connect();
    let update = await connection.deleteEntries(client, "Corey")
    res.json(update);
})

app.get('/createEntry', async function(req, res){
    let client = await connection.connect();
    let updatedEntry = await connection.createEntry(client, {
        user: "John",
        password: "fr8743gv"
    })
    res.send(updatedEntry);
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Example app is now listening on port 3000')
})

