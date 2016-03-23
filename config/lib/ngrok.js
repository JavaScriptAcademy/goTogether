'use strict';

var ngrok = require('ngrok');

module.exports.initConnection = function initConnection(){
  console.log("gnrok.initConnection is called");
  ngrok.connect(3000,function (err, url) {
    console.log("Ngrok start to listen.");
    console.log("url:"+url);
    if(err){
      console.log(err);
    }
  });
};