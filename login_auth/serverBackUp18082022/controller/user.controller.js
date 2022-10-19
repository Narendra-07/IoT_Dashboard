const mongoose = require('mongoose');
//require('./config/passportConfig.js');
//const User = mongoose.model('Users');
const User = require('../model/user.model.js');
const passport = require('passport');
const _ = require('lodash');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.path = req.body.path;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}

// //take values of email n password
// module.exports.authenticate = (req, res, next) => {
//     // call for passport authentication
//     passport.authenticate('local', (err, user, info) => {
//         if (err) return res.status(400).json(err);
//         // error from passport middleware 
//         // registered user
//         else if (user)
//         {
//         return res.status(200).json({ "token": user.generateJwt() });
//     }
//         // unknown user or wrong password  it return message from passport.config
//         else 
       
//         return res.status(404).json(info);
//     })(req, res);
// }

