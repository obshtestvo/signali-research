var Location = require('../models/location'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('locationId', function(req, res, next, id) {
        Location.findById(id, function(err, location) {
            if (err) {
                return next(err);
            }
            
            if (!location) {
                return res.send(404);
            }

            res.locals.location = location;
            next();
        });
    });
    
    app.get('/locations', function(req, res) {
        Location.find({}, function(err, locations) {
            res.json(locations);
        });
    });

    app.post('/locations', function(req, res) { 
        var location = new Location(req.body);

        location.save(function(err) {
            if (err) {
                res.json(400, err);
            } else {
                res.send(204);
            }
        });
    });

    app.get('/locations/:locationId', function(req, res) {
        res.json(res.locals.location);
    });

    app.put('/locations/:locationId', function(req, res) {
        var location = res.locals.location;
        mapper.map(req.body).to(location);

        location.save(function(err) {
            if (err) {
                res.json(400, err);
            } else {
                res.send(204);
            }
        });
    });

    app.delete('/locations/:locationId/delete', function(req, res) {
        Location.remove({ _id : req.params.locationId }, function(err) {
            if (err) {
                res.json(400, err);
            } else {
                res.send(204);
            }
        });
    });
}
