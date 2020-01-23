// contactController.js
// Import contact model
Customer = require('./contactModel');
// Handle index actions
exports.index = function (req, res) {
    Customer.get(function (err, customer) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: customer
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var customer = new Customer();
    customer.username = req.body.username ? req.body.username : customer.username;
    customer.password = req.body.password;
// save the contact and check for errors
    customer.create(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New contact created!',
            data: customer
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Customer.findById(req.params.contact_id, function (err, customer) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: customer
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
    Customer.findById(req.params.contact_id, function (err, customer) {
        if (err)
            res.send(err);
            customer.username = req.body.username ? req.body.username : customer.username;
            customer.password = req.body.password;
// save the contact and check for errors
        customer.create(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: customer
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Customer.remove({
        _id: req.params.customer_id
    }, function (err, customer) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};