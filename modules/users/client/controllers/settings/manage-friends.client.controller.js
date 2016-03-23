(function() {
  'use strict';

  angular
    .module('users')
    .controller('FriendsController', FriendsController);

  FriendsController.$inject = ['$scope', '$resource', 'Authentication', '$location', '$http'];

  function FriendsController($scope, $resource, Authentication, $location, $http) {
    var vm = this;
    $scope.showAFButton=true;
    $scope.deleteButtonShow=false;
    var goToUPflag=true;

    // Friends controller logic
    // ...
    var friendsIdList= Authentication.user.friends;
    $scope.friends = createFriendsList(friendsIdList);

    $scope.goToUserPage = function (userId) {
      if(goToUPflag){
        $location.url('/users/' + userId);
      }
    };


    $scope.deletFriend=function(userId, userDisplayName){
      goToUPflag=false;
      if (window.confirm('Are you sure you want to delete friend: '+userDisplayName+'?')){
        var friendsList= Authentication.user.friends;
        friendsList.splice(friendsList.indexOf(userId),1);
        $http({
          method: 'PUT',
          url: '/api/users/friends/',
          data: { user : Authentication.user }
        }).then(function successCallback(response) {

         window.location.reload();
       }, function errorCallback(response) {

         alert('Delete friend error!');

       });
      }

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

             console.log('get friends info error');

           });

      });

      return list;
    }
  }
})();