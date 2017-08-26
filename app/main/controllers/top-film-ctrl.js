'use strict';
/**
 * @ngdoc controller
 * @name topFilmCtrl
 * This the homeCtrl controller.
 */
angular
.module('main')
.controller('topFilmCtrl', topFilmCtrl);
topFilmCtrl.$inject = ['$log', 'TopFilms'];
function topFilmCtrl ($log, TopFilms) {
  /**
  * @ngdoc property
  * @name vm
  * @description
  * vm is an instance of the current controller.
  */
  var vm = this;
  vm.topFilmLoader = topFilmLoader;

  /**
  * @ngdoc property
  * @name vm.dataFilms
  * @description
  * An array that keeps top films data.
  */
  vm.dataFilms = [];

  function topFilmLoader () {
    TopFilms.load().then(function (response) {
      console.log(response.data.data.movies);
      vm.dataFilms = response.data.data.movies;
    }).catch(function (err) {
      $log.error('Error load', err);
    });
  }
}

