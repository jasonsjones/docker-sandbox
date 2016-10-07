var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String},
    email: {type: String},
    admin: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now()}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
