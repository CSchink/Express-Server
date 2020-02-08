const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Hello John!!');
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Example app is now listening on port 3000')
})

async function main(){
    const uri="mongodb+srv://dbCorey:MVDhmYhNQkp2y8T@cluster0-ymebw.mongodb.net/sottlab?retryWrites=true&w=majority"
    const {MongoClient} = require('mongodb');
    const client = new MongoClient(uri);
try {
    await client.connect();

    await listDatabases(client);
 
} catch (e) {
    console.error(e);
}
finally {
    await client.close();
}
}
main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};