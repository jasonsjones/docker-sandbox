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

// execute before each user.save() call
userSchema.pre('save', function (callback) {
    var user = this;

    // early return if the password is not modified
    if (!user.isModified('local.password')) {
        return callback();
    }

    // the password has changed, so we need to hash it before saving
    console.log('this is where the password will be hashed and saved');
    callback();
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
    } else {
        return this.local.password;
    }
};

userSchema.methods.toJSONObj = function () {
    var user = this.toObject();
    delete user.local.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);
