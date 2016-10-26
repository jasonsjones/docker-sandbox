var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    content: {type: String},
    parentId: {type: String}
});

module.exports = mongoose.model('Note', noteSchema);
