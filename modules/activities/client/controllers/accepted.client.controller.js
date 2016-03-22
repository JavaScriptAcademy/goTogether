(function() {
  'use strict';

  angular
  .module('activities')
  .controller('AcceptedController', AcceptedController);

  AcceptedController.$inject = ['$scope', '$state', '$http','Authentication', '$location'];

  function AcceptedController($scope, $state, $http, Authentication, $location) {
    var vm = this;

    vm.authentication = Authentication;

    $http({
          method: 'GET',
          url: '/api/accepted/activities'
        }).then(function successCallback(response) {

          $scope.activities = response.data;

        }, function errorCallback(response) {

          console.log("get friends info error");

        });

    init();

    function init() {
    }
  }
})();
