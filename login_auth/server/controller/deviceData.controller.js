const mongoose = require("mongoose");
const deviceData = require("../model/deviceData.model");
const deviceName = require("../model/deviceName.model");
const { json } = require('body-parser');
const { Console } = require("console");

module.exports.deviceData = (req, res) => {
    console.log("In deviceData funct req.body is",req.body);
    var deviceDataTemp = new deviceData;
    deviceDataTemp.DateTime = req.body.DateTime;
    deviceDataTemp.UID = req.body.UID;
    deviceDataTemp.D1 = req.body.D1;
    deviceDataTemp.D2 = req.body.D2;
    deviceDataTemp.D3 = req.body.D3;
    deviceDataTemp.D4 = req.body.D4;
    deviceDataTemp.D5 = req.body.D5;
    deviceDataTemp.D6 = req.body.D6;
    deviceDataTemp.D7 = req.body.D7;
    deviceDataTemp.D8 = req.body.D8;
    deviceDataTemp.D9 = req.body.D9;
    deviceDataTemp.D10 = req.body.D10;

deviceDataTemp.save((err, data) => {
    if(err) {
        res.status(500).send({ message:err });
        return;
    }
    if(data) {
        res.status(200).send("deviceData displayed successfully!");
        return;
    }
});
};
module.exports.getDeviceData = (req, res) => {
    console.log("getDeviceData funct is", req.body);
    
    deviceData.find( req.body, function(err, getDeviceData) {
        if(err) {
            res.send("something went really wrong");
            next();
        }
        var deviceDataTemp1 = {
            "resDeviceData":getDeviceData
        };
        res.json(deviceDataTemp1);
    });
};
module.exports.deviceLiveData = (req, res) => {
    var findConditionJson = {deviceName: ""};
    console.log("In deviceLiveData funct req.body is", req.body);
    console.log("In deviceLiveData funct req.body length is", Object.keys(req.body).length);
    if(Object.keys(req.body).length === 0) {
        console.log("deviceLiveData funct UID is empty");
        res.status(500).send("deviceLiveData funct path is empty");
    }
    else {
        findConditionJson.deviceName = req.body.path;
        deviceName.find( findConditionJson, function (err, data) {
         console.log("deviceLiveData funct deviceName.find data is",data);
         console.log("deviceLiveData funct deviceName.find data length is", Object.keys(data).length);
        if (data.length < 1) {
           console.log("deviceLiveData funct deviceName.find err is", err);
           res.status(500).send("deviceLiveData funct deviceName.find UID is empty");
           return 0;        
        }
         console.log("deviceLiveData funct deviceName.find UID is", data[0].UID);
         var uidGotFromDeviceName =  {UID: data[0].UID};
            console.log("In deviceLiveData uidGotFromDeviceName is",uidGotFromDeviceName);
            deviceData.findOne( uidGotFromDeviceName, function (err, getDeviceLiveData) {
            console.log("In deviceLiveData funct getDeviceLiveData is",getDeviceLiveData);
            res.json(getDeviceLiveData);      
            }).sort({ _id: -1 }).limit(1)      
        });
    }
};