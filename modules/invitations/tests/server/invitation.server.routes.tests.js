'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Invitation = mongoose.model('Invitation'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, invitation;

/**
 * Invitation routes tests
 */
describe('Invitation CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Invitation
    user.save(function () {
      invitation = {
        name: 'Invitation name'
      };

      done();
    });
  });

  it('should be able to save a Invitation if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Invitation
        agent.post('/api/invitations')
          .send(invitation)
          .expect(200)
          .end(function (invitationSaveErr, invitationSaveRes) {
            // Handle Invitation save error
            if (invitationSaveErr) {
              return done(invitationSaveErr);
            }

            // Get a list of Invitations
            agent.get('/api/invitations')
              .end(function (invitationsGetErr, invitationsGetRes) {
                // Handle Invitation save error
                if (invitationsGetErr) {
                  return done(invitationsGetErr);
                }

                // Get Invitations list
                var invitations = invitationsGetRes.body;

                // Set assertions
                (invitations[0].user._id).should.equal(userId);
                (invitations[0].name).should.match('Invitation name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Invitation if not logged in', function (done) {
    agent.post('/api/invitations')
      .send(invitation)
      .expect(403)
      .end(function (invitationSaveErr, invitationSaveRes) {
        // Call the assertion callback
        done(invitationSaveErr);
      });
  });

  it('should not be able to save an Invitation if no name is provided', function (done) {
    // Invalidate name field
    invitation.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Invitation
        agent.post('/api/invitations')
          .send(invitation)
          .expect(400)
          .end(function (invitationSaveErr, invitationSaveRes) {
            // Set message assertion
            (invitationSaveRes.body.message).should.match('Please fill Invitation name');

            // Handle Invitation save error
            done(invitationSaveErr);
          });
      });
  });

  it('should be able to update an Invitation if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Invitation
        agent.post('/api/invitations')
          .send(invitation)
          .expect(200)
          .end(function (invitationSaveErr, invitationSaveRes) {
            // Handle Invitation save error
            if (invitationSaveErr) {
              return done(invitationSaveErr);
            }

            // Update Invitation name
            invitation.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Invitation
            agent.put('/api/invitations/' + invitationSaveRes.body._id)
              .send(invitation)
              .expect(200)
              .end(function (invitationUpdateErr, invitationUpdateRes) {
                // Handle Invitation update error
                if (invitationUpdateErr) {
                  return done(invitationUpdateErr);
                }

                // Set assertions
                (invitationUpdateRes.body._id).should.equal(invitationSaveRes.body._id);
                (invitationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Invitations if not signed in', function (done) {
    // Create new Invitation model instance
    var invitationObj = new Invitation(invitation);

    // Save the invitation
    invitationObj.save(function () {
      // Request Invitations
      request(app).get('/api/invitations')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Invitation if not signed in', function (done) {
    // Create new Invitation model instance
    var invitationObj = new Invitation(invitation);

    // Save the Invitation
    invitationObj.save(function () {
      request(app).get('/api/invitations/' + invitationObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', invitation.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Invitation with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/invitations/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Invitation is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Invitation which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Invitation
    request(app).get('/api/invitations/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Invitation with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Invitation if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Invitation
        agent.post('/api/invitations')
          .send(invitation)
          .expect(200)
          .end(function (invitationSaveErr, invitationSaveRes) {
            // Handle Invitation save error
            if (invitationSaveErr) {
              return done(invitationSaveErr);
            }

            // Delete an existing Invitation
            agent.delete('/api/invitations/' + invitationSaveRes.body._id)
              .send(invitation)
              .expect(200)
              .end(function (invitationDeleteErr, invitationDeleteRes) {
                // Handle invitation error error
                if (invitationDeleteErr) {
                  return done(invitationDeleteErr);
                }

                // Set assertions
                (invitationDeleteRes.body._id).should.equal(invitationSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Invitation if not signed in', function (done) {
    // Set Invitation user
    invitation.user = user;

    // Create new Invitation model instance
    var invitationObj = new Invitation(invitation);

    // Save the Invitation
    invitationObj.save(function () {
      // Try deleting Invitation
      request(app).delete('/api/invitations/' + invitationObj._id)
        .expect(403)
        .end(function (invitationDeleteErr, invitationDeleteRes) {
          // Set message assertion
          (invitationDeleteRes.body.message).should.match('User is not authorized');

          // Handle Invitation error error
          done(invitationDeleteErr);
        });

    });
  });

  it('should be able to get a single Invitation that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Invitation
          agent.post('/api/invitations')
            .send(invitation)
            .expect(200)
            .end(function (invitationSaveErr, invitationSaveRes) {
              // Handle Invitation save error
              if (invitationSaveErr) {
                return done(invitationSaveErr);
              }

              // Set assertions on new Invitation
              (invitationSaveRes.body.name).should.equal(invitation.name);
              should.exist(invitationSaveRes.body.user);
              should.equal(invitationSaveRes.body.user._id, orphanId);

              // force the Invitation to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Invitation
                    agent.get('/api/invitations/' + invitationSaveRes.body._id)
                      .expect(200)
                      .end(function (invitationInfoErr, invitationInfoRes) {
                        // Handle Invitation error
                        if (invitationInfoErr) {
                          return done(invitationInfoErr);
                        }

                        // Set assertions
                        (invitationInfoRes.body._id).should.equal(invitationSaveRes.body._id);
                        (invitationInfoRes.body.name).should.equal(invitation.name);
                        should.equal(invitationInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Invitation.remove().exec(done);
    });
  });
});
