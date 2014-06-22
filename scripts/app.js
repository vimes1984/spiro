
'use strict';
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 600);
          };
})();
window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout;
  })();

angular
  .module('spiroApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/spiro_one', {
        templateUrl: 'views/spiro_one.html',
        controller: 'SpiroOneCtrl'
      })
      .when('/spiro_two', {
        templateUrl: 'views/spiro_two.html',
        controller: 'SpiroTwoCtrl'
      })
      .when('/spiro_three', {
        templateUrl: 'views/spiro_three.html',
        controller: 'SpiroThreeCtrl'
      })
      .when('/spiro_four', {
        templateUrl: 'views/spiro_four.html',
        controller: 'SpiroFourCtrl'
      })
      .when('/spiro_five', {
        templateUrl: 'views/spiro_five.html',
        controller: 'SpiroFiveCtrl'
      })
      .when('/spiro_five', {
        templateUrl: 'views/spiro_five.html',
        controller: 'SpiroFiveCtrl'
      })
      .when('/spiro_six', {
        templateUrl: 'views/spiro_six.html',
        controller: 'SpiroSixCtrl'
      })
      .when('/spiro_seven', {
        templateUrl: 'views/spiro_seven.html',
        controller: 'SpiroSevenCtrl'
      })
      .when('/spiro_eight', {
        templateUrl: 'views/spiro_eight.html',
        controller: 'SpiroEightCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
