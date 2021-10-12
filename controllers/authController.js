const User = require("../models/user");
const jwt = require('jsonwebtoken');


// handleErrors
const handleErrors = (err) => {
   console.log(err.message, err.code);
   let errors = {fullname:'', username:'', email:'', password:'', agree:''};  

//    incorrect emails
if( err.message === 'incorrect email'){
   errors.email = 'this email is not registered';
}

//    incorrect password
if( err.message === 'incorrect password'){
   errors.password = 'this password you entered does not match';
}

// duplicate key error
if (err.code === 11000){
    errors.email = 'this email is already registered';
    return errors;
}

// validation errors
if (err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
       errors[properties.path] = properties.message;
    });
 }

 return errors;
}



const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, ' i love sterlingfxtrade and it was created by me',{
        expiresIn: maxAge
    });
}

// get request
module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

// post request
module.exports.signup_post = async (req, res) => {
const { fullname, username, email, password, pay_account} = req.body;

try{
 const user = await User.create({ fullname, username, email, password, pay_account});
 const token = createToken(user._id);
 res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
 res.status(201).json({user: user._id});
}
catch (err) {
const errors = handleErrors(err);
res.status(400).json({errors});
 }
}


module.exports.login_post = async  (req, res) => {
const { email, password } = req.body;

try {
const user = await User.login( email, password);
const token = createToken(user._id);
 res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
res.status(200).json({ user: user._id });

} catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
}

}
