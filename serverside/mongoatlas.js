const express = require('express');
const port = process.env.PORT || 8082;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = "mongodb+srv://suzeendran:Susee_1993@cluster0-thwgv.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("gamester_dev").collection("customers");
    // perform actions on the collection object
    var nameSchema = new mongoose.Schema({ username: String, password: String });
    var User = mongoose.model("User", nameSchema);


    app.post('/customers', (req, res) => {

        var myData = new User(req.body);
        console.log(myData);
        collection.insertOne(myData);
        

       
    });
    app.listen(port, () => console.log(`Listening on port ${port}...`));
    // client.close();
});
