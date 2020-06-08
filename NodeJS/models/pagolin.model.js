const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var pagolinSchema = new mongoose.Schema({
  
    famille: {
        type: String,
        //required: 'Full name can\'t be empty'
    },
    age: {
        type: Number,
       // required: 'Full name can\'t be empty'
    },
    race: {
        type: String,
      //  required: 'Full name can\'t be empty'
    },
    nourriture: {
        type: String,
        //required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email is  empty',
       unique: true
    },
    password: {
        type: String,
        required: 'Password is empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    saltSecret: String
});
// Custom validation for email
pagolinSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
// Events


pagolinSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});
 

// Methods
pagolinSchema.methods.verifyPassword = function (password) {
    console.log("compareEync password="+password)
    console.log('bcryprt passwodb',bcrypt.password);
    return bcrypt.compareSync(password, this.password);
};

pagolinSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    { 
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('Pagolin', pagolinSchema);
