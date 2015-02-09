var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Signal = new Schema({
    type: { type: String, required: true, default: "signal" },
    category: { type: String, required: true  },
    institution: { type: String, required: true },
    url: { type: String },
    email: { type: String },
    i18n: { type: Boolean },
    answerGuarantee: { type: Boolean },
    answerTimeFrame: { type: Number },
    anonimity: { type: Boolean },
    verification: { type: Boolean },
    confirmation: { type: Boolean },
    responsive: { type: Boolean },
    middleMan: { type: Boolean },
    tags: { type: [String] },

    requirements: {
        registration: { type: Boolean },
        photo: { type: Boolean },
        esignature: { type: Boolean },
        name: { type: Boolean },
        email: { type: Boolean },
        egn: { type: Boolean },
        address: { type: Boolean },
        location: { type: Boolean }
    }
    
});

module.exports = mongoose.model('Signal', Signal);