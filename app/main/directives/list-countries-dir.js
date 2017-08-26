'use strict';
angular.module('main')
  .directive('listCountries', listCountries);
function listCountries () {
  return {
    restrict: 'A',
    template: '<div class="wraper-countries">countries:<p ng-repeat="item in countries track by $index">{{!$last ? item + ", " : item}}</p></div>',
    scope: {
      countries: '='
    }
  };
}
