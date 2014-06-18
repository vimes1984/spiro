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
        clearTimeout
} )();
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
      .otherwise({
        redirectTo: '/'
      });
  });
