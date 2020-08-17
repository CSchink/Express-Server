const connection = require("./connection.js");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const secretKey = "Johnny Be Good";

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express Router:
// const router = express.Router();
// router.get()
// app.use(router);



app.post("/login", async function (req, res, next) {

  let client = await connection.connect();
  let confirmation = await connection.userCheck(
    client,
    req.body.username,
    req.body.password
  );
  // res.sendStatus(200)
  if (confirmation) {
    const token = jwt.sign("Hello world", secretKey);
    console.log(token);
    res.json(token);
  } else {
    res.sendStatus(400);
  }
});



app.use((req, res, next) => {
  console.log("middleware");
  // verify token

  
  let token = req.headers.authorization;
  console.log(token);

  try {
    let verify = jwt.verify(token, secretKey);

    console.log(verify);

    // if verifying token succeeds continue
    next();
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
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function (req, res) {
  console.log("route handler");
  res.send("Hello John!!");
});

app.get("/listDatabases", async function (req, res) {
  let client = await connection.connect();
  let databases = await connection.listDatabases(client);
  res.json(databases);
});

app.get("/listEntries", async function (req, res) {
  let client = await connection.connect();
  let entries = await connection.listEntries(client);
  res.json(entries);
});

app.get("/listScienceEntries", async function (req, res) {
  let client = await connection.connect();
  let entries = await connection.listScienceEntries(client);
  res.json(entries);
});

app.get("/deleteEntries", async function (req, res) {
  let client = await connection.connect();
  let update = await connection.deleteEntries(client, "John");
  res.json(update);
});

app.post("/createEntry", async function (req, res) {
  let client = await connection.connect();
  let newEntry = await connection.createEntry(client, req.body)
  res.json(newEntry)
//   .then(result =>{
//       console.log(result)
//   })
//   console.log(req.body)
//   let newEntry = await connection.createEntry(client, {
//     Date: req.body.date,
//     Entry: req.body.entry,
//     Century: req.body.century,
//     Category: req.body.category,
//     Originating: req.body.origin,
//     Target: req.body.target,
//     Cultural: [req.body.ctags],
//     ptags: [req.body.ptags],
//     htags: [req.body.tags],
//     Source: req.body.source,
//     Page: req.body.page,
//   });
//   res.json(newEntry);
});

app.post("/createScienceEntry", async function(req, res) {
  let client = await connection.connect();
  let newEntry = await connection.createScienceEntry(client, req.body)
  res.json(newEntry);
})

app.put("/editData", async function (req, res) {
  console.log(req.body)
  let client = await connection.connect();
  let findOne = await connection.editData(client, req.body);

  res.json(findOne)
});

app.post("/signup", async function(req, res) {
  let client = await connection.connect();
  let newUser = await connection.newUser(client, req.body)
  res.json(newUser)
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Example app is now listening on port 3000");
});
