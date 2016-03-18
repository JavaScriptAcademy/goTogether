'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$http', 'Authentication', 'Menus',
  function ($scope, $state, $http, Authentication, Menus) {
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

    $scope.listAll = function(){
      // Research $http service (which is the equivalent of jQuery.ajax())
      // $scope.users = Users.query();
      // example of $http below
      if($scope.email === ""){

         $scope.userlist = false;

      }else{

          $http({
            method: 'GET',
            url: '/api/users/search/'+$scope.email
          }).then(function successCallback(response) {

              if(response.data.length === 0) {

                 $scope.users = [{'username' : 'No User Found!', 'email' : 'Try Again...'}];
                 $scope.userlist = true;

              }else{

                 $scope.users = response.data;
                 $scope.userlist = true;
              }


              // this callback will be called asynchronously
              // when the response is available
            }, function errorCallback(response) {

              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
      }
    };
    $scope.goToUserPage = function (email) {
      window.open('/users/' + email);
    }
  }
]);
