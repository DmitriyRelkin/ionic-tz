'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngSanitize',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/top-twenty');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/tabs.html',
      controller: 'topFilmCtrl',
      controllerAs: 'vm'
    })
    .state('main.top-twenty', {
      url: '/top-twenty',
      views: {
        'tab-top-twenty': {
          templateUrl: 'main/templates/top-twenty.html',
        }
      }
    })

    .state('main.decade-chart', {
      url: '/decade-chart',
      views: {
        'tab-decade-chart': {
          templateUrl: 'main/templates/decade-chart.html',
        }
      }
    })

    .state('main.favorites-films', {
      url: '/favorites-films',
      views: {
        'tab-favorites-films': {
          templateUrl: 'main/templates/favorites-films.html',
        }
      }
    });
});
