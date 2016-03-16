(function() {
  'use strict';

  angular
    .module('core')
    .controller('LandingController', LandingController);

  LandingController.$inject = ['$scope'];

  function LandingController($scope) {
    var vm = this;

    // Landing controller logic
    // ...

    init();

    function init() {
    }
  }
})();
