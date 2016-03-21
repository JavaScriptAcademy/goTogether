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

var Activity = require('../models/activity.server.model.js');

/**
 * Show the current Activity
 */
exports.read = function(req, res) {
 //get data from parameter
 var email = req.param('email');
 var activityId = req.param('activityId');
 var activity = req.activity;

 //send infomations to activity detail page
  res.redirect('/activities/'+activityId+'/'+email);//
};

//when participant accept/reject invitation, move participant from pendding list to accpet/decline list
exports.move = function(req,res){

};