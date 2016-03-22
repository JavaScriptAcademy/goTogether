(function() {
  'use strict';

  angular
    .module('core')
    .controller('IntroduceController', IntroduceController);

  IntroduceController.$inject = ['$scope'];

  function IntroduceController($scope) {
    var vm = this;

    // Introduce controller logic
    // ...

    init();

    function init() {
    }
  }
})();
