(function () {
  'use strict';

  angular
    .module('activities')
    .controller('ActivitiesListController', ActivitiesListController);

  ActivitiesListController.$inject = ['ActivitiesService','Authentication'];

  function ActivitiesListController(ActivitiesService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;


    vm.activities = ActivitiesService.query();
  }
})();
