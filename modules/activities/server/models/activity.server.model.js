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
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    default: '',
    trim: true
  },
  info: {
    type: String,
    default: '',
    trim: true
  },
  organiser: {
    type: String,
    default: '',
    trim: true
  },
  pendingParticipants: {
    type: Array,
    default: [],
    trim: true
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
