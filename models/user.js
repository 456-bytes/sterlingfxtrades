const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({
     fullname: {
          type: "string",
          required: [true, 'please enter your fullname']

     },
     username: {
          type: "string",
          required: [true, 'please enter a username of your choice'],
          lowercase: true
     },
     email: {
          type:"string",
          required: [(true), 'please enter an email'],
          unique: true,
          lowercase: true,
          validate: [(isEmail), 'please enter a valid email']
     },
     password: {
          type: "string",
          required: [true, 'please enter a strong password '],
          minlength: [6, 'minimum password length is 6 characters'],
     },
     pay_account: {
          type: "string",

     }

     // agree:{
     //      type:'string',
     //      required: [true, "cant't proceed as you didn't agree to the terms"]
     // }
});

// fire fuction before save to db
userSchema.pre('save', async function (next){
     const salt = await bcrypt.genSalt();
     this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method login user

userSchema.statics.login = async function (email, password) {
     const user = await this.findOne({ email: email });
     if (user) {
          const auth = await bcrypt.compare(password, user.password);

          if (auth) {
               return user;
          }
          throw Error('incorrect password');                       
     }
     throw Error('incorrect email');
}


const User = mongoose.model('user', userSchema);

module.exports = User;