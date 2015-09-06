var User = require('../../models/admin/user'),
    mapper = require('../../lib/model-mapper');

module.exports = function(app) {

    app.param('userId', function(req, res, next, id) {
        User.findById(id, function(err, user) {
            if (err) {
                next(err);
            } else {
                res.locals.user = user;
                next();
            }
        });
    });
    
    app.get('/admin/users', function(req, res) {
        User.find({}, function(err, users) {
            res.render('admin/user/index', { users : users });
        });
    });

    app.get('/admin/users/create', function(req, res) {
        res.render('admin/user/create', { user : new User() });
    });

    app.post('/admin/users/create', function(req, res) { 
        var user = new User(req.body);

        user.save(function(err) {
            if (err) {
                res.render('admin/user/create', {
                    user : user
                });
            } else {
                res.redirect('/admin/users');
            }
        });
    });

    app.get('/admin/users/:userId/edit', function(req, res) {
        res.render('admin/user/edit');
    });

    app.post('/admin/users/:userId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.user);

        res.locals.user.save(function(err) {
            if (err) {
                res.render('admin/user/edit');
            } else {
                res.redirect('/admin/users');
            }
        });
    });

    app.get('/admin/users/:userId/detail', function(req, res) {
        res.render('admin/user/detail');
    });

    app.get('/admin/users/:userId/delete', function(req, res) {
        res.render('admin/user/delete');
    });

    app.post('/admin/users/:userId/delete', function(req, res) {
        User.remove({ _id : req.params.userId }, function(err) {
            res.redirect('/admin/users');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'User',
    route : '/admin/users'
}
