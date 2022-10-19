const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deviceNameSchema = Schema({
    UID : {
        type : String,
        unique: true
    },

    deviceName : {
        type : String,
        required: "deviceName can't be empty"
    },

    createdBy: {
        type: String,
    },
    
    createdDate: {
        type: Date,
    }
})
module.exports = mongoose.model('deviceName',deviceNameSchema);