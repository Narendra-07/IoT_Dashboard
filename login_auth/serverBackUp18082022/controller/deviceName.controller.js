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
       console.log("req.body is",req.body);
       console.log("In getDeviceNamePath req.body length is",Object.keys(req.body).length);

    if (Object.keys(req.body).length === 0) {
      console.log("UID is empty");
      res.status(500).send("Path is empty"); 
    } 
     else {
    findConditionJson.deviceName = req.body.path;
    deviceName.find( findConditionJson, function(err, data) {
      // console.log ("deviceName.find data is",data);
          if (data.length<1) {
            console.log ("deviceName.find err is",err);
            res.status(500).send("deviceName.find UID is empty"); 
            return; 
          }
        console.log("UID is", data[0].UID);
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
