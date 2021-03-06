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
  app.route('/api/users/email/:email').get(users.finduserbyemail);

  app.route('/api/users/friends').put(users.updateFriends);
  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
