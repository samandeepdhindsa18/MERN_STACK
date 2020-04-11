const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
);
//enable cookies
app.use(passport.initialize());
app.use(passport.session());

//call file
require('./models/User');
require('./services/passport');
require('./routes/authRoutes')(app);
//connect function
mongoose.connect(keys.mongoURI);
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//node index.js
//localhost:5000
