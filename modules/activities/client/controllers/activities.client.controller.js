(function () {
  'use strict';

  // Activities controller
  angular
  .module('activities')
  .controller('ActivitiesController', ActivitiesController);

  ActivitiesController.$inject = ['$scope', '$state', '$http','Authentication', 'activityResolve', '$location'];

  function ActivitiesController ($scope, $state, $http, Authentication, activity, $location) {
    var vm = this;

    vm.authentication = Authentication;
    vm.activity = activity;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.acceptActivity = acceptActivity;
    vm.rejectActivity = rejectActivity;
    var activityId = $location.path().split('/')[2];
    var email = $location.path().split('/')[3];

    var friendsID = Authentication.user.friends;
    vm.friends = getFriends(friendsID);

// Get the friends as user object
    $http({
      url: '/api/activities/getUserFriends',
      method: 'post',
      data: {
        friends: Authentication.user.friends
      }
    }).then(function(response) {
      console.log(response.data);
      vm.friends = response.data;
    });

    if ($location.path().split('/')[3]) {
      $scope.response = true;
      getActivityParticipantStatus(activityId, email);
      autoSignout(Authentication.user,email);
    } else {
      $scope.response = false;
    }

    // Remove existing Activity
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.activity.$remove($state.go('activities.list'));
      }
    }


    // Save Activity
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.activityForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.activity._id) {
        vm.activity.$update(successCallback, errorCallback);
      } else {
        vm.activity.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('activities.view', {
          activityId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function getActivityParticipantStatus(activityId, email) {
      $http.get('/api/activities/invitation/' + activityId + '/' + email)
      .success(function(data){
        console.log('data');
        console.log(data);
        $scope.isPending = data.isPending;
        $scope.isAccepted = data.isAccepted;
      })
      .error(function(err){
        console.log(err);
      });
    }

    /*
    * Added by Cyrus 2016.3.20
    */
    //participant accpet activity

    function acceptActivity(){
    $http({
      method: 'post',
      url: '/api/activities/invitation/'+activityId+'/'+email+'/true'
      }).then(function successCallback(response) {
        // alert('Success in accepting activity');
        window.location.reload();
      }, function errorCallback(response) {
        alert('Accept activity error!');
      });
    }
     //participant reject activity
    function rejectActivity() {
      $http({
        method: 'post',
        url: '/api/activities/invitation/'+activityId+'/'+email+'/false'
      }).then(function successCallback(response) {
        window.location.reload();
      }, function errorCallback(response) {
        alert('Reject activity error!');
      });
    }
    function autoSignout(user,email){
      console.log(user);
      console.log("email:"+email);
      if(user !== null&&user.email !== email){
        $http({
          method: 'get',
          url: '/api/auth/signout'
        }).then(function successCallback(res) {
          console.log('succeed in signning out');
        }, function errorCallback(res){
          console.log('error in signning out');
        });
      }
    }
    function getFriends(friendsID){
      var friends = [];
      friendsID.forEach(function(friendID){
        $http({
          method: 'GET',
          url: '/api/users/friends/' + friendID
        }).then(function successCallback(response) {

          friends.push(response.data);

        }, function errorCallback(response) {

          console.log("get friends info error");

        });
      });
      return friends;
    }
  }
})();