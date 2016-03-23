'use strict';

var ngrok = require('ngrok');

module.exports.initConnection = function initConnection(){
  console.log("gnrok.initConnection is called");
  ngrok.connect({
    proto: 'http', // http|tcp|tls
    addr: 3000, // port or network address
    subdomain: 'gotogether' // reserved tunnel name https://alex.ngrok.io,
  },function (err, url) {
    console.log("Ngrok start to listen.");
    console.log("url:"+url);
    if(err){
      console.log(err);
    }
  });
};

module.exports.closeConnection = function closeConnection(){
  ngrok.disconnect();
};