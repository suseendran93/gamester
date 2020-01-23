// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var contactSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
// Export Contact model
var Customer = module.exports = mongoose.model('customer', contactSchema);
module.exports.get = function (callback, limit) {
    Customer.find(callback).limit(limit);
}