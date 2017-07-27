var express = require('express');
var app = express();
var {resolve} = require('path');

const PORT = process.env.PORT || 5000;

app.use(express.static(resolve(__dirname,'../pub')));
app.use(express.static(resolve(__dirname,'../node_modules/jquery/dist')));
app.use(express.static(resolve(__dirname,'../node_modules/bootstrap/dist/js')));
app.use(express.static(resolve(__dirname,'../node_modules/bootstrap/dist/css')));

app.use('/api',require('./api'));

app.listen(PORT,()=>{
  console.log('server listening on ' + PORT);
});
