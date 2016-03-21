(function() {
  'use strict';

  angular
    .module('activities')
    .controller('ResponseController', ResponseController);

  ResponseController.$inject = ['$scope'];

  function ResponseController($scope) {
    var vm = this;

    // Response controller logic
    // ...

    init();

    function init() {
    }
  }
})();
