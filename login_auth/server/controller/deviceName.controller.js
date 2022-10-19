const mongoose = require("mongoose");
const deviceName = require("../model/deviceName.model");
const { json } = require('body-parser');
const path = require("path");
const deviceData = require("../model/deviceData.model");
const { isNull } = require("util");
// const deviceData = require("./deviceData.controller");
module.exports.deviceName = (req, res) => {
    console.log("In deviceName service req.body is", req.body);
    var deviceNameTemp = new deviceName;
    let date_ob = new Date();
    deviceNameTemp.UID = req.body.UID;
    deviceNameTemp.createdBy = req.body.createdBy;
    deviceNameTemp.createdDate = date_ob;
    deviceNameTemp.deviceName = req.body.deviceName;
    deviceNameTemp.save((err, data) => {
        console.log ("deviceName.save Data is", data);
        if(err) {
            console.log ("In deviceName err is", err);
            res.status(500).send({ message:err });
            return;
        }
        else {
          console.log ("deviceName.save else part", data);
          res.status(200).send(data);  
          //res.status(200).send("deviceName displayed successfully!");
            return;
      }
    });
};
  module.exports.getDeviceNamePath = (req, res) => {      
    var findConditionJson = {deviceName:""};
       console.log("In getDeviceNamePath funct req.body is",req.body);
       console.log("In getDeviceNamePath funct req.body length is",Object.keys(req.body).length);

    if (Object.keys(req.body).length === 0) {
      console.log("getDeviceNamePath UID is empty");
      res.status(500).send("getDeviceNamePath funct Path is empty"); 
    } 
     else {
    findConditionJson.deviceName = req.body.path;
    deviceName.find( findConditionJson, function(err, data) {
      // console.log ("deviceName.find data is",data);
          if (data.length < 1) {
            console.log ("getDeviceNamePath funct deviceName.find err is",err);
            res.status(500).send("getDeviceNamePath funct deviceName.find UID is empty"); 
            return; 
          }
      console.log("getDeviceNamePath funct deviceName.find UID is", data[0].UID);
          var uidGotFromDeviceName = {UID:data[0].UID};
  
          deviceData.find( uidGotFromDeviceName, function(err, getDeviceData) {
         var deviceDataTemp1 = {
            "resDeviceData":getDeviceData
         }; 
        
        res.json(deviceDataTemp1);   
    });
    });
  }
};
module.exports.getUID = (req, res) => {
  var findUID = {deviceName:""};
  if (Object.keys(req.body).length === 0) {
    console.log("In getUID funct UID is empty");
    res.status(500).send("In getUID funct Path is empty"); 
  } 
  else {
    findUID.deviceName = req.body.path;
    deviceName.find( findUID, function(err, data) {
      // console.log ("deviceName.find data is",data);
          if (data.length < 1) {
            console.log ("getUID funct deviceName.find err is",err);
            res.status(500).send("getUID funct deviceName.find UID is empty"); 
            return; 
    };
    res.json(data[0]);
  });
  }
}
