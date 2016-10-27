var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    item: {type: String},
    completed: {type: Boolean, default: false},
    createdDate: {type: Date, default: Date.now()},
    modifiedDate: {type: Date, default: null},
    dueDate: {type: Date, default: null},
    note: {type: Schema.ObjectId, ref: 'Note'},
    createdBy: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Todo', todoSchema);
