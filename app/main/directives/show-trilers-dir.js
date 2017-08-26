'use strict';
angular.module('main')
.directive('showTrailers', function () {
  return {
    link: link,
    restrict: 'E',
    template: '',
    scope: {
      trailers: '='
    }
  };
  function link(scope, element, attrs) {
    scope.updateTime
    function updateTime() {
      element.text(dateFilter(new Date(), format));
    }
  }
});
