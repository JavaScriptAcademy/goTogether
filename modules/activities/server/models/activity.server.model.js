'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
  // name: {
  //   type: String,
  //   default: '',
  //   required: 'Please fill Activity name',
  //   trim: true
  // },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  activityName: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: Date.now
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: Date.now
  },
  activityLocation: {
    type: String,
    default: '',
    trim: true
  },
  activityInfo: {
    type: String,
    default: '',
    trim: true
  },
  organiser: {
    type: String,
    default: '',
    trim: true
  },
  pendingUser: {
    type: Array,
    default: [],
    trim: true
  },
  acceptedUser: {
    type: Array,
    default: [],
    trim: true
  },
  declinedUser: {
    type: Array,
    default: [],
    trim: true
  },
  participant:{
    type: Array,
    default: [],
    trim: true
  }
});

mongoose.model('Activity', ActivitySchema);
