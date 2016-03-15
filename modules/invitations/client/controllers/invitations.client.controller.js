(function () {
  'use strict';

  // Invitations controller
  angular
    .module('invitations')
    .controller('InvitationsController', InvitationsController);

  InvitationsController.$inject = ['$scope', '$state', 'Authentication', 'invitationResolve'];

  function InvitationsController ($scope, $state, Authentication, invitation) {
    var vm = this;

    vm.authentication = Authentication;
    vm.invitation = invitation;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Invitation
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.invitation.$remove($state.go('invitations.list'));
      }
    }

    // Save Invitation
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.invitationForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.invitation._id) {
        vm.invitation.$update(successCallback, errorCallback);
      } else {
        vm.invitation.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('invitations.view', {
          invitationId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
