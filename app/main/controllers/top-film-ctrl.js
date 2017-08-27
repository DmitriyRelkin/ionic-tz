'use strict';
/**
 * @ngdoc controller
 * @name topFilmCtrl
 * This the homeCtrl controller.
 */
angular
.module('main')
.controller('topFilmCtrl', topFilmCtrl);
topFilmCtrl.$inject = ['$scope', '$log', 'movieService', '$ionicModal', '$sce'];
function topFilmCtrl ($scope, $log, movieService, $ionicModal, $sce) {
  /**
  * @ngdoc property
  * @name vm
  * @description
  * vm is an instance of the current controller.
  */
  var vm = this;

  vm.topFilmLoader = topFilmLoader;
  vm.trailersLoader = trailersLoader;
  vm.dacadeHandler = dacadeHandler;
  vm.favoritesHandler = favoritesHandler;
  vm.deleteFromFavorites = deleteFromFavorites;
  vm.saveFavoritesFilms = saveFavoritesFilms;
  vm.loaderFavoritesFilms = loaderFavoritesFilms;
  vm.favoritesFilmsStorageKey = 'favoritesFilms';

  /**
   * @ngdoc property
   * @name $scope.trailers
   * @description
   * This array keeps an objects which store trailer information
   **/
  $scope.trailers = [];

  /**
   * @ngdoc property
   * @name vm.loaderTrailers
   * @description
   * Flag which tells that trailer is loaded
   **/
  vm.loaderTrailers = false;

  /**
   * @ngdoc property
   * @name vm.filmItem
   * @description
   * Number of the selected movie item to show trailer
   **/
  vm.filmItem = -1;

  /**
   * @ngdoc property
   * @name $scope.foundTrailer
   * @description
   * Flag which tells that trailer is found
   **/
  $scope.foundTrailer = true;

  /**
   * @ngdoc property
   * @name vm.yearsFilms
   * @description
   * An array keeps years films
   **/
  vm.yearsFilms = [];

  /**
   * @ngdoc property
   * @name vm.countFilms
   * @description
   * An array of the number of films by year
   **/
  vm.countFilms = [];


  /**
   * @ngdoc property
   * @name vm.countFilms
   * @description
   * An array keeps number films decade for donut chat
   **/
  vm.countYears = [];

  /**
   * @ngdoc property
   * @name vm.favoritesFilms
   * @description
   * An array that keeps favorites films data.
   */
  vm.favoritesFilms = [];

  /**
   * @ngdoc property
   * @name vm.options
   * @description
   * This is the settings object for donut chart
   */
  vm.options = {
    legend: {
      display: true,
      labels: {
        fontColor: '#4d5360'
      }
    }
  };

  /**
  * @ngdoc property
  * @name vm.dataFilms
  * @description
  * An array that keeps top films data.
  */
  vm.dataFilms = [];

  /**
   * @ngdoc function
   * @name topFilmLoader
   * @description
   * This function downloads top films
   */
  function topFilmLoader () {
    movieService.getTopMovies().then(function (response) {
      vm.dataFilms = response.data.data.movies;
      if (vm.dataFilms.length) {
        vm.dacadeHandler(vm.dataFilms);
      }
      vm.loaderFavoritesFilms();
    }).catch(function (err) {
      $log.error('Error load', err);
    });
  }

  /**
  * @ngdoc function
  * @name dacadeHandler
  * @description
  * This function count movies per decade.
  * @param {Array} dataFilms.
  */
  function dacadeHandler (dataFilms) {
    if (!vm.yearsFilms.length) {
      var arrYears = [];
      var result;
      var obj = {};

      dataFilms.forEach(function (item) {
        vm.yearsFilms.push(parseInt(item.year));
      });

      vm.yearsFilms.forEach(function (item) {
        result = item - (item % 10);
        arrYears.push(result);
      });
      for (var i = 0, j = arrYears.length; i < j; i++) {
        if (obj[arrYears[i]]) {
          obj[arrYears[i]]++;
        }
        else {
          obj[arrYears[i]] = 1;
        }
      }

      if (!vm.countFilms.length && !vm.countYears.length) {
        for (var key in obj) {
          vm.countFilms.push(obj[key]);
          vm.countYears.push(key);
        }
      }
    }
  }

  $ionicModal.fromTemplateUrl('./main/templates/modal-views/trailer-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    vm.taskModal = modal;
  });

  /**
  * @ngdoc function
  * @name openTrailer
  * @description
  * This function opens modal to view trailer.
  */
  vm.openTrailer = function () {
    vm.taskModal.show();
  };

  /**
  * @ngdoc function
  * @name closeTrailer
  * @description
  * This function close trailer modal view.
  */
  $scope.closeTrailer = function () {
    $scope.playVideo = false;
    vm.taskModal.hide();
  };

  /**
  * @ngdoc function
  * @name trailersLoader
  * @description
  * This function loads trailers
  * @param {String} id - trailer id
  * @param {Number} element - index of clicked item.
  */
  function trailersLoader (id, element) {
    vm.loaderTrailers = true;
    $scope.foundTrailer = true;
    vm.filmItem = element;
    var trailers = [];
    movieService.getMovieTrailer(id).then(function (response) {
      vm.filmItem = -1;
      vm.loaderTrailers = false;
      response.data.data.videos.forEach(function (item) {
        if (item.type !== 'Trailer') {return;}
        trailers.push(item);
      });
      $scope.trailers = trailers;
      if (!$scope.trailers.length) {
        $scope.foundTrailer = false;
      }
      vm.openTrailer();
    }).catch(function (err) {
      $log.error('Error load', err);
    });
  }

  /**
   * @ngdoc function
   * @name playTrailer
   * @description
   * This function plays trailer
   * @param {Number} px - quality movie trailer
   * @param {String} key - id movie trailer
   */
  $scope.playTrailer = function (px, key) {
    $scope.trailerQuality = px;
    $scope.videoKey = key;
    $scope.playVideo = true;
  };

  /**
   * @ngdoc function
   * @name getIframeSrc
   * @description
   * This function generates trailer url
   * @param {String} videoKey - id movie trailer
   * @param {Number} trailerQuality - quality movie trailer
   *
   * @return {String} trailer url
   */
  $scope.getIframeSrc = function (videoKey, trailerQuality) {
    return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoKey + '?vq=' + trailerQuality);
  };

  /**
   * @ngdoc function
   * @name favoritesHandler
   * @description
   * This function adds movie to favorites
   * @param {Number} id - id of the selected movie item
   */
  function favoritesHandler (id) {
    vm.dataFilms[id].favorite = true;
    vm.dataFilms[id].topId = id;
    vm.favoritesFilms.push(vm.dataFilms[id]);
    vm.saveFavoritesFilms();
  }

  /**
   * @ngdoc function
   * @name saveFavoritesFilms
   * @description
   * This function saves selected video items to the storage
   */
  function saveFavoritesFilms () {
    window.localStorage.setItem(vm.favoritesFilmsStorageKey, JSON.stringify(vm.favoritesFilms));
  }

  /**
   * @ngdoc function
   * @name deleteFromFavorites
   * @description
   * This function removes selected video item from the storage
   * @param {Number} id - film index which been selected
   */
  function deleteFromFavorites (id) {
    delete vm.dataFilms[vm.favoritesFilms[id].topId].favorite;
    delete vm.dataFilms[vm.favoritesFilms[id].topId].topId;
    vm.favoritesFilms.splice(id, 1);
    vm.saveFavoritesFilms();
  }

  /**
   * @ngdoc function
   * @name loaderFavoritesFilms
   * @description
   * This function get favorites films from locale storage and put them in to the array
   */
  function loaderFavoritesFilms () {
    if (window.localStorage.getItem(vm.favoritesFilmsStorageKey)) {
      vm.favoritesFilms = JSON.parse(window.localStorage.getItem(vm.favoritesFilmsStorageKey));
    } else {
      vm.favoritesFilms = [];
    }
    vm.favoritesFilms.forEach(function (film) {
      vm.dataFilms[film.topId].favorite = true;
      vm.dataFilms[film.topId].topId = film.topIds;
    });
  }
}

