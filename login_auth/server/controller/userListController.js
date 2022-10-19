'use strict';
const mongoose = require('mongoose');
 const User = mongoose.model('Users');

exports.list_all_users = (req, res) => {
  console.log("in list_all_users fn")
  //res.send("list_all_users res");
  User.find({}, (err, user) => {
    if (err) {
      console.log("error!!!!!!!!!!", err)
      res.send(err);
    }
    res.json(user);
    // res.send("list_all_users res");
  }
  );
};

exports.create_a_user = (req, res) => {
  console.log("in create_a_user", req.body);
  let new_user = new User(req.body);
  new_user.save((err, user) => {
    if (err) {
      console.log("error!in create_a_user", err);
      res.send(err);
    }
    console.log("No error in create_a_user !!!!!!!!!!");
    res.json(user);
  });
};

exports.read_a_user = (req, res) => {
  User.findOne({ name: req.body.name }, (err, user) => {
    if (err) {
      console.log("error!!!!!!!!!!");
      res.send(err);
    }
    res.json(user);
    console.log("in read_user", user);
  })
};

exports.update_a_user = (req, res) => {
 // var tagKey = req.body.nameCurruntKey;
  //tagKey = {tagKey :  req.body.nameCurruntVal}
  //console.log("tagKey val is ", tagKey);
  // validate correct data of name key;
  User.Update( {name: req.body.nameCurrunt }, { name: req.body.nameNew }, { new: true }, (err, user) => {
    if (err) {
      console.log("error!!!!!!!!!!");
      res.send(err);
    }
    res.json(user);
    console.log("update successfully")
  }
  );
};

exports.delete_a_user = (req, res) => {
  console.log("in delete_a_user", req.body.name)
  User.deleteOne({
    name: req.body.name,
  }, (err, user) => {
    if (err) {
      console.log("error!!!!!!!!!!");
      res.send(err);
    }
    res.json({ message: 'user successfully deleted' });
  });
};