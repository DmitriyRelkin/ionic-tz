'use strict';
angular.module('main')
/**
 * @ngdoc directive
 * @name listGenres
 * @restrict A
 * @description
 * This directive creates a list of genres of the film
 **/
.directive('listGenres', listGenres);
function listGenres () {
  return {
    restrict: 'A',
    template: '<div class="wrapper-genres">genre:<p ng-repeat="item in genres track by $index">{{!$last ? item + ", " : item }}</p></div>',
    scope: {
      genres: '='
    }
  };
}

