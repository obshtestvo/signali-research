var util = require('util');

module.exports = function(app) {
    app.locals({
        errorFor : function(model, property) {

            var errorTag = property ?
                '<span class="error help-inline">%s</span>':
                '<div class="alert alert-danger">%s</div>';

            if (model && model.errors) {
                if (property && model.errors[property]) {
                    var error = model.errors[property];

                    if (error.type == 'required') {
                        var fieldName = error.path[0].toLocaleUpperCase() + error.path.slice(1);
                        var message = util.format('%s is required', fieldName);
                        return util.format(errorTag, message);
                    }

                    return util.format(errorTag, error.type || error.message);
                }
                else if (!property && model.errors.length > 0) {
                    return util.format(errorTag, model.errors.map(function(e) { return e.message; }).join(','));
                }
            }
        },

        display : function(value) {
            if (util.isDate(value)) {
                return value.toLocaleDateString();
            }
            else if (typeof value == "boolean") {
                if (value === true) return "да";
                else return "не";
            }
            else if (value === undefined)
                return "не се знае";

            return value;
        },
        
       dateAsValue : function(date) {
            // check if this is a date 
            if(util.isDate(date)){
                // if so we can format it to RFC3339 specification, 'yyyy-mm-dd'
                var day = date.getDate();
                var month = date.getMonth() + 1; //Months are zero based
                var year = date.getFullYear();
                return year + '-' + (month < 10 ? '0'+month: month) + '-' + day; 
            }

            return date;
        }
    });
};
