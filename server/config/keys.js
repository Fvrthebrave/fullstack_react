// keys.js - figure out what set of credentials to return
if(process.env.NODE_ENV === 'production') {
    // we are in production, return the prod set of keys
    console.log('Production');
    module.exports = require('./prod');
} else {
    // we are in dev, return the dev set of keys
    console.log('Dev');
    module.exports = require('./dev');
}
    