var Signal = require('../models/signal'),
    Category = require('../models/category'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    function setLocals(req,res,next) {
        Category.find({},function(err,categories) {
            res.locals.categories = categories.map(function(obj) { return obj.title; });
            res.locals.types = {
                values: ["signal","recommendation","complaint"],
                titles: ["Сигнал", "Препоръка", "Оплакване"]
            };
            next();
        })
    }

    function translateBooleans(req,res,next) {
        res.locals.signal.schema.eachPath(function(key,path) {

            if (path.options.type == Boolean) {

                console.log(key + ": " + res.locals.signal.get(key));

                if (res.locals.signal.get(key) === true)
                    res.locals.signal.set(key,"да");
                else if (res.locals.signal.get(key) === false)
                    res.locals.signal.set(key,"не");
                else res.locals.signal[key] = "не се знае";
            }
        });

        next();
    }
    
    app.param('signalId', function(req, res, next, id) {
        Signal.findById(id, function(err, signal) {
            if (err) {
                next(err);
            } else {
                res.locals.signal = signal;
                next();
            }
        });
    });
    
    app.get('/signals', function(req, res) {
        Signal.find({}, function(err, signals) {
            res.render('signal/index', { signals : signals });
        });
    });

    app.get('/signals/create', setLocals, function(req, res) {
        res.render('signal/create', { signal : new Signal() });
    });

    app.post('/signals/create', setLocals, function(req, res) { 
        var signal = new Signal();
        mapper.map(req.body).to(signal);

        signal.save(function(err) {
            if (err) {
                res.render('signal/create', { signal : signal });
            } else {
                res.redirect('/signals');
            }
        });
    });

    app.get('/signals/:signalId/edit', setLocals, function(req, res) {
        res.render('signal/edit');
    });

    app.post('/signals/:signalId/edit', setLocals, function(req, res) {
        mapper.map(req.body).to(res.locals.signal);

        res.locals.signal.save(function(err) {
            if (err) {
                res.render('signal/edit');
            } else {
                res.redirect('/signals');
            }
        });
    });

    app.get('/signals/:signalId/detail', function(req, res) {
        res.render('signal/detail');
    });

    app.get('/signals/:signalId/delete', function(req, res) {
        res.render('signal/delete');
    });

    app.post('/signals/:signalId/delete', function(req, res) {
        Signal.remove({ _id : req.params.signalId }, function(err) {
            res.redirect('/signals');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Сигнали',
    route : '/signals'
}
