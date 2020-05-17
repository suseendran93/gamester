const express = require('express');
const app = express();
const port = process.env.PORT || 8082;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v4');
const {userValidationRules,validate} = require('./createaccountfieldvalidation.js');
const {check,validationResult} = require('express-validator');
const mongoStore = require('connect-mongo')(session);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//To run server on same Port
app.use(express.static(__dirname + "/../dist", {
  index: false,
  immutable: true,
  cacheControl: true,
  maxAge: "30d"
}));


//session store- start
const connection = mongoose.createConnection("mongodb+srv://suzeendran:Susee_1993@cluster0-thwgv.mongodb.net/gamester_dev?retryWrites=true&w=majority", {
  useUnifiedTopology: true
});
const sessionStore = new mongoStore({
  mongooseConnection: connection,
  collection: 'sessions',
});

//To get session ID
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 //Equals 1 day
  }
}));
//session store-end




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
  var User = mongoose.model("User", nameSchema),myData, errors;


  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../dist', 'index.html'))
  });

   app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../dist', 'index.html'))
   });

  //Create account validation
  app.post('/customers', [
    // username must be an email
    check('username', 'Invalid Email address').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Invalid password').isLength({
      min: 5
    }),
    check('confirmpassword', 'Invalid password').isLength({
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

    //user is schema and customer is collection, this creates user
    app.post('/user', userValidationRules(), validate, (req, res) => {
      User.create({
        username: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword
      }).then(user => res.json(user))
    });

    //Search in DB if user already exists, if not insert record in customers
    var query = {
      username: req.body.username,
    };
    collection.findOne(query, function (err, user) {
      if (err) throw new Error(err);

      if (!user) {
        console.log('User Not found in DB, ready to be inserted');
        myData = new User(req.body);
        console.log(myData);
        collection.insertOne(myData, function (error, response) {

          if (error) {
            console.log(response);
            res.send(400, 'Error occurred while inserting');
            // return 
          } else {
            //console.log('inserted record', response.ops[0]);
            //console.log(response);
            res.send(200, `Customer successfully created.`);
            // return 
          }
        });
      } else
        res.send(409, 'User AlreadyFound in DB! Did you forgot your password?');
    })
  });

  app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname, '/../dist', 'index.html'))
  })
  //Signin validation
  app.post('/login', (req, res) => {
    var query = {
      username: req.body.username,
      password: req.body.password
    };
    collection.findOne(query, function (err, user) {
      if (err) throw new Error(err);
      if (!user) {
        res.send(404, 'User Not found in DB for signing in');
        //res.redirect('/login');
      } else {
        console.log("Sess ID:" + req.sessionID);
        res.header('SessID', req.sessionID);
       res.send(200, `User found, successfully signed in, Welcome`);
        //req.session.userID = req.body.username;
       // res.redirect('/home');

      }
    })
  });

  app.listen(port, () => console.log(`Listening on port ${port}...`));
  // client.close();
});