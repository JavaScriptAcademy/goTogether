//Activities service used to communicate Activities REST endpoints
(function () {
  'use strict';

  angular
    .module('activities')
    .factory('ActivitiesService', ActivitiesService);

  ActivitiesService.$inject = ['$resource'];

  function ActivitiesService($resource) {
    return $resource('api/activities/:activityId', {
      activityId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
