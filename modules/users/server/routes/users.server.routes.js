'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);

  app.route('/api/users/search/:email').get(users.search);
  app.route('/api/users/friends/:userId').get(users.finduser);
<<<<<<< HEAD
  app.route('/api/users/friends').put(users.addfriend);
  //add by fiona 0321
  // app.route('/api/users/activities/:activityId').get(users.findactivity);
=======
  app.route('/api/users/friends').put(users.updateFriends);
>>>>>>> b2778eb670320e442033982b5c6700f580899a5d
  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
