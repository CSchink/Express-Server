async function main(){
    const uri="mongodb://heroku_2b5jhzp9:dkvqkv4dj1t54ph0hokb86o9us@ds119171.mlab.com:19171/heroku_2b5jhzp9"
    const {MongoClient} = require('mongodb');
    const client = new MongoClient(uri);
  

    try {
    await client.connect();

    await listDatabases(client);
    // await createListing(client,
    //     {
    //        user: "New sample",
    //        password:"J54fn"
    //     }
    // );

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

// async function createListing(client, newListing){
//     const result = await client.db("heroku_55584xz8").collection("logindata").insertOne(newListing);
//     console.log(`New listing created with the following id: ${result.insertedId}`);
// }
