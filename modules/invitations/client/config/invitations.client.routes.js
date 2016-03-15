(function () {
  'use strict';

  angular
    .module('invitations')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('invitations', {
        abstract: true,
        url: '/invitations',
        template: '<ui-view/>'
      })
      .state('invitations.list', {
        url: '',
        templateUrl: 'modules/invitations/client/views/list-invitations.client.view.html',
        controller: 'InvitationsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Invitations List'
        }
      })
      .state('invitations.create', {
        url: '/create',
        templateUrl: 'modules/invitations/client/views/form-invitation.client.view.html',
        controller: 'InvitationsController',
        controllerAs: 'vm',
        resolve: {
          invitationResolve: newInvitation
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Invitations Create'
        }
      })
      .state('invitations.edit', {
        url: '/:invitationId/edit',
        templateUrl: 'modules/invitations/client/views/form-invitation.client.view.html',
        controller: 'InvitationsController',
        controllerAs: 'vm',
        resolve: {
          invitationResolve: getInvitation
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Invitation {{ invitationResolve.name }}'
        }
      })
      .state('invitations.view', {
        url: '/:invitationId',
        templateUrl: 'modules/invitations/client/views/view-invitation.client.view.html',
        controller: 'InvitationsController',
        controllerAs: 'vm',
        resolve: {
          invitationResolve: getInvitation
        },
        data:{
          pageTitle: 'Invitation {{ articleResolve.name }}'
        }
      });
  }

  getInvitation.$inject = ['$stateParams', 'InvitationsService'];

  function getInvitation($stateParams, InvitationsService) {
    return InvitationsService.get({
      invitationId: $stateParams.invitationId
    }).$promise;
  }

  newInvitation.$inject = ['InvitationsService'];

  function newInvitation(InvitationsService) {
    return new InvitationsService();
  }
})();
