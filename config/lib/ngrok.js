'use strict';
var ngrok = require('ngrok');

module.exports.init = function init(){
  console.log('Start to build ngrok server');
  ngrok.connect({
    addr: 3000, // port or network address
    authtoken:'591ir6Sda765oX5R8mBAv_5eofrF9ed857oE4qGHvKL'
  }, function (err, url) {
    if(err){
      console.log("err");
      console.log(err);
    }
    console.log("listen to url:"+url);
  });
};