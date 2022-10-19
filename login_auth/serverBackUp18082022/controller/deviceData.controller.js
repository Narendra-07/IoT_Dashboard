const mongoose = require("mongoose");
const deviceData = require("../model/deviceData.model");
const { json } = require('body-parser');

module.exports.deviceData = (req, res) => {
    console.log("req.body is",req.body);
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
    console.log("getDeviceData funct is", req.body)
    
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