'use strict';
angular.module('main')
/**
 * @ngdoc directive
 * @name directorLink
 * @restrict A
 * @description
 * This directive creates links to the pages of directors
 **/
.directive('directorLink', directorLink);
function directorLink () {
  return {
    restrict: 'A',
    template: '<div class="wrapper-directors">director:<p ng-repeat="item in directors track by $index"><a ng-href="http://www.imdb.com/name/{{item.id}}/?ref_=tt_ov_dr">{{!$last ? item.name + ", " : item.name}}</a></p></div>',
    scope: {
      directors: '='
    }
  };
}
