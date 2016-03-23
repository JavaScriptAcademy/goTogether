(function() {
  'use strict';

  angular
    .module('activities')
    .controller('PendingController', PendingController);

  PendingController.$inject = ['$scope','$http'];

  function PendingController($scope,$http) {
    var vm = this;

    // vm.authentication = Authentication;

    $http({
          method: 'GET',
          url: '/api/pending/activities'
        }).then(function successCallback(response) {

          $scope.activities = response.data;

        }, function errorCallback(response) {

          console.log("get pending activities info error");

        });

    init();

    function init() {
    }
  }
})();
