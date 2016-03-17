'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$http', 'Authentication', 'Menus', 'Users',
  function ($scope, $state, $http, Authentication, Menus, Users) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
    $scope.userlist = false;
    $scope.search = function(){
      $scope.users = Users.query();
    };
    $scope.listAll = function(){
      // Research $http service (which is the equivalent of jQuery.ajax())
      // $scope.users = Users.query();
      // example of $http below

      $http({
        method: 'GET',
        url: '/api/users/search',
        data: {email: $scope.email},
      }).then(function successCallback(response) {
          console.log(response);
          $scope.users = response;
          $scope.userlist = true;
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {

          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };
  }
]);
