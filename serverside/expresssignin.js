
const express = require('express');
const port = process.env.PORT || 8082;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/gamester_dev");
// console.log('Mongose',mongoose.Schema.ObjectId);
var nameSchema = new mongoose.Schema({
    username: String,
    password: String
});

console.log("userinfo",nameSchema);

var User = mongoose.model("Susee", nameSchema);

app.post('/customers', (req, res) => {

    var myData = new User(req.body);
    console.log(myData);
    myData.save()
        .then(item => {
           res.send(item.username);  
                 
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
app.listen(port, () => console.log(`Listening on port ${port}...`));



