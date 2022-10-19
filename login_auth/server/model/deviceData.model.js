const mongoose = require("mongoose");
const Schema = mongoose.Schema;
    
  const deviceDataSchema = Schema({
    DateTime: String,
    UID: String,
    D1: String,
    D2: String,
    D3: String,
    D4: String,
    D5: String,
    D6: String,
    D7: String,
    D8: String,
    D9: String,
    D10: String
})

module.exports = mongoose.model('deviceData', deviceDataSchema);