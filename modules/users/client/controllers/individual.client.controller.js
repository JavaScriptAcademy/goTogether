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
    init();

    function init() {
    }
  }
})();