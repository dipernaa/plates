var mongoose = require('mongoose');

var PlateSchema = new mongoose.Schema({
    state: {
        type: String,
        uppercase: true,
        required: true
    },
    number: {
        type: String,
        uppercase: true,
        required: true
    },
    messages: [String]
});

PlateSchema.index({
    state: 1,
    number: 1
}, { unique: true });

module.exports = mongoose.model('Plate', PlateSchema);