var express = require('express');
var app = express();
var {resolve} = require('path');

app.use(express.static(resolve(__dirname,'../pub')));

app.use('/api',require('./api'));

app.listen(3000,()=>{
  console.log('server listening on 3000');
});
