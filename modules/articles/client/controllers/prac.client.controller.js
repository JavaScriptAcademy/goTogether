(function() {
  'use strict';

  angular
    .module('articles')
    .controller('PracController', PracController);

  PracController.$inject = ['$scope','Articles'];

  function PracController($scope,Articles) {
    var vm = this;

    // Prac controller logic
    // ...
    $scope.name = 'Fiona';
    $scope.articles = Articles.query();
    init();

    function init() {
    }
  }
})();
