(function () {
  'use strict';

  describe('Invitations Route Tests', function () {
    // Initialize global variables
    var $scope,
      InvitationsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _InvitationsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      InvitationsService = _InvitationsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('invitations');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/invitations');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          InvitationsController,
          mockInvitation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('invitations.view');
          $templateCache.put('modules/invitations/client/views/view-invitation.client.view.html', '');

          // create mock Invitation
          mockInvitation = new InvitationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Invitation Name'
          });

          //Initialize Controller
          InvitationsController = $controller('InvitationsController as vm', {
            $scope: $scope,
            invitationResolve: mockInvitation
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:invitationId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.invitationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            invitationId: 1
          })).toEqual('/invitations/1');
        }));

        it('should attach an Invitation to the controller scope', function () {
          expect($scope.vm.invitation._id).toBe(mockInvitation._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/invitations/client/views/view-invitation.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          InvitationsController,
          mockInvitation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('invitations.create');
          $templateCache.put('modules/invitations/client/views/form-invitation.client.view.html', '');

          // create mock Invitation
          mockInvitation = new InvitationsService();

          //Initialize Controller
          InvitationsController = $controller('InvitationsController as vm', {
            $scope: $scope,
            invitationResolve: mockInvitation
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.invitationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/invitations/create');
        }));

        it('should attach an Invitation to the controller scope', function () {
          expect($scope.vm.invitation._id).toBe(mockInvitation._id);
          expect($scope.vm.invitation._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/invitations/client/views/form-invitation.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          InvitationsController,
          mockInvitation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('invitations.edit');
          $templateCache.put('modules/invitations/client/views/form-invitation.client.view.html', '');

          // create mock Invitation
          mockInvitation = new InvitationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Invitation Name'
          });

          //Initialize Controller
          InvitationsController = $controller('InvitationsController as vm', {
            $scope: $scope,
            invitationResolve: mockInvitation
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:invitationId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.invitationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            invitationId: 1
          })).toEqual('/invitations/1/edit');
        }));

        it('should attach an Invitation to the controller scope', function () {
          expect($scope.vm.invitation._id).toBe(mockInvitation._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/invitations/client/views/form-invitation.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
