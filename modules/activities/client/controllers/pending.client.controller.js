(function() {
  'use strict';

  angular
    .module('activities')
    .controller('PendingController', PendingController);

  PendingController.$inject = ['$scope','$http','Authentication'];

  function PendingController($scope, $http, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    $scope.notEmpaty = true;

    $http({
          method: 'GET',
          url: '/api/pending/activities'
        }).then(function successCallback(response) {

          $scope.activities = response.data;
          console.log("klllllllll:"+JSON.stringify(response.data));

          if(response.data.length === 0){
            $scope.activities = [];
            $scope.notEmpaty = false;

          }

        }, function errorCallback(response) {

          console.log("get pending activities info error");

        });

    init();

    function init() {
    }
  }
})();
