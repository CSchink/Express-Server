async function connect(){
    const uri="mongodb+srv://dbCorey:MVDhmYhNQkp2y8T@cluster0-ymebw.mongodb.net/sottlab?retryWrites=true&w=majority"
    const {MongoClient} = require('mongodb');
    const client = new MongoClient(uri);
    return await client.connect();
}

// async function main(){
//     const uri="mongodb+srv://dbCorey:MVDhmYhNQkp2y8T@cluster0-ymebw.mongodb.net/sottlab?retryWrites=true&w=majority"
//     const {MongoClient} = require('mongodb');
//     const client = new MongoClient(uri);
  

//     try {
//     await client.connect();

//     await listDatabases(client);
//     await createListing(client,
//         {
//            user: "New sample",
//            password:"J54fn"
//         }
//     );

// } catch (e) {
//     console.error(e);
// }
// finally {
//     await client.close();
// }
// }
// main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    return databasesList.databases
};

async function listEntries(client){
    entriesList = await client.db('sottlab').collection('sottlab').listEntries();

    return entriesList.Entry
}

async function createListing(client, newListing){
    const result = await client.db("heroku_55584xz8").collection("logindata").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

module.exports = { listDatabases, connect, listEntries }