'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),

  Activity = require('../models/activity.server.model.js'),
  //User = require('../../../users/server/models/user.server.model.js'),
  User = mongoose.model('User'),

  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

var express = require('express');
var mailgun = require('../../../../config/lib/mailgun');

//init express
var app = express();




/**
 * Create a Activity
 */
exports.create = function(req, res) {
  var activity = new Activity(req.body);
  activity.user = req.user;
// --------------------------------
//  edit the activity pendingPaticipents format from string to array
// -----------------------------------
  activity.save(function(err, activityResponse) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      //send email to the participant
      mailgun.sendEmail(activity);

      var condition, update, options, callback;
      options = {multi: false, upsert: true};
      callback = function(err) {
          console.log('cannot upsert the user with activityId: ' + err);
      };
      //update participant's activity list
      activityResponse.pendingParticipants[0].split("; ").forEach(function(participantEmail) {
        condition = {'email': participantEmail, 'username': participantEmail};
        update = {$push: {'activities': activityResponse._id}};
        User.findOneAndUpdate(condition, update, options, callback);
      });

      //update organizer's activity list
      condition = {'email': activity.user.email};
      User.update(condition, update, options, callback);
    }

      res.jsonp(activity);

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

exports.listByStatus = function(req, res) {

  var participants = req.body.participants;

  User.find({ email: { $in: participants }}, {password:0, salt:0}).exec(function(err, users) {
    res.jsonp(users);
  });
};


exports.getUserFriends = function(req, res) {

  var friends = req.body.friends;

  User.find({ _id: { $in: friends }}, {password:0, salt:0}).exec(function(err, users) {
    res.jsonp(users);
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


