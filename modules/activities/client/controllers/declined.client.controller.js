(function() {
  'use strict';

  angular
    .module('activities')
    .controller('DeclinedController', DeclinedController);

  DeclinedController.$inject = ['$scope'];

  function DeclinedController($scope) {
    var vm = this;

    // Declined controller logic
    // ...

    init();

    function init() {
    }
  }
})();
