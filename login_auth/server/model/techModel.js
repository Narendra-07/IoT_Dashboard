const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = Schema({
    company_id : {
       type : String,
       unique: true,
    },

    company_name : {
        type: String,
        required: 'company name can\'t be empty'
    },

    address : {
       type : String,
        required: 'address can\'t be empty'
    },

    createdBy: {
        type: String,
    },

    createdDate: {
        type: Date,
     
    }
}
)

module.exports= mongoose.model('techCustomer',customerSchema);