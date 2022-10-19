const mongoose = require('mongoose');
//require('./config/passportConfig.js');
//const User = mongoose.model('Users');
const user = require('../model/user.model');
const User = require('../model/usersModule.js');
const passport = require('passport');
const _ = require('lodash');


module.exports.register = (req, res, next) => {
    var users = new User();
    let date_ob = new Date();
    users.userName = req.body.userName;
    users.email = req.body.email;
    users.password = req.body.password;
    users.companyName = req.body.companyName;
    users.phone = req.body.phone;
    users.role = req.body.role;
    users.createdBy = req.body.createdBy;
    users.createdDate = date_ob;
    users.path = req.body.path;

    users.save((err, doc) => {
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


// // take values of email n password
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, users, info) => {
        console.log("Users in authenticate is",users);
        if (err) return res.status(400).json(err);
        // error from passport middleware 
        // registered user
        else if (users){
        return res.status(200).json({ "token": users.generateJwt() });}
        // unknown user or wrong password  it return message from passport.config
        else 
       
        return res.status(404).json(info);
    })(req, res);
}



exports.list_all_user = (req, res) => {     
    User.find({}, (err,users) => {
      if (err) {
        console.log("error!!!!!!!!!!", err)
        res.send(err);
      }
      res.json(users);
    
    }
    );
  };