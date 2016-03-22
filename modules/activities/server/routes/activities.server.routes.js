'use strict';

/**
 * Module dependencies
 */
var activitiesPolicy = require('../policies/activities.server.policy'),
  activities = require('../controllers/activities.server.controller'),
  invitation = require('../controllers/activities.invitation.server.controller');

module.exports = function(app) {
  // Activities Routes
  app.route('/api/activities').all(activitiesPolicy.isAllowed)
    .get(activities.list)
    .post(activities.create);

  app.route('/api/activities/invitation/:response').all()
    .post(invitation.response);

  app.route('/api/activities/invitation/:activityId/:email').all()//activitiesPolicy.isAllowed
    .get(invitation.read);

  app.route('/api/activities/getUsersByStatus').post(activities.listByStatus);

  app.route('/api/activities/getUserFriends').post(activities.getUserFriends);


  app.route('/api/activities/:activityId').all(activitiesPolicy.isAllowed)
    .get(activities.read)
    .put(activities.update)
    .delete(activities.delete);

  // Finish by binding the Activity middleware
  app.param('activityId', activities.activityByID);
};
