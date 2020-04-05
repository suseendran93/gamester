const express = require('express');
const { check, validationResult } = require('express-validator');
const port = process.env.PORT || 8082;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
var str = "";

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


// Then pass them to cors:
app.use(cors(corsOptions));

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
});
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
app.post('/customers/register', [
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



