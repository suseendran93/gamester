const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8082;
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbName = "gamester_dev";
const colName = "customers";
const { check, validationResult } = require("express-validator");
const nodeCleanup = require("node-cleanup");
const uuid = require('node-uuid');
//const CircularJSON = require("circular-json");

//import connectMongo from 'connect-mongo';
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  express.static(__dirname + "/../dist", {
    index: false,
    immutable: true,
    cacheControl: true,
    maxAge: "30d",
  })
);
var cors = require("cors");

var whitelist = ["http://example1.com", "http://example2.com"];
var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
    //if (whitelist.indexOf(origin) !== -1) {
    //  callback(null, true)
    //} else {
    //  callback(new Error('Not allowed by CORS'))
    //}
  },
};

// Then pass them to cors:
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

const nameSchema = new mongoose.Schema({
  username: String,
  password: String,
  confirmpassword: String,
});
var User = mongoose.model("User", nameSchema),
  myData,
  errors;

const uri = "mongodb://127.0.0.1:27017";
//  const uri =  "mongodb+srv://suzeendran:Susee_1993@cluster0-thwgv.mongodb.net/test?retryWrites=true&w=majority";


let db;

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

client.connect((err) => {
  db = client.db(dbName);

  if (err) return console.log(err);

  console.log(`Connected MongoDB: ${uri}`);
  console.log(`Database: ${dbName}`);

  db.createCollection(colName, function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
});

app.use(
  session({
    secret: "secretkey",
    genid: function(req) {
      return uuid.v4();
    },
    ttl: 100 * 60 * 60 * 2,
    clear_interval: 900,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 1 * 60 * 1000,
    },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      client: client,
      dbName:dbName,
      collection: "sessions",
      ttl: 60 * 30
    }),
  })
);

// logic to validate cookie and handle authorization to be done here.
// refer these url      https://decembersoft.com/posts/authenticating-a-session-cookie-in-express-middleware-with-jsonwebtoken/ 
// to proceed further   https://alligator.io/nodejs/express-cookies/
// app.all("*", (req,res, next) => {
//   // cookie doesn't exist redirect to login
//   if(cookieExist(req.headers.cookie)){
//     // how to pass to the next layer ? load the routes below code etc..
//    next(); 
//   }else{
//      res.redirect("/login")
//    }
//  })

nodeCleanup(
  function (exitCode, signal) {
    mongoose.disconnect();
    console.log("Stopping application");
  },
  {
    ctrl_C: "^C",
  }
);
app.listen(port, () => console.log(`Listening on port ${port}...`));
app.get("/customers", (req, res) => {
  res.send("Data reached endpoint");
});
app.post(
  "/customers",
  [
    // username must be an email
    check("username").isEmail(),
    // password must be at least 5 chars long
    check("password").isLength({ min: 5 }),
  ],
  (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    errors = validationResult(req);
    myData = new User(req.body);
    db.collection(colName).insertOne(myData, function (error, response) {
      if (error) {
        console.log("Error occurred while inserting");
        console.log(response);
        res.status(503).send(err);
      } else {
        console.log("Inside the session middleware");
        //console.log("Request: ", CircularJSON.stringify(req));
        console.log('Cookies: ', req.cookies);
        console.log('Signed Cookies: ', req.signedCookies);
        //console.log(JSON.stringify(req.session));
        req.session.username = req.body.username;
        res.status(200).send("OK");

      }
    });
  }
);

app.get("/data", (req, res) => {
  res.send(errors);
});
app.get("/", (req, res) => {
  console.log(JSON.stringify(req.session));
  console.log("Request received");
  res.sendFile(path.join(__dirname, "/../dist", "index.html"));
});
