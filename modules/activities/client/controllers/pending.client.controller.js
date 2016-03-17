(function() {
  'use strict';

  angular
    .module('activities')
    .controller('PendingController', PendingController);

  PendingController.$inject = ['$scope'];

  function PendingController($scope) {
    var vm = this;

    // Pending controller logic
    // ...

    init();

    function init() {
    }
  }
})();
