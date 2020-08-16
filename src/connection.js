async function connect() {
  const uri =
    "mongodb+srv://dbCorey:MVDhmYhNQkp2y8T@cluster0-ymebw.mongodb.net/sottlab?retryWrites=true&w=majority";

  const { MongoClient } = require("mongodb");
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

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  return databasesList.databases;
}

async function listEntries(client) {
  const cursor = await client.db("sottlab").collection("historylab1").find({});
  let results = await cursor.toArray();
  //
  results.forEach((result) => {
    //
    Object.keys(result).forEach((key) => {
      if (typeof result[key] === "string") {
        result[key] = result[key].trim();
      } else if (Array.isArray(result[key])) {
        result[key] = result[key]
          .filter((value) => value != null)
          .map((value) => value.trim());
      }
    });
  });

  return results;
}

async function userCheck(client, username, password) {
  const cursor = await client
    .db("sottlab")
    .collection("logindata")
    .find({})
    .limit(10);
  let results = await cursor.toArray();
  let confirmation = results.some(function (result) {
    console.log(result);
    if (result.user === username && result.password === password) {
      return true;
    } else {
      return false;
    }
  });
  return confirmation;
}

async function deleteEntries(client, userName) {
  result = await client
    .db("sottlab")
    .collection("logindata")
    .deleteOne({ user: userName });
  console.log(`${result.deletedCount} document(s) were deleted.`);
}

async function createEntry(client, newEntry) {
  const result = await client
    .db("sottlab")
    .collection("historylab1")
    .insertOne(newEntry);
  console.log(`New entry created with the following id: ${result.insertedId}`);
  return result;
}

async function createScienceEntry(client, newEntry) {
  const result = await client
    .db("sottlab")
    .collection("sciencelab")
    .insertOne(newEntry);
  console.log(`New entry created with the following id: ${result.insertedId}`);
  return result;
}

async function userConfirm() {
  let userData = axios.get("http://localhost:3000/userCheck");
  let results = userData.filter((x) => {
    return x.user;
  });
  return results;
}

async function editData(client, entry) {
  console.log(entry);
  let id = entry._id;
  let editData = await client
    .db("sottlab")
    .collection("historylab1")
    .updateOne(
      { _id: id },
      {
        $set: {
          Date: entry.date,
          Entry: entry.Entry,
          Century: entry.Century,
          Category: entry.Category,
          Origin: entry.Origin,
          Target: entry.Target,
          Cultural: entry.Cultural,
          ptags: entry.ptags,
          htags: entry.htags,
          Source: entry.Source,
          Page: entry.Page,
        },
      }
    );
  return editData;
}

async function listScienceEntries(client) {
  const cursor = await client.db("sottlab").collection("sciencelab").find({});
  let results = await cursor.toArray();
  return results;
}

module.exports = {
  listScienceEntries,
  userCheck,
  createScienceEntry,
  userConfirm,
  listDatabases,
  connect,
  listEntries,
  deleteEntries,
  createEntry,
  editData,
};
