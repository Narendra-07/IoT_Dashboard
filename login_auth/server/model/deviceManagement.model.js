const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deviceManagementSchema = Schema({  

      ModifiedDate: {
        type: "string",
      },
      UID: {
        type: "string",
      },
      TagId: {
        type: "string",
        
      },
      TagName: {
        type: "string",
        
      },
      Unit: {
        type: "string",
        
      },
      Scale: {
        type: "string",
        
      },
      OffSet: {
        type: "string",
        
      },
      Minimum: {
        type: "string",
        
      },
      Maximum: {
        type: "string",
        
      }
    });
module.exports = mongoose.model('deviceManagement', deviceManagementSchema);