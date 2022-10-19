const mongoose = require("mongoose");
const deviceManagement = require("../model/deviceManagement.model");
const { json } = require('body-parser');
const { Console } = require("console");

module.exports.createDeviceManagementData = (req, res) => {
    console.log("In createDeviceManagementData funct req.body is", req.body);
    //body validation
    req.body
    var deviceManagementTemp = new deviceManagement;
    deviceManagementTemp.ModifiedDate = req.body.ModifiedDate;
    deviceManagementTemp.UID = req.body.UID;
    deviceManagementTemp.TagId = req.body.TagId;
    deviceManagementTemp.TagName = req.body.TagName;
    deviceManagementTemp.Unit = req.body.Unit;
    deviceManagementTemp.Scale = req.body.Scale;
    deviceManagementTemp.OffSet = req.body.OffSet;
    deviceManagementTemp.Minimum = req.body.Minimum;
    deviceManagementTemp.Maximum = req.body.Maximum;

    deviceManagementTemp.save((err, data) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }
        if(data) {
            res.status(200).send({message: "deviceManagement displayed successfully!"});
            return;
        }
    });
}
 module.exports.fetchDeviceManagementData = (req, res) => {
    var fetchDataFromUID = {UID:""};
    console.log("In fetchDeviceManagement funct req.body is",req.body);
    console.log("In fetchDeviceManagement funct req.body length is", Object.keys(req.body).length);  
    if(Object.keys(req.body).length === 0) {
        console.log("In fetchDeviceManagement funct UID is empty")
        res.status(500).send("fetchDeviceManagement funct UID is empty");
    } 
    else {
        fetchDataFromUID.UID = req.body.UID;
        deviceManagement.find(fetchDataFromUID, function(err, data){
            console.log("deviceManagement.find data is",data);
            if(data.length < 1) {
              console.log("In deviceManagement.find funct err is",err);
              res.status(500).send("In deviceManagement.find funct UID is empty"); 
              return; 
            }
             res.json(data);
        });
    }
}
module.exports.updateDeviceManagementData = (req, res) => {
    // Validate Request
    if(!req.body) {
      return res.status(400).send({
      message: "Please fill all required field"
    });
    }
// Find user and update it with the request body
    deviceManagement.findByIdAndUpdate(req.params.id, {
    ModifiedDate: req.body.ModifiedDate,
    UID: req.body.UID,
    TagId: req.body.TagId,
    TagName: req.body.TagName,
    Unit: req.body.Unit,
    Scale: req.body.Scale,
    OffSet: req.body.OffSet,
    Minimum: req.body.Minimum,
    Maximum: req.body.Maximum,

  }, {new: true})
  .then(user => {
   if(!user) {
     return res.status(404).send({
     message: "user not found with id " + req.params.id
   });
  }
  res.send(user);
  }).catch(err => {
  if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "user not found with id " + req.params.id
  });
  }
  return res.status(500).send({
    message: "Error updating user with id " + req.params.id
  });
  });
  };
// Delete a User with the specified id in the request
module.exports.deleteDeviceManagementDataById = (req, res) => {
  console.log("In deleteDeviceManagementData funct req.body is", req.body);
    deviceManagement.findByIdAndRemove(req.params.id)
    .then(user => {
    if(!user) {
      return res.status(404).send({
      message: "user not found with id " + req.params.id
    });
    }
    res.send({message: "user deleted successfully!"});
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
      message: "user not found with id " + req.params.id
    });
    }
    return res.status(500).send({
      message: "Could not delete user with id " + req.params.id
    });
    });
    };
    module.exports.deleteAllDeviceManagementDataByUId = (req, res) => {
      var deleteAllDataWithUID = {UID:""};
      console.log("In deleteAllDeviceManagementDataByUId funct req.body is",req.body);
      console.log("In deleteAllDeviceManagementDataByUId funct req.body length is", Object.keys(req.body).length);  
      if(Object.keys(req.body).length === 0) {
          console.log("In deleteAllDeviceManagementDataByUId funct UID is empty")
          res.status(500).send("deleteAllDeviceManagementDataByUId funct UID is empty");
      } 
      else {
        deleteAllDataWithUID.UID = req.body.UID;
          deviceManagement.deleteMany(deleteAllDataWithUID, function(err, data){
              console.log("In deleteAllDeviceManagementDataByUId funct deviceManagement.deleteMany data is",data);
              if(data.length < 1) {
                console.log("In deviceManagement.find funct err is",err);
                res.status(500).send("In deviceManagement.find funct UID is empty"); 
                return; 
              }
               res.json(data);
          });
      }
    }