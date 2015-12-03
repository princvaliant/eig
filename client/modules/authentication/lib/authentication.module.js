/**
 * @ngdoc module
 * @name triangular.authentication
 * @description
 *
 * The `triangular.authentication` module handles all the login and signup pages
 */
angular.module('eigAuthentication', [])
  .config(['$translatePartialLoaderProvider', '$stateProvider',
    function($translatePartialLoaderProvider, $stateProvider) {
      $translatePartialLoaderProvider.addPart('authentication');
      $stateProvider
        .state('authentication', {
          abstract: true,
          templateUrl: 'client/modules/authentication/layouts/authentication.tmpl.ng.html',
        })
        .state('authentication.login', {
          url: '/login',
          templateUrl: 'client/modules/authentication/login/login.tmpl.ng.html',
          controller: 'LoginController'
        })
        .state('authentication.signup', {
          url: '/signup',
          templateUrl: 'client/modules/authentication/signup/signup.tmpl.ng.html',
          controller: 'SignupController'
        })
        .state('authentication.lock', {
          url: '/lock',
          templateUrl: 'client/modules/authentication/lock/lock.tmpl.ng.html',
          controller: 'LockController'
        })
        .state('authentication.forgot', {
          url: '/forgot',
          templateUrl: 'client/modules/authentication/forgot/forgot.tmpl.ng.html',
          controller: 'ForgotController'
        })
        .state('admin-panel.default.profile', {
          url: '/profile',
          templateUrl: 'client/modules/authentication/profile/profile.tmpl.ng.html',
          controller: 'ProfileController'
        });
    }
  ]);
