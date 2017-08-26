'use strict';
angular
.module('main')
.factory('TopFilms', TopFilms);
TopFilms.$inject = ['$http'];
function TopFilms ($http) {
  return {
    load: function () {
      // return $http.get('http://www.myapifilms.com/imdb/top?token=01bd41ee-b7f0-478a-b448-a625be04413f&format=json&data=1');
      return $http.jsonp('http://www.myapifilms.com/imdb/top?start=1&end=20&token=01bd41ee-b7f0-478a-b448-a625be04413f&format=json&data=1&callback=JSON_CALLBACK');
    }
  };
}
