'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Invitation Schema
 */
var InvitationSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Invitation name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Invitation', InvitationSchema);
