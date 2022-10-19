const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
//const mongoose = require('mongoose');
//   const User = require('../model/user.model.js');
const User = require('../model/usersModule.js');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {                    //for authentication call this function
            User.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, user);

                });
        })
);
