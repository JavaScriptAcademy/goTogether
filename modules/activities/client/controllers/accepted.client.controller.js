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
          console.log(response.data);

        }, function errorCallback(response) {


          console.log("error "+ response.data);

          $scope.activities = [];
          console.log("length: "+$scope.activities.length);

          console.log("get accepted activities info error");

        });




 }
})();
