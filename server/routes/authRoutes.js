const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email'] 
        })
    );
    
    app.get('/auth/google/callback', passport.authenticate('google'));
    
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send('You have been logged out..');
    });
    
    app.get('/api/current_user', (req, res) => {
        if(req.user) {
            res.send(req.session);
        } else {
            res.send('No current user!');
        }
    });
};