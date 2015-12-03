'use strict';
/**
 * Routes
 * @type {angular.module}
 */
angular.module('eigApp').config(
    ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$translateProvider', '$mdThemingProvider',
      '$translatePartialLoaderProvider', 'localStorageServiceProvider', '$compileProvider', 'APP',
      function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider, $mdThemingProvider,
        $translatePartialLoaderProvider, localStorageServiceProvider, $compileProvider, APP) {
        $translateProvider.useLoader('$translatePartialLoader', {
          urlTemplate: '/i18n/{part}/{lang}.json'
        });

        // make sure all values used in translate are sanitized for security
        $translateProvider.useSanitizeValueStrategy('sanitize');

        // cache translation files to save load on server
        $translateProvider.useLoaderCache(false);

        // get languages set in APP constant
        let languageKeys = [];
        for (let lang in APP.languages) {
          if ({}.hasOwnProperty.call(APP.languages, lang)) {
            languageKeys.push(APP.languages[lang].lang);
          }
        }

        $translateProvider
          .registerAvailableLanguageKeys(languageKeys, {
            'en_US': 'en',
            'en_UK': 'en'
          })
          .use('en');

        $translateProvider.preferredLanguage('en');

        // store the users language preference in a cookie
        $translateProvider.useLocalStorage();

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });

        // setup public states & routes
        $stateProvider
          .state('admin-panel', {
            abstract: true,
            templateUrl: 'client/layouts/admin-panel/admin-panel.tmpl.ng.html',
            data: {
              toolbar: {
                extraClass: '',
                background: false,
                shrink: true
              },
            },
            resolve: {
              'currentUser': ['$meteor',
                function($meteor) {
                  return $meteor.requireUser();
                }
              ]
            }
          })

        .state('admin-panel.default', {
          abstract: true,
          views: {
            sidebarLeft: {
              templateUrl: 'client/components/sidebar-left/sidebar-left.tmpl.ng.html',
              controller: 'SidebarLeftController'
            },
            sidebarRight: {
              templateUrl: 'client/components/sidebar-right/sidebar-right.tmpl.ng.html',
              controller: 'SidebarRightController'
            },
            toolbar: {
              templateUrl: 'client/components/toolbars/default.tmpl.ng.html',
              controller: 'DefaultToolbarController'
            },
            content: {
              template: '<div id="admin-panel-content-view" flex ui-view></div>'
            }
          },
        })

        .state('404', {
          url: '/404',
          templateUrl: 'client/404.tmpl.ng.html',
          controller: ['$scope', '$state', 'APP',
            function($scope, $state, APP) {
              $scope.app = APP;
              $scope.goHome = function() {
                $state.go('admin-panel.default.dashboard');
              };
            }
          ]
        })

        .state('500', {
          url: '/500',
          templateUrl: 'client/500.tmpl.ng.html',
          controller: ['$scope', '$state', 'APP',
            function($scope, $state, APP) {
              $scope.app = APP;
              $scope.goHome = function() {
                $state.go('admin-panel.default.dashboard');
              };
            }
          ]
        });

        // set default routes when no path specified
        $urlRouterProvider.when('/', '/dashboard');

        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/404');

        // set prefix for local storage
        localStorageServiceProvider
          .setPrefix('eigApp')
          .setStorageType('sessionStorage');
      }
    ])
  .config(['$mdThemingProvider', 'kaiThemingProvider', 'kaiSkinsProvider', 'APP',
    function($mdThemingProvider, kaiThemingProvider, kaiSkinsProvider, APP) {
      /**
       *  PALETTES
       */
      $mdThemingProvider.definePalette('white', {
        '50': 'ffffff',
        '100': 'ffffff',
        '200': 'ffffff',
        '300': 'ffffff',
        '400': 'ffffff',
        '500': 'ffffff',
        '600': 'ffffff',
        '700': 'ffffff',
        '800': 'ffffff',
        '900': 'ffffff',
        'A100': 'ffffff',
        'A200': 'ffffff',
        'A400': 'ffffff',
        'A700': 'ffffff',
        'contrastDefaultColor': 'dark', // whether, by default, text (contrast)
      });

      $mdThemingProvider.definePalette('black', {
        '50': 'e1e1e1',
        '100': 'b6b6b6',
        '200': '8c8c8c',
        '300': '646464',
        '400': '4d4d4d',
        '500': '3a3a3a',
        '600': '2f2f2f',
        '700': '232323',
        '800': '1a1a1a',
        '900': '121212',
        'A100': 'ffffff',
        'A200': 'ffffff',
        'A400': 'ffffff',
        'A700': 'ffffff',
        'contrastDefaultColor': 'light', // whether, by default, text (contrast)
      });

      /**
       *  SKINS
       */

      let darkRed = $mdThemingProvider.extendPalette('red', { '500': '9d0a36' });
      $mdThemingProvider.definePalette('darkRed', darkRed);

      // RED DWARF SKIN
      kaiThemingProvider.theme('red')
        .primaryPalette('darkRed')
        .accentPalette('amber')
        .warnPalette('purple');

      kaiThemingProvider.theme('white-red')
        .primaryPalette('white')
        .accentPalette('darkRed', {
          'default': '500'
        })
        .warnPalette('purple');

      kaiSkinsProvider.skin('red-dwarf', 'Red Dwarf')
        .sidebarTheme('red')
        .toolbarTheme('white-red')
        .logoTheme('red')
        .contentTheme('red');

      /**
       *  FOR DEMO PURPOSES ALLOW SKIN TO BE SAVED IN A COOKIE
       *  This overrides any skin set in a call to triSkinsProvider.setSkin if there is a cookie
       *  REMOVE LINE BELOW FOR PRODUCTION SITE
       */
      kaiSkinsProvider.useSkinCookie(true);

      /**
       *  SET DEFAULT SKIN
       */
      kaiSkinsProvider.setSkin(APP.defaultSkin);
    }
  ])
  .run(['$rootScope', '$window', '$state',
    function($rootScope, $window, $state) {
      // add a class to the body if we are on windows
      if ($window.navigator.platform.indexOf('Win') !== -1) {
        $rootScope.bodyClasses = ['os-windows'];
      }

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $meteor.requireUser() promise is rejected
        // and redirect the user back to the login page
        if (error === 'AUTH_REQUIRED') {
          // It is better to use $state instead of $location. See Issue #283.
          $state.go('authentication.login');
        }
      });
    }
  ]);
