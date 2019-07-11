
const mongoose = require('mongoose');
const passport = require('passport');

const BearerStrategy = require('passport-azure-ad').BearerStrategy;
const config = require('./config');
const Users = mongoose.model('Users');


var options = {
    // The URL of the metadata document for your app. We will put the keys for token validation from the URL found in the jwks_uri tag of the in the metadata.
    identityMetadata: config.creds.identityMetadata,
    clientID: config.creds.clientID,
    validateIssuer: config.creds.validateIssuer,
    issuer: config.creds.issuer,
    passReqToCallback: config.creds.passReqToCallback,
    isB2C: config.creds.isB2C,
    policyName: config.creds.policyName,
    allowMultiAudiencesInToken: config.creds.allowMultiAudiencesInToken,
    audience: config.creds.audience,
    loggingLevel: config.creds.loggingLevel,
};

passport.use(new BearerStrategy(options,
    function (token, done) {
        log.info(token, 'was the token retreived');
        if (!token.oid)
            return done(new Error('oid is not found in token'));
        else {
            owner = token.oid;
            return done(null, token);
        }
    }
    // function (token, done) {
    //     log.info('verifying the user');
    //     log.info(token, 'was the token retreived');
    //     findById(token.oid, function (err, user) {
    //         if (err) {
    //             return done(err);
    //         }
    //         if (!user) {
    //             // "Auto-registration"
    //             log.info('User was added automatically as they were new. Their oid is: ', token.oid);
    //             users.push(token);
    //             owner = token.oid;
    //             return done(null, token);
    //         }
    //         owner = token.oid;
    //         console.log('USER',user);
    //         console.log('TOKEN',token);
    //         return done(null, user, token);
    //     });
    // }
));