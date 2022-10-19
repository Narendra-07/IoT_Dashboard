//for user details

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');   //for password encryption
const jwt = require('jsonwebtoken');    // to access private routes

const usersSchema = Schema({

    userName: {
        type: String,
        required: 'user name can\'t be empty'
    },

    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    companyName: {
        type: String,

    },
    phone: {
        type: String,

    },
    role: {
        type: String,
    },

    createdBy: {
        type: String,

    },
    createdDate: {
        type: Date,
    },
    path: {
        // type: Array,
        type: String,

    },

    saltSecret: String
});

// Custom validation for email
usersSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

/* genSalt generate random string salt and hash function encrypt password and 
    this encrypted password and saltsecret stored inside the schema object*/
usersSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});



// Methods
usersSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// to generate the jwt token call sign function from jsonwebtoken. 
usersSchema.methods.generateJwt = function () {
    return jwt.sign({
        _id: this._id,
        _userName: this.userName,
        path: this.path,    
        role: this.role    //payload
    }, process.env.JWT_SECRET,                        //secret key
        {
            expiresIn: process.env.JWT_EXP               //expiration time
        }

    );
}

module.exports = mongoose.model('UserList', usersSchema);   //register schema object in mongoose


