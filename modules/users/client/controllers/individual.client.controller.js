(function() {
  'use strict';

  angular
    .module('users')
    .controller('IndividualController', IndividualController);

  IndividualController.$inject = ['$scope', 'userResolve', '$resource', '$http', 'Authentication', '$location'];

  function IndividualController($scope, user, $resource, $http, Authentication, $location) {
    var vm = this;
    $scope.showAFButton=true;

    // Individual controller logic
    // ...
    $scope.user = user;


    var friends = Authentication.user.friends;

    if(friends.includes(user._id)||Authentication.user._id===user._id){
      $scope.showAFButton=false;
    }

    $scope.addFriend = function(){

      if(friends.includes(user._id)){
        $scope.addFriendRepeatWarn=true;
        return;
      }

      friends.push(user._id);

      $http({
        method: 'PUT',
        url: '/api/users/friends',
        data: { user : Authentication.user }
      }).then(function successCallback(response) {

            $scope.showAFButton=false;
            $scope.addFriendSuccess=true;

              // this callback will be called asynchronously
              // when the response is available
          }, function errorCallback(response) {

              $scope.addFriendFail = true;
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
    };

    $scope.goHomePage = function(){

      if(history.length === 1){
        $location.url('/');
      }else{
        history.back();
      }



    };

    init();

    function init() {
    }
  }
})();