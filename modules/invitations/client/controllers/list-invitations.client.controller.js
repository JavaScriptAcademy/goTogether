(function () {
  'use strict';

  angular
    .module('invitations')
    .controller('InvitationsListController', InvitationsListController);

  InvitationsListController.$inject = ['InvitationsService'];

  function InvitationsListController(InvitationsService) {
    var vm = this;

    vm.invitations = InvitationsService.query();
  }
})();
