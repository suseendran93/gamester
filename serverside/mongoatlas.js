const express = require('express');
const port = process.env.PORT || 8082;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const uuid = require('uuid/v4');
const {userValidationRules,validate} = require('./signinfieldvalidation.js');
const app = express();
const {check,validationResult} = require('express-validator');

app.use(bodyParser.urlencoded({
  extended: false
}));

//To run server on same Port
app.use(express.static(__dirname + "/../dist", {
  index: false,
  immutable: true,
  cacheControl: true,
  maxAge: "30d"
}));

//To eliminate cors issue
var cors = require('cors');

var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
    //if (whitelist.indexOf(origin) !== -1) {
    //  callback(null, true)
    //} else {
    //  callback(new Error('Not allowed by CORS'))
    //}
  }
}

app.use(bodyParser.json());

const uri = "mongodb+srv://suzeendran:Susee_1993@cluster0-thwgv.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useUnifiedTopology: true
});

client.connect(err => {
  const collection = client.db("gamester_dev").collection("customers");
  // perform actions on the collection object
  var nameSchema = new mongoose.Schema({
    username: String,
    password: String,
    confirmpassword: String
  });
  mongoose.Promise = global.Promise;
  var User = mongoose.model("User", nameSchema),
    myData, errors;
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 100000
  }))
  app.use(bodyParser.json({
    limit: '50mb',
    parameterLimit: 100000
  }));

  /*Example endpoint*/
  // Then pass them to cors:
  app.use(cors(corsOptions));

  //To get session ID
  app.use(session({
    genid: (req) => {
      console.log('Inside the session middleware')
      //console.log(req.sessionID)
      return uuid(); // use UUIDs for session IDs
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });
  app.get('/customers', (req, res) => {
  console.log(res);
  res.send("Data reached endpoint")}
  );
  app.post('/customers', [
    // username must be an email
    check('username').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({
      min: 5
    }),
    check('confirmpassword').isLength({
      min: 5
    })
  ], (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    app.post('/user', userValidationRules(), validate, (req, res) => {
      User.create({
        username: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword
      }).then(user => res.json(user))
    });


    myData = new User(req.body);
    console.log(myData);
    collection.insertOne(myData, function (error, response) {
      if (error) {
        console.log('Error occurred while inserting');
        console.log(response);
        // return 
      } else {
        console.log('inserted record', response.ops[0]);
        //console.log(response);
        console.log(req.sessionID);
        res.send(200);
        // return 
      }
    });;

  });
  //app.get('/data', (req, res) => res.send(errors));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../dist', 'index.html'))
  });
  app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../dist', 'index.html'))
  });
  app.listen(port, () => console.log(`Listening on port ${port}...`));
  // client.close();
});