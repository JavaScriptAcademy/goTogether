'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

var express = require('express');

//init express
var app = express();
var ObjectId = require('mongoose').Types.ObjectId;
var Activity = require('mongoose').model('Activity');
// var User = require('mongoose').model('User');

/**
 * Show the current Activity
 */
exports.read = function(req, res) {
  //get data from parameter
  var email = req.param('email');
  var activityId = req.param('activityId');
  var activity = req.activity;

  //send infomations to activity detail page
  res.redirect('/activities/'+activityId+'/'+email);
};

// exports.test = function(req,res){
//   var user = req.user;
//   var activity = req.activity;
//   // console.log(user);
//   // console.log(activity);
//   console.log(req.body);
// };

//when participant accept/reject invitation, move participant from pendding list to accpet/decline list
exports.response = function(req,res){
  var user = req.user;
  var activity = req.body;
  var response = req.param('response');

  updateUserStatus(user,response);
  var result = participantRespond(activity,user.email,response);

  res.jsonp(activity);
};

function updateUserStatus(user,response){

};

//move participant from pendding to decline according to response
function participantRespond(activity, email, response, res){
  Activity.findById(new ObjectId(activity._id),function(err,activity){
    var index = activity.pendingParticipants.indexOf(email);
    activity.pendingParticipants.splice(index,1);
    if(response){
      activity.acceptedParticipants.push(email);
    }else{
      activity.declinedParticipants.push(email);
    }
    activity.save(function(err){
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        // res.json(activity);
    }
    });
    });
}
