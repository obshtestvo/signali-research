var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tag = new Schema({
    title: { type: String, required: true }
});

module.exports = mongoose.model('Tag', Tag);