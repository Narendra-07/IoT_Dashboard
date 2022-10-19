const mongoose = require('mongoose');
const Customer = require('../model/customer.model')
const deviceName = require('../model/deviceName.model')
const user = require('../model/user.model');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const jwt_decode = require('jwt-decode');


module.exports.register = (req, res, next) => {
  var customers = new Customer();
  let date_ob = new Date();
  customers.company_id = req.body.company_id;
  customers.company_name = req.body.company_name;
  customers.address = req.body.address;
  customers.createdBy = req.body.createdBy;
  customers.createdDate = date_ob;
  customers.path = req.body.path + "/" +  customers.company_name;


  customers.save((err, doc) => {
    if (!err)
      res.send(doc);
    else {
      if (err.code == 11000)
        res.status(422).send(['Duplicate company id found.']);
      else
        return next(err);
    }
  });
}

exports.list_all_customer = (req, res) => {
  Customer.find({}, (err, customers) => {
    if (err) {
      console.log("error!!!!!!!!!!", err)
      res.send(err);
    }
    res.json(customers);

  }
  );
};


exports.postCustomerPath = (req, res) => {
 var Path;
  var token = req.body[0];
  var Token = jwt_decode(token);
  console.log("decoded token is", Token);
  // var path = Token.path[0];
  var path = Token.path;
  console.log("loginPath is",path);
// var query={};
// var Path=path.split('\/');
// console.log("split path",Path);
// query=path[0];
// console.log(query);
  var treeDataPaths = [];

deviceName.find({deviceName: new RegExp('^' + path )}, (err, deviceNames) => { 
  console.log("in customer.ctl deviceName.find path is",path);
      if (err) {
        console.log("error")
        res.send(err);
      }
       console.log("deviceNames is", deviceNames);
       console.log("deviceNames length is",Object.keys(deviceNames).length);
       
       for (var i = 0; i < deviceNames.length; i++) {
        var treeDataPath = {path: ""};
        treeDataPath.path = deviceNames[i].deviceName;
        console.log("treeDataPath is",treeDataPath);
        treeDataPaths.push(treeDataPath);      
      } 
      }
      );
  
  Customer.find({path: new RegExp('^' + path )}, (err, customers) => { //path:/^embone\/Technovision1/
    if (err) {
      console.log("error")
      res.send(err);
    }
     console.log("customers", customers);
     console.log("customers length is",Object.keys(customers).length);
    //  var i = customers;
     for (var i = 0; i < customers.length; i++) {
      var treeDataPath1 = {path: ""};
      // treeDataPath1.path = customers[i].path[0];
      treeDataPath1.path = customers[i].path;
      console.log("treeDataPath1 is",treeDataPath1);
      treeDataPaths.push(treeDataPath1);
     }
     res.json(treeDataPaths);
     console.log("treeDataPaths is",treeDataPaths);
    //  res.json(customers);
  }
  );
}
