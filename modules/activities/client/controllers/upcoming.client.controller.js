(function() {
  'use strict';

  angular
    .module('activities')
    .controller('UpcomingController', UpcomingController);

  UpcomingController.$inject = ['$scope'];

  function UpcomingController($scope) {
    var vm = this;

    // Upcoming controller logic
    // ...

    init();

    function init() {
    }
  }
})();
