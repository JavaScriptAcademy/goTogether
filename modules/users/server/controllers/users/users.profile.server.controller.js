'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function (req, res) {
  // Init Variables
  var user = req.user;

  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;

  if (user) {
    // Merge existing user
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.displayName = user.firstName + ' ' + user.lastName;

    user.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        req.login(user, function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(user);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Update profile picture
 */
exports.changeProfilePicture = function (req, res) {
  var user = req.user;
  var message = null;
  var upload = multer(config.uploads.profileUpload).single('newProfilePicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  if (user) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        user.profileImageURL = config.uploads.profileUpload.dest + req.file.filename;

        user.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            req.login(user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * search users
 */
exports.search = function (req, res) {

  // {"name": /.*m.*/}
  // todo - look Regular Expression
  User.find({ 'email': { $regex : req.params.email} }, function (err, data) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // todo change the below

      res.json(data);
    }
  });

};
//add by fiona 0321
// exports.findactivity = function (req, res) {

//   console.log("llll "+ req.params.activity);

//   // User.findOne({'activity':req.params.activity}, function (err, data) {
//   //   if (err) {
//   //     return res.status(400).send({
//   //       message: errorHandler.getErrorMessage(err)
//   //     });
//   //   } else {
//   //     // todo change the below
//   //     res.json(data);
//   //   }
//   // });

// };

/**
 * find user by id
 */
exports.finduser = function (req, res) {

  User.findOne({ '_id': req.params.userId }, function (err, data) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // todo change the below
      res.json(data);
    }
  });

};
/**
 * add user's friend
 */
 exports.addfriend = function (req, res) {
  // Init Variables
  var user = req.user;
  var friends = user.friends;
  friends.push(req.body.userId);

  User.findOneAndUpdate({'_id' :user._id }, {'friends': friends}, function(err){
    if(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else{

      res.json(user);

    }

  });
};
/**
 * Send User
 */
exports.me = function (req, res) {
  res.json(req.user || null);
};
