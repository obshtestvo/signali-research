var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Location = new Schema({
	no: { type: String, required: true, unique: true },
    name: { type: String, required: true}
});

module.exports = mongoose.model('Location', Location);