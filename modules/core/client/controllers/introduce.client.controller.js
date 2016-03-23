(function() {
  'use strict';

  angular
    .module('core')
    .controller('IntroduceController', IntroduceController);

  IntroduceController.$inject = ['$scope', 'Authentication'];

  function IntroduceController($scope, Authentication) {
    var vm = this;

    // Introduce controller logic
    // ...
    var user_stage = Authentication.user.stage;

    if(user_stage == 0){

    }else if(user_stage == 1){
      document.getElementById('a2').click();
    }else if(user_stage == 2){
      document.getElementById('a3').click();
    }else{
      document.getElementById('a4').click();
    }
    init();

    function init() {
    }
  }
})();
