(function () {
  'use strict';

  angular
    .module('activities')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('activities', {
        abstract: true,
        url: '/activities',
        template: '<ui-view/>'
      })
      .state('activities.list', {
        url: '',
        templateUrl: 'modules/activities/client/views/list-activities.client.view.html',
        controller: 'ActivitiesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Activities List'
        }
      })
      .state('activities.create', {
        url: '/create',
        templateUrl: 'modules/activities/client/views/form-activity.client.view.html',
        controller: 'ActivitiesController',
        controllerAs: 'vm',
        resolve: {
          activityResolve: newActivity
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Activities Create'
        }
      })
      .state('activities.edit', {
        url: '/:activityId/edit',
        templateUrl: 'modules/activities/client/views/form-activity.client.view.html',
        controller: 'ActivitiesController',
        controllerAs: 'vm',
        resolve: {
          activityResolve: getActivity
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Activity {{ activityResolve.name }}'
        }
      })
      .state('activities.view', {
        url: '/:activityId',
        templateUrl: 'modules/activities/client/views/view-activity.client.view.html',
        controller: 'ActivitiesController',
        controllerAs: 'vm',
        resolve: {
          activityResolve: getActivity
        },
        data:{
          pageTitle: 'Activity {{ articleResolve.name }}'
        }
      });
  }

  getActivity.$inject = ['$stateParams', 'ActivitiesService'];

  function getActivity($stateParams, ActivitiesService) {
    return ActivitiesService.get({
      activityId: $stateParams.activityId
    }).$promise;
  }

  newActivity.$inject = ['ActivitiesService'];

  function newActivity(ActivitiesService) {
    return new ActivitiesService();
  }
})();
