(function() {
  'use strict';

  angular
    .module('users')
    .controller('IndividualController', IndividualController);

  IndividualController.$inject = ['$scope', 'userResolve'];

  function IndividualController($scope, user) {
    var vm = this;

    // Individual controller logic
    // ...
    $scope.user = user;

    $scope.addFriend= function(){

        $resource('/api/users/friends', {userId: user._id}, {'update': {method:'PUT'}});
    };

    init();

    function init() {
    }
  }
})();