'use strict';
angular.module('main')
.directive('preloader', function () {
  return {
    template: '<div class="films-loading" ng-if="condition"><img src="./main/assets/images/loader1.gif" alt=""></div>',
    restrict: 'E',
    scope: {
      condition: '='
    }
  };
});
