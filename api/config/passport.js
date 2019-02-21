// Dependencies
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('../config/index');

// Models
const User = require('../models/user');

// Logique d'authentification JWT
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = config.secret;

// Stratégie authentification user
passport.use('user-jwt', new JwtStrategy(opts, (jwtPayload, done) => {
  User.findById(jwtPayload.sub).then((client) => {
    if (client) {
      done(null, client);
    } else {
      done(null, false);
    }
  }).catch(err => console.log(err));
}));
