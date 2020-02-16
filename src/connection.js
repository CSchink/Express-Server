// const mongodb = require('mongodb');

// // Create seed data

// let seedData = [
//   {
//     decade: '1970s',
//     artist: 'Debby Boone',
//     song: 'You Light Up My Life',
//     weeksAtOne: 10
//   },
//   {
//     decade: '1980s',
//     artist: 'Olivia Newton-John',
//     song: 'Physical',
//     weeksAtOne: 10
//   },
//   {
//     decade: '1990s',
//     artist: 'Mariah Carey',
//     song: 'One Sweet Day',
//     weeksAtOne: 16
//   }
// ];

// // Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname

// let uri = 'mongodb://schinkc:dkvqkv4dj1t54ph0hokb86o9us@ds119171.mlab.com:19171/heroku_2b5jhzp9';

// mongodb.MongoClient.connect(uri, function(err, client) {

//   if(err) throw err;

//   /*
//    * Get the database from the client. Nothing is required to create a
//    * new database, it is created automatically when we insert.
//    */

//   let db = client.db('heroku_2b5jhzp9')

//   /*
//    * First we'll add a few songs. Nothing is required to create the
//    * songs collection; it is created automatically when we insert.
//    */

//   let songs = db.collection('songs');

//    // Note that the insert method can take either an array or a dict.

//   songs.insert(seedData, function(err, result) {

//     if(err) throw err;

//     /*
//      * Then we need to give Boyz II Men credit for their contribution
//      * to the hit "One Sweet Day".
//      */

//     songs.update(
//       { song: 'One Sweet Day' },
//       { $set: { artist: 'Mariah Carey ft. Boyz II Men' } },
//       function (err, result) {

//         if(err) throw err;

//         /*
//          * Finally we run a query which returns all the hits that spend 10 or
//          * more weeks at number 1.
//          */

//         songs.find({ weeksAtOne : { $gte: 10 } }).sort({ decade: 1 }).toArray(function (err, docs) {

//           if(err) throw err;

//           docs.forEach(function (doc) {
//             console.log(
//               'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
//               ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
//             );
//           });

//           // Since this is an example, we'll clean up after ourselves.
          

//             // Only close the connection when your app is terminating.
//             client.close(function (err) {
//               if(err) throw err;
//             });
//         });
//       }
//     );
//   });
// });


async function main(){
    const uri="mongodb+srv://dbCorey:MVDhmYhNQkp2y8T@cluster0-ymebw.mongodb.net/sottlab?retryWrites=true&w=majority"
    const {MongoClient} = require('mongodb');
    const client = new MongoClient(uri);
  

    try {
    await client.connect();

    await listDatabases(client);
    await createListing(client,
        {
           user: "New sample",
           password:"J54fn"
        }
    );

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

async function createListing(client, newListing){
    const result = await client.db("heroku_55584xz8").collection("logindata").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
