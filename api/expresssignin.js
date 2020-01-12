const express = require('express');
const port = process.env.PORT || 8082;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.Promise = global.Promise; mongoose.connect("mongodb://localhost:27017/gamester_dev");
var nameSchema = new mongoose.Schema({
    username: String,
    password: String
});

var User = mongoose.model("User", nameSchema);

app.post('/customers', (req, res) => {
    // const response =

    // {
    //     username: req.body.username,
    //     password: req.body.password,
    // }
    // res.send(response);
    var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });


    

});
app.listen(port, () => console.log(`Listening on port ${port}...`));

