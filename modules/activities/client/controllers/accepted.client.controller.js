(function() {
  'use strict';

  angular
  .module('activities')
  .controller('AcceptedController', AcceptedController);

  AcceptedController.$inject = ['$scope'];

  function AcceptedController($scope) {
    var vm = this;
    // Accepted controller logic
    // ...

    init();

    function init() {
    }
  }
})();
