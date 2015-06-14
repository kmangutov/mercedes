'use strict';
$(document).foundation();


/**
 * @ngdoc overview
 * @name mercedesApp
 * @description
 * # mercedesApp
 *
 * Main module of the application.
 */
angular
  .module('mercedesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/uber', {
        templateUrl: 'views/uber.html',
        controller: 'UberCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
