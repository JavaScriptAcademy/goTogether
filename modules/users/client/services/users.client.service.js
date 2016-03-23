'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
  function ($resource) {
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//TODO this should be Users service
angular.module('users.admin').factory('Admin', ['$resource',
  function ($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('SearchUser', ['$resource',
  function ($resource) {
    return $resource('api/users/friends/:userId', {
      userId: '@_id'
    });
  }
]);

angular.module('goTogether',[]).factory('PassEmail', function(){
  var email="";
    return {
            getEmail: function () {
                return email;
            },
            setEmail: function(value) {
                email = value;
            }
        };
});