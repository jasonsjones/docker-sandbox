var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String},
    email: {type: String},
    local: {
        username: {type: String},
        password: {type: String}
    },
    admin: {type: Boolean, default: false},
    createdDate: {type: Date, default: Date.now()}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
