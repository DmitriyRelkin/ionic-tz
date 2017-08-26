'use strict';
angular
.module('main')
.factory('GetTrailer', GetTrailer);
GetTrailer.$inject = ['$http'];
function GetTrailer ($http) {
  return {
    load: function (idImdb) {
      return $http.jsonp('http://www.myapifilms.com/tmdb/movieInfoImdb?idIMDB=' + idImdb + '&token=01bd41ee-b7f0-478a-b448-a625be04413f&format=json&videos=1&callback=JSON_CALLBACK');
    }
  };
}
