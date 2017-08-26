'use strict';
angular.module('main')
.directive('showTrailers', function () {
  return {
    restrict: 'E',
    template: '<div class="wrapper-buttons-trailer"><p ng-repeat-start="trailer in trailers">{{trailer.name}}:</p><button ng-repeat-end class="button button-small button-assertive" ng-click="playTrailer(trailer.size, trailer.key)"> {{trailer.size+"p"}}</button></div>',
    scope: {
      trailers: '=',
      playTrailer: '&'
    }
  };
});
