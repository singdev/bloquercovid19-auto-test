const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const impactSchema = new Schema({
    date: { type: Date, default: new Date() },
    json: { type: String} 
});

module.exports = mongoose.model('Impact', impactSchema);