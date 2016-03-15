(function () {
  'use strict';

  angular
    .module('activities')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Activities',
      state: 'activities',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'activities', {
      title: 'List Activities',
      state: 'activities.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'activities', {
      title: 'Create Activity',
      state: 'activities.create',
      roles: ['user']
    });
  }
})();
