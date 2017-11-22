const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();

require('./models/User');
require('./services/passport');

// Use environment variables to separate dev from production.
mongoose.connect(keys.mongoURI);

app.use(
    cookieSession({
        // Cookie will last for 30 days.
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');


//Route config
require('./routes/authRoutes')(app);


// Application Routes
app.get('/', (req, res) => {
   res.render('index'); 
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is listening..');  
});