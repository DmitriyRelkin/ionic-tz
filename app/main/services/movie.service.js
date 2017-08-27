'use strict';
angular
.module('main')
/**
 * @ngdoc service
 * @name movieService
 * @description
 * This service for downloading the list of top films,
 * and also for loading trailers to movies
 **/
.factory('movieService', movieService);
movieService.$inject = ['$http'];
function movieService ($http) {
  return {
    getTopMovies: function () {
      return $http.jsonp('http://www.myapifilms.com/imdb/top?start=1&end=20&token=01bd41ee-b7f0-478a-b448-a625be04413f&format=json&data=1&callback=JSON_CALLBACK');
    },
    getMovieTrailer: function (idImdb) {
      return $http.jsonp('http://www.myapifilms.com/tmdb/movieInfoImdb?idIMDB=' + idImdb + '&token=01bd41ee-b7f0-478a-b448-a625be04413f&format=json&videos=1&callback=JSON_CALLBACK');
    }
  };
}
