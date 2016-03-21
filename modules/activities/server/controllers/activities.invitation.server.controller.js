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

/**
 * Show the current Activity
 */
exports.read = function(req, res) {
  //get data from parameter
  var email = req.param('email');
  var activityId = req.param('activityId');
  var isNew = false;
  var isAccepted = false;
  if(isParticipantNew(activityId, email)){
    isNew = true;
  }else{
    if(isParticipantAccepted(activityId, email)){
      isAccepted = true;
    }
  }
  res.jsonp({
    'isNew': isNew,
    'isAccepted': isAccepted
  });
  //send infomations to activity detail page
};

//when participant accept/reject invitation, move participant from pendding list to accpet/decline list
exports.response = function(req,res){
  var user = req.user;
  var activity = req.body;
  var response = req.param('response');

  participantRespond(activity, user.email, response);
  // res.redirect('/activity/response');
};

function isParticipantNew(activityId, email){
  Activity.findById(new ObjectId(activityId), function(err, activity){
    return activity.pendingParticipants.indexOf(email) > 0;
  });
}
function isParticipantAccepted(activityId, email){
  Activity.findById(new ObjectId(activityId), function(err, activity){
    return activity.acceptedParticipants.indexOf(email) > 0;
  });
}

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
