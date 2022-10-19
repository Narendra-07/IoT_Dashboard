const mongoose = require('mongoose');
const Role = require('../model/masterRole-modul');
//const Role=mongoose.module("Role");

module.exports.setRole = (req, res, next) => {
    var role = new Role();
    role.Role_Id = req.body.Role_Id;
    role.RoleName = req.body.RoleName;
    role.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate Role_Id found.']);
            else
                return next(err);
        }
    });
}

exports.list_all_roles = (req, res) => {     
    Role.find({}, (err, role) => {
      if (err) {
        console.log("error!!!!!!!!!!", err)
        res.send(err);
      }
      res.json(role);
    }
    );
  };