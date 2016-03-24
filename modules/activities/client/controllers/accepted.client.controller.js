(function() {
  'use strict';

  angular
  .module('activities')
  .controller('AcceptedController', AcceptedController);

  AcceptedController.$inject = ['$scope', '$state', '$http','Authentication', '$location'];

  function AcceptedController($scope, $state, $http, Authentication, $location) {
    var vm = this;
   $scope.notEmpaty = true;


    vm.authentication = Authentication;

    $http({
          method: 'GET',
          url: '/api/accepted/activities'
        }).then(function successCallback(response) {

          $scope.activities = response.data;
          console.log(response.data);
          if(response.data.length === 0){
            $scope.activities = [];
            $scope.notEmpaty = false;

          }
        }, function errorCallback(response) {


          console.log("get accepted activities info error");

        });




 }
})();
