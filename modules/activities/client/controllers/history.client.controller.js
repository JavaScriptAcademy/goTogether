(function() {
  'use strict';

  angular
    .module('activities')
    .controller('HistoryController', HistoryController);

  HistoryController.$inject = ['$scope'];

  function HistoryController($scope) {
    var vm = this;

    // History controller logic
    // ...

    init();

    function init() {
    }
  }
})();
