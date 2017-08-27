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
  vm.dacadeHandler = dacadeHandler;

  $scope.trailers = [];
  vm.loaderTrailers = false;
  vm.filmItem = -1;
  $scope.foundTrailer = true;
  vm.yearsFilms = [];
  vm.countFilms = [];
  vm.countYears = [];
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
      if (vm.dataFilms.length) {
        vm.dacadeHandler(vm.dataFilms);
      }
    }).catch(function (err) {
      $log.error('Error load', err);
    });
  }

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

  vm.options = {
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      }
    }
  };

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

