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

    var pending = [];
    var accepted = [];
    var declined = [];
// get pending user objects
    for(var index = 0; index < vm.activity.pendingParticipants.length; index++ ){
      $http.get('/api/users/search/' + vm.activity.pendingParticipants[index])
      .success(function(data){
        pending.push(data[0]);
        vm.pendingParticipants = pending;
      })
      .error(function(err){
        console.log(err);
      });
    }
// get accepted user objects
    for(var index = 0; index < vm.activity.acceptedParticipants.length; index++ ){
      $http.get('/api/users/search/' + vm.activity.acceptedParticipants[index])
      .success(function(data){
        accepted.push(data[0]);
        console.log(data[0].displayName);
        vm.acceptedParticipants = accepted;
      })
      .error(function(err){
        console.log(err);
      });
    }
// get declined user objects
    for(var index = 0; index < vm.activity.declinedParticipants.length; index++ ){
      $http.get('/api/users/search/' + vm.activity.declinedParticipants[index])
      .success(function(data){
        declined.push(data[0]);
        vm.declinedParticipants = declined;
      })
      .error(function(err){
        console.log(err);
      });
    }



// Get the friends as user object
    var friendsID = Authentication.user.friends;
    var friends = [];

    for(var friendID of friendsID){
      $http({
       method: 'GET',
       url: '/api/users/friends/' + friendID
     }).then(function successCallback(response) {

       friends.push(response.data);
       vm.friends = friends;
     }, function errorCallback(response) {
       console.log("get friends info error");
     });
   }


   if($location.path().split('/')[3]){
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
  }
})();
