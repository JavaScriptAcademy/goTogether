'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),

  Activity = require('../models/activity.server.model.js'),

  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

var express = require('express');

//init express
var app = express();


/**
 * Show the current Activity
 */
exports.read = function(req, res) {

 var email = req.param('email');
 var activityId = requ.param('activityId');
 var activity = req.activity;

};