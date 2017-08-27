'use strict';
angular.module('main')
/**
 * @ngdoc directive
 * @name listGenres
 * @restrict E
 * @description
 * This directive implements animation for downloading content
 **/
.directive('preloader', function () {
  return {
    template: '<div class="preloader-wrapper" ng-if="condition"><img src="./main/assets/images/loader1.gif" alt=""></div>',
    restrict: 'E',
    scope: {
      condition: '='
    }
  };
});
