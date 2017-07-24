var express = require('express');
var app = express();
var {resolve} = require('path');

app.use(express.static(resolve(__dirname,'../pub')));
app.use(express.static(resolve(__dirname,'../node_modules/jquery/dist')));
app.use(express.static(resolve(__dirname,'../node_modules/bootstrap/dist/js')));
app.use(express.static(resolve(__dirname,'../node_modules/bootstrap/dist/css')));

app.use('/api',require('./api'));

app.listen(3000,()=>{
  console.log('server listening on 3000');
});
