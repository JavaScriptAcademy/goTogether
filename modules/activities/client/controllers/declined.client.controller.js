(function() {
  'use strict';

  angular
    .module('activities')
    .controller('DeclinedController', DeclinedController);

  DeclinedController.$inject = ['$scope', $http];

  function DeclinedController($scope, $http) {
    var vm = this;

    $http({
          method: 'GET',
          url: '/api/declined/activities'
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
