const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relanceSchema = new Schema({
    date: { type: Date, default: new Date() },
    json: { type: String},
    doc: { type: String}
});

module.exports = mongoose.model('Relance', relanceSchema);