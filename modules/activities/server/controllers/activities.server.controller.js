'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  //Activity = mongoose.model('Activity'),
  Activity = require('../models/activity.server.model.js'),

  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

var express = require('express');
var Mailgun = require('mailgun-js');
//init express
var app = express();

//Your api key, from Mailgun’s Control Panel
var api_key = 'key-fa85f8e2168b0a7a3f96ff1f78d3d517';

//Your domain, from the Mailgun Control Panel
var domain = 'sandboxdf5afec8545f46e4a212bb2f8e4533e5.mailgun.org';

//Your sending email address
var from_who = 'admin@gotogether.com';


function sendEmail(activity) {
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});
   //Invokes the method to send emails given the above data with the helper library
   var participants = activity.pendingParticipants[0].split("; ");
    participants.forEach(function (participant) {
       var data = {
            //Specify email data
             from: from_who,
            //The email to contact
             to: participant,
            //Subject and text data
             subject: 'Invitation to' + activity.activityName ,
             html: formEmailBody(participant, activity)
            };

        mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
         if (err) {
               console.log("got an error: ", err);
         }
         //Else we can greet and leave
         else {
                console.log('success send email to: ' + participant);
         }
        });
    });
}

function formEmailBody(email,activity) {
    var greeting = '<p>Hi,</p>';
    var greeting_message = '<p>&nbsp &nbsp There is an invitation for you, from your friend: ' + activity.user.username + '</p>';
    var name = '<div><br>Activity Name : </br>' + activity.activityName + '</div>';
    var location = '<div><br>Activity location : </br>' + activity.activityLocation + '</div>';
    var activity_date = '<div><br>Activity Date : </br>' + activity.startDate + ' to ' + activity.endDate + '</div>';
    var activity_time = '<div><br>Activity Time : </br>' + activity.startTime + ' to ' + activity.endTime + '</div>';
    var info = '<div><br>Activity Information : </br>' + activity.activityInfo + '</div>';
    var link = '<div><a href="http://localhost:6001//invitation//' + email + '">Click here to respond to this invitation.</a></div>';
    return greeting + greeting_message + name + location + activity_date + activity_time + info + link;
}
/**
 * Create a Activity
 */
exports.create = function(req, res) {
  var activity = new Activity(req.body);
  activity.user = req.user;


// --------------------------------
//  edit the activity pendingPaticipents format from string to array
// -----------------------------------
  activity.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
       //-------------------------------
 // invoke the function to send the email
 //..........................
      sendEmail(activity);
      res.jsonp(activity);
    }
  });
};

/**
 * Show the current Activity
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var activity = req.activity ? req.activity.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  activity.isCurrentUserOwner = req.user && activity.user && activity.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(activity);
};

/**
 * Update a Activity
 */
exports.update = function(req, res) {
  var activity = req.activity ;

  activity = _.extend(activity , req.body);

  activity.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(activity);
    }
  });
};

/**
 * Delete an Activity
 */
exports.delete = function(req, res) {
  var activity = req.activity ;

  activity.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(activity);
    }
  });
};

/**
 * List of Activities
 */
exports.list = function(req, res) {
  Activity.find().sort('-created').populate('user', 'displayName').exec(function(err, activities) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(activities);
    }
  });
};

/**
 * Activity middleware
 */
exports.activityByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Activity is invalid'
    });
  }

  Activity.findById(id).populate('user', 'displayName').exec(function (err, activity) {
    if (err) {
      return next(err);
    } else if (!activity) {
      return res.status(404).send({
        message: 'No Activity with that identifier has been found'
      });
    }
    req.activity = activity;
    next();
  });
};
