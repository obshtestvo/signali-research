var Signal = require('../models/signal'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

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

    app.get('/signals/create', function(req, res) {
        res.render('signal/create', { signal : new Signal() });
    });

    app.post('/signals/create', function(req, res) { 
        var signal = new Signal(req.body);

        signal.save(function(err) {
            if (err) {
                res.render('signal/create', {
                    signal : signal
                });
            } else {
                res.redirect('/signals');
            }
        });
    });

    app.get('/signals/:signalId/edit', function(req, res) {
        res.render('signal/edit');
    });

    app.post('/signals/:signalId/edit', function(req, res) {
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
    name : 'Signal',
    route : '/signals'
}
