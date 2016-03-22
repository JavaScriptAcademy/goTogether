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

    var friendsID = Authentication.user.friends;
    vm.friends = getFriends(friendsID);


    if ($location.path().split('/')[3]) {
      $scope.response = true;
      var email = $location.path().split('/')[3];
      var activityId = $location.path().split('/')[2];
      getActivityParticipantStatus(activityId, email);
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
        console.log(data);
        $scope.isNew = data.isNew;
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
      console.log('participant accept the activity');

      $http.post('/api/activities/invitation/true',vm.activity)
      .success(function(res){
        console.log('success proceed user accept activity');
        $state.go('response', {
        activityId: res._id
        });
      })
      .error(function(err){
        console.log('fail proceed user accept activity');
        $scope.error = err.message;
      });
    }

    //participant reject activity
    function rejectActivity(){
      console.log('participant reject the activity');
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
