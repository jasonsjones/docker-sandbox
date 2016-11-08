module.exports = function (user) {

    var supermanTodos = [
        {
            item: 'Save Metropolis from all evil villians',
            createdBy: user._id
        },
        {
            item: 'Stay away from kryptonite',
            dueDate: new Date('2017-02-22'),
            createdBy: user._id
        },
        {
            item: 'Get big scoop for the Daily Planet',
            createdBy: user._id
        },
        {
            item: 'Ask Lois out on a date',
            createdBy: user._id
        }
    ];
    return supermanTodos;
}
