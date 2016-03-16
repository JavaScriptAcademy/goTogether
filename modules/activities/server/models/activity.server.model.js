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
  activityName: {
   type: String,
   default: 'activityName',
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
  activityLocation: String,
  activityImage: String,
  activityInfo: String,
  organizer: {
   type: String,
   ref: 'User' //?? or email?
 },
  pendingUser: Array,
  acceptedUser:Array,
  declinedUser:Array,
});

mongoose.model('Activity', ActivitySchema);


// var ActivitySchema = new Schema({
//   name: {
//     type: String,
//     default: '',
//     required: 'Please fill Activity name',
//     trim: true
//   },
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   user: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   }
// });



// module.exports = mongoose.model('ActivitySchema');

