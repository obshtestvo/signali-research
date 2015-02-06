var Category = require('../models/category'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('categoryId', function(req, res, next, id) {
        Category.findById(id, function(err, category) {
            if (err) {
                return next(err);
            }
            
            if (!category) {
                return res.send(404);
            }

            res.locals.category = category;
            next();
        });
    });
    
    app.get('/categories', function(req, res) {
        Category.find({}, function(err, categories) {
            res.json(categories);
        });
    });

    app.post('/categories', function(req, res) { 
        var category = new Category(req.body);

        category.save(function(err) {
            if (err) {
                res.json(400, err);
            } else {
                res.send(204);
            }
        });
    });

    app.get('/categories/:categoryId', function(req, res) {
        res.json(res.locals.category);
    });

    app.put('/categories/:categoryId', function(req, res) {
        var category = res.locals.category;
        mapper.map(req.body).to(category);

        category.save(function(err) {
            if (err) {
                res.json(400, err);
            } else {
                res.send(204);
            }
        });
    });

    app.delete('/categories/:categoryId/delete', function(req, res) {
        Category.remove({ _id : req.params.categoryId }, function(err) {
            if (err) {
                res.json(400, err);
            } else {
                res.send(204);
            }
        });
    });
}
