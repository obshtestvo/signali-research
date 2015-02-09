var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
    title: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Category', Category);