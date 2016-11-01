var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema(
    {
        content: {type: String},
        parentId: {type: String}
    },
    {
        timestamps: {
            createdAt: 'createdDate',
            updatedAt: 'modifiedDate'
        }
    });

module.exports = mongoose.model('Note', noteSchema);
