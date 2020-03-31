const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoTestSchema = new Schema({
    date: { type: Date, default: Date.now()},
    json: { type: String} 
});

module.exports = mongoose.model('AutoTest', autoTestSchema);