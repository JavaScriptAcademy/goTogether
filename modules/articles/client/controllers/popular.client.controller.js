(function() {
  'use strict';

  angular
    .module('articles')
    .controller('PopularController', PopularController);

  PopularController.$inject = ['$scope'];

  function PopularController($scope) {
    var vm = this;

    // Popular controller logic
    // ...

    init();

    function init() {
    }
  }
})();
