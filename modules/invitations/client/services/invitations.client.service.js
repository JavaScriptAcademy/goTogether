//Invitations service used to communicate Invitations REST endpoints
(function () {
  'use strict';

  angular
    .module('invitations')
    .factory('InvitationsService', InvitationsService);

  InvitationsService.$inject = ['$resource'];

  function InvitationsService($resource) {
    return $resource('api/invitations/:invitationId', {
      invitationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
