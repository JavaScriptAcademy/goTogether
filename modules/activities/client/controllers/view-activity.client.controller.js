(function () {
  'use strict';

  // Activities controller
  angular
  .module('activities')
  .controller('ViewActivityController', ViewActivityController);

  ViewActivityController.$inject = ['$scope', '$state', '$http','Authentication', 'activityResolve', '$location'];

  function ViewActivityController ($scope, $state, $http, Authentication, activity, $location) {
    var vm = this;

    vm.authentication = Authentication;
    vm.activity = activity;
    // vm.error = null;
    // vm.form = {};
    vm.remove = remove;
    // vm.save = save;
    // vm.acceptActivity = acceptActivity;
    // vm.rejectActivity = rejectActivity;

    var pending = [];
    var accepted = [];
    var declined = [];

    // debugger;

    $http({
      url: '/api/activities/getUsersByStatus',
      method: 'post',
      data: {
        participants: activity.pendingParticipants
      }
    }).then(function(response) {
      vm.pendingParticipants = response.data;
    });

    $http({
      url: '/api/activities/getUsersByStatus',
      method: 'post',
      data: {
        participants: activity.acceptedParticipants
      }
    }).then(function(response) {
      vm.acceptedParticipants = response.data;
    });

    $http({
      url: '/api/activities/getUsersByStatus',
      method: 'post',
      data: {
        participants: activity.declinedParticipants
      }
    }).then(function(response) {
      vm.declinedParticipants = response.data;
    });



    // Remove existing Activity
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.activity.$remove($state.go('activities.list'));
      }
    }
  }
})();
