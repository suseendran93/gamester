
const express = require('express');
const { check, validationResult } = require('express-validator');
const port = process.env.PORT || 8082;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
var str = "";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/gamester_dev");
// console.log('Mongose',mongoose.Schema.ObjectId);
var nameSchema = new mongoose.Schema({
    username: String,
    password: String
});

console.log("userinfo", nameSchema);

var User = mongoose.model("Susee", nameSchema);

app.post('/customers', [
    // username must be an email
    check('username').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })],
    (req, res) => {

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



