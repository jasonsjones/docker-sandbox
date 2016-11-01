var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema(
    {
        item: {type: String},
        completed: {type: Boolean, default: false},
        dueDate: {type: Date, default: null},
        note: {type: Schema.ObjectId, ref: 'Note'},
        createdBy: {type: Schema.ObjectId, ref: 'User'}
    },
    {
        timestamps: {
            createdAt: 'createdDate',
            updatedAt: 'modifiedDate'
        }
    });

todoSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Todo', todoSchema);
