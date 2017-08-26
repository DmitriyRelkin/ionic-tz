'use strict';

describe('module: main, service: GetGenres', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var GetGenres;
  beforeEach(inject(function (_GetGenres_) {
    GetGenres = _GetGenres_;
  }));

  it('should do something', function () {
    expect(!!GetGenres).toBe(true);
  });

});
