const deviceDataCTL = require("../controller/deviceData.controller");
const deviceNameCTL = require("../controller/deviceName.controller");
const deviceManagementCTL = require("../controller/deviceManagement.controller");
const jsonSchemaValidationObject = require("../model/jsonSchemaValidationObjects.model");
const {
  Validator,
  ValidationError,
} = require("express-json-validator-middleware");
const { validate } = new Validator();

//const deviceManagement = require("../model/deviceManagement.model");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    })
app.post('/deviceData', validate({body: jsonSchemaValidationObject.deviceDataJsonObject}), deviceDataCTL.deviceData);
app.post('/getDeviceData', validate({body:jsonSchemaValidationObject.getDeviceData}), deviceDataCTL.getDeviceData);
app.post('/addDeviceName', validate({body: jsonSchemaValidationObject.deviceNameJsonObject}), deviceNameCTL.deviceName);
app.post('/getDeviceNamePath', validate({body: jsonSchemaValidationObject.getDeviceNamePath}), deviceNameCTL.getDeviceNamePath);
app.post('/deviceLiveData', deviceDataCTL.deviceLiveData);
app.post('/createDeviceManagementData', validate({body: jsonSchemaValidationObject.createDeviceManagementDataJsonObject}), deviceManagementCTL.createDeviceManagementData);
app.post('/fetchDeviceManagementData', deviceManagementCTL.fetchDeviceManagementData);
app.put('/updateDeviceManagementData/:id', validate({body: jsonSchemaValidationObject.updateDeviceManagementJsonObject}), deviceManagementCTL.updateDeviceManagementData);
app.delete('/deleteDeviceManagementDataById/:id', deviceManagementCTL.deleteDeviceManagementDataById);
app.post('/deleteAllDeviceManagementDataByUId', deviceManagementCTL.deleteAllDeviceManagementDataByUId);
app.post('/getUID', validate({body: jsonSchemaValidationObject.getUIDJsonObject}), deviceNameCTL.getUID);
/**
 * Error handler middleware for validation errors.
 */
 app.use((error, request, response, next) => {
  // Check the error is a validation error
  if (error instanceof ValidationError) {
    // Handle the error
    response.status(400).send(error.validationErrors);
    next();
  } else {
    // Pass error on if not a validation error
    next(error);
  }
});
};