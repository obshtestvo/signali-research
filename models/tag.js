var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tag = new Schema({
    	title: { type: String, required: true }
	},
	{
		toJSON: {
			transform: function (doc, ret, options) {
			  return {"title":ret.title};
			}
		}
	});


module.exports = mongoose.model('Tag', Tag);