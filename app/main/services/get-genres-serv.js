'use strict';
angular
.module('main')
.factory('GetGenres', GetGenres);
GetGenres.$inject = ['$http'];
function GetGenres ($http) {
  return {
    load: function () {
      return $http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=72ed4790944fd909c280416656e8af7b');
    }
  };
}
