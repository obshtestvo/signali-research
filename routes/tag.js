var Tag = require('../models/tag'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('tagId', function(req, res, next, id) {
        Tag.findById(id, function(err, tag) {
            if (err) {
                return next(err);
            }
            
            if (!tag) {
                return res.send(404);
            }

            res.locals.tag = tag;
            next();
        });
    });
    
    app.get('/tags', function(req, res) {
        Tag.find({}, function(err, tags) {
            res.json(tags);
        });
    });

    app.post('/tags', function(req, res) { 
        var tag = new Tag(req.body);

        tag.save(function(err) {
            if (err) {
                res.json(400, err);
            } else {
                res.send(204);
            }
        });
    });

    app.get('/tags/:tagId', function(req, res) {
        res.json(res.locals.tag);
    });

    app.put('/tags/:tagId', function(req, res) {
        var tag = res.locals.tag;
        mapper.map(req.body).to(tag);

        tag.save(function(err) {
            if (err) {
                res.json(400, err);
            } else {
                res.send(204);
            }
        });
    });

    app.delete('/tags/:tagId/delete', function(req, res) {
        Tag.remove({ _id : req.params.tagId }, function(err) {
            if (err) {
                res.json(400, err);
            } else {
                res.send(204);
            }
        });
    });
}
