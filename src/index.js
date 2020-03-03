const connection = require('./connection.js')
const express = require('express');
const app = express();

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

app.listen(process.env.PORT || 3000, function(){
    console.log('Example app is now listening on port 3000')
})

