'use strict';

describe('module: main, service: TopFilms', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var TopFilms;
  beforeEach(inject(function (_TopFilms_) {
    TopFilms = _TopFilms_;
  }));

  it('should do something', function () {
    expect(!!TopFilms).toBe(true);
  });

});
