const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String},
    title: {type: String},
    description: {type: String},
    status: {type: String},
    date : {type: String}
},
{
    collection: 'todoEvents'
});

module.exports = mongoose.model('Event', eventSchema);