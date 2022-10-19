module.exports.deviceDataJsonObject = {
    type: "object",
    required: ["UID", "D1", "D2", "D3", "D4", "D5", "D6","D7", "D8", "D9", "D10"],
    properties:{
    DateTime: {
        type: "string",
    },
    UID: {
        type: "string",
    },
    D1: {
        type: "string",
    },
    D2: {
        type: "string",
    },
    D3: {
        type: "string",
    },
    D4: {
        type: "string",
    },
    D5: {
        type: "string",
    },
    D6: {
        type: "string",
    },
    D7: {
        type: "string",
    },
    D8: {
        type: "string",
    }, 
    D9: {
        type: "string",
    },
    D10: {
        type: "string",
    } 
    } ,
  };
  module.exports.createDeviceManagementDataJsonObject = {
    type: "object",
    required: ["ModifiedDate", "UID", "TagId", "TagName", "Unit", "Scale", "OffSet", "Minimum", "Maximum"],
    properties: {
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
        
      },
    },
  };
  module.exports.deviceNameJsonObject = {
    type:"object",
    required: ["UID", "deviceName", "createdBy", "createdDate"],
    properties: {
        UID: {
        type: "string",
    },
    deviceName: {
        type: "string",
    },
    createdBy: {
        type: "string",
    },
    createdDate: {
        type: "string",
    },
  },
};
module.exports.getDeviceNamePath = {
  type:"object",
  required: ["path"],
  properties: {
    path: {
      type: "string",
    },
  },
};
module.exports.getDeviceData = {
  type:"object",
  required: ["UID"],
  properties: {
    UID: {
      type: "string",
    },
  },
};
module.exports.updateDeviceManagementJsonObject = {
  type: "object",
    required: ["ModifiedDate", "UID", "TagId", "TagName", "Unit", "Scale", "OffSet", "Minimum", "Maximum"],
    properties: {
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
        
      },
   },
};
module.exports.getUIDJsonObject = {
  type: "object",
  required: ["path"],
  properties: {
    path: {
      type: "string",
    },
  },
}