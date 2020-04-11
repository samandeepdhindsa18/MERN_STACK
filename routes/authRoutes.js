const passport = require('passport');
//cut
const mongoose = require('mongoose');
//create model class
const User = mongoose.model('users');
module.exports = (app) => {
app.get('/auth/google',passport.authenticate('google',{
  scope : ['profile','email']
})
);

app.get('/auth/google/callback',passport.authenticate('google'));

app.get('/api/current_user',(req,res)=>{
  res.send(req.user);
});

};
