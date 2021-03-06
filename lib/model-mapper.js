var util = require('util');

var ModelMapper = function(source, opt) {
    this.source = source;
    this.opt = opt || {};   
    this.opt.excludes = this.opt.excludes || [ 'id', '_id' ];
}

ModelMapper.prototype.to = function(model) {
    var self = this;

    model.schema.eachPath(function(key, path) {

        if (self.opt.includes) {
            if (self.opt.includes.indexOf(key) < 0) {
                return;
            }
        }
        
        if (self.opt.excludes.indexOf(key) >= 0) {
            return;
        }

        if (path.options.type == Boolean) {

            var valueRaw = self.source[key];

            if (key in self.source) {
                if (util.isArray(valueRaw)) {
                    valueRaw = valueRaw.pop();
                }
            }

            if (valueRaw!='undefined')
                model.set(key, valueRaw=='true' || valueRaw=='1' || valueRaw=='on');
        }
        else if (path.options.type == Array && key in self.source && typeof self.source[key] == "string") {
            //assume comma separation!!!
            model.set(key, self.source[key].split(','));
        }
        else if (key + "_undef" in self.source && self.source[key + "_undef"]) {
            delete self.source[key];
            model.set(key,undefined);
        } 
        else if (key in self.source) {
            var value = self.source[key];
            model.set(key, value);
        }
    });
}

module.exports.map = function(source, opt) {
    return new ModelMapper(source, opt);
}

