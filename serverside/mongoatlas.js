const express = require('express');
const port = process.env.PORT || 8082;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
var contactController = require('./contactController');
const app = express();
const {check, validationResult} = require('express-validator');
app.use(bodyParser.urlencoded({
    extended: false
}));
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
        password: String
    });
    var User = mongoose.model("User", nameSchema), myData, errors;

    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
        parameterLimit: 100000
      }))
      app.use(bodyParser.json({
        limit: '50mb',
        parameterLimit: 100000
      }));
    app.get('http://localhost:8082/customers', (req, res) => res.send("Data reached endpoint"));
    app.post('http://localhost:8082/customers', [
        // username must be an email
        check('username').isEmail(),
        // password must be at least 5 chars long
        check('password').isLength({
            min: 5
        })
    ], (req, res) => {

        res.setHeader('Access-Control-Allow-Origin', '*');
        errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({
        //         errors: errors.array()
        //     });
        // }
        myData = new User(req.body);
        // console.log(myData);
        collection.insertOne(myData);

    });
    app.get('/data', (req, res) => res.send(errors));

    app.listen(port, () => console.log(`Listening on port ${port}...`));
    // client.close();
});