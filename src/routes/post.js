var MongoClient = require('mongodb').MongoClient;
var uri="mongodb+srv://dbCorey:MVDhmYhNQkp2y8T@cluster0-ymebw.mongodb.net/sottlab?retryWrites=true&w=majority"

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var database = db.db("sottlab");
  database.createCollection("Lighthouse", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});