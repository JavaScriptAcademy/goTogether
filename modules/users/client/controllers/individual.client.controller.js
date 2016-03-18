(function() {
  'use strict';

  angular
    .module('users')
    .controller('IndividualController', IndividualController);

  IndividualController.$inject = ['$scope'];

  function IndividualController($scope) {
    var vm = this;

    // Individual controller logic
    // ...

    init();

    function init() {
    }
  }
})();
