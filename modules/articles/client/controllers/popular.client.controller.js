(function() {
  'use strict';

  angular
    .module('articles')
    .controller('PopularController', PopularController);

  PopularController.$inject = ['$scope','Articles','Authentication'];

  function PopularController($scope,Articles,Authentication) {
    var vm = this;

    // Popular controller logic
    // ...

    $scope.articles=Articles.query();
    $scope.user=Authentication.user;

    init();

    function init() {
    }
  }
})();
