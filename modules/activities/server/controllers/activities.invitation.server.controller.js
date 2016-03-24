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
var User = require('mongoose').model('User');


//whether an participant is new or has accepted the activity
var isNew = false;
var isAccepted = false;

//get participant status
exports.read = function(req, res) {
  var isParticipantPendingFlag;
  var isParticipantAcceptedFlag;
  var email = req.param('email');
  var activityId = req.param('activityId');

  function setParticipantPending(isPending) {
    isParticipantPendingFlag = isPending;
  }

  function setParticipantAccepted(isAccpeted) {
    isParticipantAcceptedFlag = isAccpeted;
  }

  function sendRespond() {
    res.jsonp({
      'isPending': isParticipantPendingFlag,
      'isAccepted': isParticipantAcceptedFlag
    });
  }
  isParticipantPending(activityId, email, setParticipantPending);
  isParticipantAccepted(activityId, email, setParticipantAccepted, sendRespond);
};

exports.update = function(req, res) {

  if (req.user) {
    if (req.user.stage < 2) {
      User.update({
        '_id': req.user._id
      }, {
        'stage': 2
      }, function(err, response) {
        if (err) throw err;
      });
    }
  }

  var activityId = req.param('activityId');
  var email = req.param('email');
  var response = req.param('isAccept');
  var isParticipantPendingFlag;

  function setParticipantPending(isPending) {
    isParticipantPendingFlag = isPending;
  }

  isParticipantPending(activityId, email, setParticipantPending);

  Activity.findById(new ObjectId(activityId), function(err, activity) {
    if (isParticipantPendingFlag) {
      if (response === 'true') {
        addParticipantIntoList(activity.acceptedParticipants, email);
      } else {
        addParticipantIntoList(activity.declinedParticipants, email);
      }
      removeParticipantFromList(activity.pendingParticipants, email);
    } else {
      if (response === 'true') {
        addParticipantIntoList(activity.acceptedParticipants, email);
        removeParticipantFromList(activity.declinedParticipants, email);
      } else {
        addParticipantIntoList(activity.declinedParticipants, email);
        removeParticipantFromList(activity.acceptedParticipants, email);
      }
    }
    activity.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(activity);
      }
    });
  });
};


//operate participant in list
function addParticipantIntoList(list, email) {
  if (list.indexOf(email) < 0) {
    list.push(email);
  }
}

function removeParticipantFromList(list, email) {
  var index = list.indexOf(email);
  console.log("removeParticipantFromList index:" + index);
  if (index >= 0) {
    list.splice(index, 1);
  }
}

//Find the status of participant
function isParticipantPending(activityId, email, callback) {
  var isPending;
  Activity.findById(new ObjectId(activityId), function(err, activity) {
    // console.log(activity.pendingParticipants);
    // console.log("email:"+email);
    if (activity.pendingParticipants.length !== 0) {
      // console.log("activity.pendingParticipants[0].indexOf(email) >= 0");
      if (activity.pendingParticipants.indexOf(email) >= 0) {
        // console.log("isPending = true");
        isPending = true;
      } else {
        // console.log("isPending = false");
        isPending = false;
      }
    } else {
      // console.log("activity.pendingParticipants[0].indexOf(email) < 0");
      isPending = false;
    }
    callback(isPending);
  });
}

function isParticipantAccepted(activityId, email, callback, callback2) {
  var isAccepted;
  Activity.findById(new ObjectId(activityId), function(err, activity) {
    // console.log(activity.acceptedParticipants[0]);
    // console.log("email:"+email);
    if (activity.acceptedParticipants.length !== 0) {
      // console.log("activity.acceptedParticipants.indexOf(email) >= 0");
      if (activity.acceptedParticipants.indexOf(email) >= 0) {
        isAccepted = true;
      } else {
        isAccepted = false;
      }
    } else {
      // console.log("activity.acceptedParticipants[0].indexOf(email) < 0");
      isAccepted = false;
    }
    callback(isAccepted);
    callback2();
  });
}