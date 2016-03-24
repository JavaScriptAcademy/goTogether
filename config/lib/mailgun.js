'use strict';

var Mailgun = require('mailgun-js');
var config = require('../env/development');
var fs = require('fs');
var jade = require('jade');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');

var templateDir = path.join(__dirname, 'template', 'invitation-email');


// var formEmailBody = function(email,activity){
//   var greeting = '<p>Hi,</p>';
//   var greeting_message = '<p>&nbsp &nbsp There is an invitation for you, from your friend: ' + activity.user.username + '</p>';
//   var name = '<div><br>Activity Name : </br>' + activity.activityName + '</div>';
//   var location = '<div><br>Activity location : </br>' + activity.activityLocation + '</div>';
//   var activity_date = '<div><br>Activity Date : </br>' + activity.startDate + ' to ' + activity.endDate + '</div>';
//   var activity_time = '<div><br>Activity Time : </br>' + activity.startTime + ' to ' + activity.endTime + '</div>';
//   var info = '<div><br>Activity Information : </br>' + activity.activityInfo + '</div>';
//   var link = '<div><a href="http://localhost:3000/activities/' +activity._id+'/'+ email + '">Click here to respond to this invitation.</a></div>';
//   return greeting + greeting_message + name + location + activity_date + activity_time + info + link;
// };

//send email
module.exports.sendEmail = function(activity){
  var mailgun = new Mailgun({apiKey: config.mailgun.api_key, domain: config.mailgun.domain});
  //Invokes the method to send emails given the above data with the helper library
  var participants = activity.pendingParticipants;
  participants.forEach(function (participant) {
    var html;
    fs.readFile('config/lib/template/invitation-email/invitation-email.jade', 'utf-8', function(error, source){
      var template = jade.compile(source);
      html = template({
                        activity: activity,
                        participant: {email: participant}
                      });
      var invitation = new EmailTemplate(templateDir);

    invitation.render(activity, function (err, result) {
      var data = {
        //Specify email data
        from: config.mailgun.from_who,
        //The email to contact
        to: participant,
        //Subject and text data
        subject: 'Invitation to ' + activity.activityName ,
        html: html
      };

      mailgun.messages().send(data, function (err, body) {
      //If there is an error, render the error page
      if (err) {
        console.log("got an error: ", err);
      }
       //Else we can greet and leave
      else {
        console.log('success send email to: ' + participant);
      }
      });
    });
    });


  });
};

