const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    keys = require('../config/keys'),
    mongoose = require('mongoose'),
    User = mongoose.model('user');


// Stores the user's id in the session..
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Uses the stored id within the session to deserialize user.
// User object is attached to the request as req.user!
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
            .then(existingUser => {
                if(existingUser) {
                        console.log('User exists.. logging in.');
                    done(null, existingUser);
                } else {
                    new User({googleId: profile.id}).save()
                        .then(user => {done(null, user);
                    });
                }
            });
    })
);