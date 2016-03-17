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
    required: 'Name cannot be blank'
  },
  startTime: {
    type: Date,
    trim: true,
    required: 'Start Time cannot be blank'
  },
  endTime: {
    type: Date
  },
  startDate: {
    type: Date,
    trim: true,
    required: 'Start Date cannot be blank'
  },
  endDate: {
    type: Date
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
  // organiser: {
  //   type: String,
  //   default: '',
  //   trim: true
  // },
  pendingParticipants: {
    type: Array,
    default: [],
    trim: true,
    required: 'Paticipant cannot be blank'

  },
  acceptedParticipants: {
    type: Array,
    default: [],
    trim: true
  },
  declinedParticipants: {
    type: Array,
    default: [],
    trim: true
  }
});

 module.exports = mongoose.model('Activity', ActivitySchema);
