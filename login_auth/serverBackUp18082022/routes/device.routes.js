const deviceDataCTL = require("../controller/deviceData.controller");
const deviceNameCTL = require("../controller/deviceName.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    })
app.post('/deviceData', deviceDataCTL.deviceData);
app.post('/getDeviceData', deviceDataCTL.getDeviceData);
app.post('/addDeviceName', deviceNameCTL.deviceName);
app.post('/getDeviceNamePath', deviceNameCTL.getDeviceNamePath);
};