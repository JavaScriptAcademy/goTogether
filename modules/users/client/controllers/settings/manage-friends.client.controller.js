(function() {
  'use strict';

  angular
    .module('users')
    .controller('FriendsController', FriendsController);

  FriendsController.$inject = ['$scope', '$resource', 'Authentication', '$location',  '$http'];

  function FriendsController($scope, $resource, Authentication, $location, $http) {
    var vm = this;
    $scope.showAFButton=true;

    // Friends controller logic
    // ...
    var friendsIdList= Authentication.user.friends;
    $scope.friends = createFriendsList(friendsIdList);

    $scope.goToUserPage = function (userId) {
      $location.url('/users/' + userId);
    };

    init();

    function init() {

    }

    function createFriendsList(friendsIdList){
      var list=[];

      friendsIdList.forEach(function(friend){
        $http({
           method: 'GET',
           url: '/api/users/friends/' + friend
         }).then(function successCallback(response) {

             list.push(response.data);

           }, function errorCallback(response) {

             console.log("get friends info error");

        });

      });

      return list;
    }
  }
})();