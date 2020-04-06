const express = require('express');
const app = express();
app.get('/',(req,res)=>{
  res.send({hi:'stll lowlands'});
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//node index.js
//localhost:5000
