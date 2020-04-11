const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
//create model class
const User = mongoose.model('users');

passport.serializeUser((user,done) => {
  console.log("i am in serialize part");
  done(null,user.id);
});

passport.deserializeUser((id,done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(new GoogleStrategy({
clientID : keys.googleClientID,
clientSecret : keys.googleClientSecret,
callbackURL : '/auth/google/callback'
},//callback function
(accessToken,refreshToken,profile,done) => {
  User.findOne({googleId:profile.id}).then(existingUser => {
    if(existingUser){
      //tell passport that it is all clear
      console.log('I am in if statement',profile.id);
      done(null,existingUser);
    }
    else{
      //create new instance
      console.log('I am in else statement');
      new User({googleId : profile.id}).save().
      then(user => done(null,user));
    }
  });

}
));
