'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Invitation = mongoose.model('Invitation'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Invitation
 */
exports.create = function(req, res) {
  var invitation = new Invitation(req.body);
  invitation.user = req.user;

  invitation.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invitation);
    }
  });
};

/**
 * Show the current Invitation
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var invitation = req.invitation ? req.invitation.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  invitation.isCurrentUserOwner = req.user && invitation.user && invitation.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(invitation);
};

/**
 * Update a Invitation
 */
exports.update = function(req, res) {
  var invitation = req.invitation ;

  invitation = _.extend(invitation , req.body);

  invitation.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invitation);
    }
  });
};

/**
 * Delete an Invitation
 */
exports.delete = function(req, res) {
  var invitation = req.invitation ;

  invitation.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invitation);
    }
  });
};

/**
 * List of Invitations
 */
exports.list = function(req, res) { 
  Invitation.find().sort('-created').populate('user', 'displayName').exec(function(err, invitations) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invitations);
    }
  });
};

/**
 * Invitation middleware
 */
exports.invitationByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Invitation is invalid'
    });
  }

  Invitation.findById(id).populate('user', 'displayName').exec(function (err, invitation) {
    if (err) {
      return next(err);
    } else if (!invitation) {
      return res.status(404).send({
        message: 'No Invitation with that identifier has been found'
      });
    }
    req.invitation = invitation;
    next();
  });
};
