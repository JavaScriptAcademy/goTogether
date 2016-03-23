'use strict';

angular.module('core').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Help',
      state: 'introduce',
      roles: ['user']
    });
  }
]);
