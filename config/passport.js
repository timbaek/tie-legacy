const LocalStrategy = require('passport-local').Strategy;
const mongoose      = require('mongoose');
const bycrypt       = require('bcrypt');

// load user model
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // match user
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }

          // match password
          bycrypt.compare(password, user.password, (err, isMatched) => {
            if (err) throw err;

            if (isMatched) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });  
}