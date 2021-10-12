
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./authRoutes');
const cookieParser = require('cookie-parser');



const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
     
// parse application/json
app.use(express.json());

// view engine
app.set('view engine', 'html');
const publicDirectoryPath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../views');
app.engine('html', require('ejs').renderFile);


// middleware
app.set('views', viewspath)
app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(cookieParser());

// // database connection
// const dbURL = 'mongodb+srv://escobar:78789991@cluster0.55yno.mongodb.net/sterlingfxtrades';
// mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
// .then((result) => app.listen(3000, () => {
//   console.log('sterlingfxtrades has successfully connect to the database...the server is up and running on port : ' + 3000);
// }))
// .catch ((err) => console.log(err));

// database connection
const dbURL = 'mongodb+srv://terry:Johnson201~da2@cluster0.l6elt.mongodb.net/sterlingfxtrades';
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => app.listen(3000, () => {
  console.log('sterlingfxtrades has successfully connect to the database...the server is up and running on port : ' + 3000);
}))
.catch ((err) => console.log(err));


// routes
app.get('/index.html', (req, res) => {
  res.render('index')
});

app.get('/faq.html', (req, res) => {
  res.render('faq')
});

app.get('/news.html', (req, res) => {
  res.render('news')
});

app.get('/deposit.html', (req, res) => {
  res.render('deposit')
});

app.get('/rateus.html', (req, res) => {
  res.render('rateus')
});

app.get('/rules.html', (req, res) => {
  res.render('rules')
});

app.get('/payout.html', (req, res) => {
  res.render('payout')
});

app.get('/accountfound.html', (req, res) => {
  res.render('accountfound')
});

app.get('/signup.html', (req, res) => {
  res.render('signup')
});

app.get('/forgotpassword.html', (req, res) => {
  res.render('forgotpassword')
});

app.get('/login.html', (req, res) => {
  res.render('login')
});

app.get('/loginerror.html', (req, res) => {
  res.render('loginerror')
});

app.get('/presentation.html', (req, res) => {
  res.render('presentation')
});

app.get('/registration.html', (req, res) => {
  res.render('registration')
});

app.get('/contactus.html', (req, res) => {
  res.render('contactus')
});

app.get('/profile.html', (req, res) => {
  res.render('profile')
});

app.get('/15.html', (req, res) => {
  res.render('15')
});

app.get('/30.html', (req, res) => {
  res.render('30')
});

app.get('/45.html', (req, res) => {
  res.render('45')
});

app.get('/65.html', (req, res) => {
  res.render('65')
});

app.get('/85.html', (req, res) => {
  res.render('85')
});

app.get('/100.html', (req, res) => {
  res.render('100')
});

app.get('/banners.html', (req, res) => {
  res.render('login')
});

app.get('/contactus2.html', (req, res) => {
  res.render('contactus2')
});

app.get('/depositlist.html', (req, res) => {
  res.render('depositlist')
});

app.get('/earnings.html', (req, res) => {
  res.render('earnings')
});

app.get('/editaccount.html', (req, res) => {
  res.render('editaccount')
});

app.get('/faq2.html', (req, res) => {
  res.render('faq2')
});

app.get('/index2.html', (req, res) => {
  res.render('index2')
});

app.get('/makedeposit.html', (req, res) => {
  res.render('makedeposit')
});

app.get('/news2.html', (req, res) => {
  res.render('news2')
});

app.get('/referral.html', (req, res) => {
  res.render('referral')
});

app.get('/security.html', (req, res) => {
  res.render('security')
});

app.get('/withdraw.html', (req, res) => {
  res.render('withdraw')
});

app.use(authRoutes);