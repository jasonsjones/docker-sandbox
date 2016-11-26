module.exports = function (user) {
    var batmanTodos = [
        {
            item: 'Save Gotham from all evil villians',
            dueDate: new Date('2016-12-16'),
            createdBy: user._id
        },
        {
            item: 'Give Robin a raise',
            dueDate: new Date('2017-01-17'),
            createdBy: user._id
        },
        {
            item: 'Send the Joker a Christmas card',
            dueDate: new Date('2016-12-21'),
            createdBy: user._id
        },
        {
            item: 'Remodel the Bat cave',
            completed: true,
            createdBy: user._id
        }
    ];
    return batmanTodos;
};
