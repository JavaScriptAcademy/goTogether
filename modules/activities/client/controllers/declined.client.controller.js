(function() {
  'use strict';

  angular
    .module('activities')
    .controller('DeclinedController', DeclinedController);

  DeclinedController.$inject = ['$scope', '$http','Authentication',];

  function DeclinedController($scope, $http, Authentication) {
    var vm = this;

    $scope.notEmpaty = true;


    vm.authentication = Authentication;

    $http({
          method: 'GET',
          url: '/api/declined/activities'
        }).then(function successCallback(response) {

          $scope.activities = response.data;

          if(response.data.length === 0){
            $scope.activities = [];
            $scope.notEmpaty = false;
          }

        }, function errorCallback(response) {

          console.log("get declined activities info error");

        });

    init();

    function init() {
    }
  }
})();
