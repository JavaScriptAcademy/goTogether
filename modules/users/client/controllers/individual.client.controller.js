(function() {
  'use strict';

  angular
    .module('users')
    .controller('IndividualController', IndividualController);

  IndividualController.$inject = ['$scope', 'userResolve', '$resource'];

  function IndividualController($scope, user,$resource) {
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