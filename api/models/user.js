var bcrypt = require('bcrypt-nodejs');
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
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.hashDefaultPassword = function () {
    var password = this.local.password;
    if (password === defaultPassword) {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(this.local.password, salt);
    }
};

module.exports = mongoose.model('User', userSchema);
