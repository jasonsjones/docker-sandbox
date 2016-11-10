var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var defaultPassword = 'p@ssw0rd';

var userSchema = new Schema({
    name: {
        first: {type: String},
        last: {type: String}
    },
    email: {type: String},
    local: {
        username: {type: String},
        password: {type: String, default: defaultPassword}
    },
    admin: {type: Boolean, default: false},
    createdDate: {type: Date, default: Date.now()}
});

userSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
});

userSchema.set('toJSON', {virtuals: true});

userSchema.methods.verifyPassword = function (password) {
    return this.local.password === password;
};

module.exports = mongoose.model('User', userSchema);
