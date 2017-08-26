'use strict';
angular.module('main')
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

