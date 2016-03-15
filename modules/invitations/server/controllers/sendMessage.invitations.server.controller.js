'use strict';

/**
 * Module dependencies.
 */var path = require('path'),
  mongoose = require('mongoose'),
  Invitation = mongoose.model('Invitation'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

exports.sendMessage = function(req,res){

}