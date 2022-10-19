
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const roleSchema = Schema({
    Role_Id: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    RoleName: {
        type: String,
        required: 'Role_Name can\'t be empty',
        unique: true
    },
});

module.exports = mongoose.model("Role",roleSchema)