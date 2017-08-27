'use strict';
/**
 * @ngdoc controller
 * @name topFilmCtrl
 * This the homeCtrl controller.
 */
angular
.module('main')
.controller('topFilmCtrl', topFilmCtrl);
topFilmCtrl.$inject = ['$scope', '$log', 'TopFilms', '$ionicModal', 'GetTrailer', '$sce'];
function topFilmCtrl ($scope, $log, TopFilms, $ionicModal, GetTrailer, $sce) {
  /**
  * @ngdoc property
  * @name vm
  * @description
  * vm is an instance of the current controller.
  */
  var vm = this;
  vm.topFilmLoader = topFilmLoader;
  vm.trailersLoader = trailersLoader;

  /**
  * @ngdoc property
  * @name vm.dataFilms
  * @description
  * An array that keeps top films data.
  */
  vm.dataFilms = [];

  function topFilmLoader () {
    TopFilms.load().then(function (response) {
      vm.dataFilms = response.data.data.movies;
    }).catch(function (err) {
      $log.error('Error load', err);
    });
  }

  $ionicModal.fromTemplateUrl('./main/templates/modal-views/trailer-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    vm.taskModal = modal;
  });

  vm.openTrailer = function () {
    vm.taskModal.show();
  };

  $scope.closeTrailer = function () {
    $scope.playVideo = false;
    vm.taskModal.hide();
  };

  $scope.trailers = [];
  vm.loaderTrailers = false;
  vm.filmItem = -1;
  $scope.foundTrailer = true;

  function trailersLoader (id, element) {
    vm.loaderTrailers = true;
    $scope.foundTrailer = true;
    vm.filmItem = element;
    var trailers = [];
    GetTrailer.load(id).then(function (response) {
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

  $scope.playTrailer = function (px, key) {
    $scope.trailerQuality = px;
    $scope.videoKey = key;
    $scope.playVideo = true;
  };

  $scope.getIframeSrc = function (videoKey, trailerQuality) {
    return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoKey + '?vq=' + trailerQuality);
  };
}

