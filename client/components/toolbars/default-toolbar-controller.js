'use strict';
/**
 * @ngdoc function
 * @name EmailToolbarController
 * @module triAngularEmail
 * @kind function
 *
 * @description
 *
 * Handles all actions for email toolbar
 */

angular.module('eigApp')
  .controller('DefaultToolbarController', ['$scope', '$meteor', '$translate', '$state', '$element', '$mdUtil', '$mdSidenav', '$timeout', 'SideMenu', 'APP',
    function($scope, $meteor, $translate, $state, $element, $mdUtil, $mdSidenav, $timeout, SideMenu, APP) {

      $scope.menu = SideMenu.getMenu();

      $scope.toolbarTypeClass = function() {
        return $scope.extraClass;
      };

      $scope.$on('$stateChangeStart', initToolbar);

      function initToolbar() {
        $element.css('background-image', '');

        if ($state.current.data !== undefined) {
          if ($state.current.data.toolbar !== undefined) {
            if ($state.current.data.toolbar.extraClass !== false) {
              $scope.extraClass = $state.current.data.toolbar.extraClass;
            }

            if ($state.current.data.toolbar.background) {
              $element.css('background-image', 'url(' + $state.current.data.toolbar.background + ')');
            }
          }
        }
      }

      initToolbar();

      $scope.switchLanguage = function(languageCode) {
        $translate.use(languageCode).then(function() {});
      };

      $scope.openSideNav = function(navID) {
        $mdUtil.debounce(function() {
          $mdSidenav(navID).toggle();
        }, 300)();
      };

      $scope.toggleNotificationsTab = function(tab) {
        $scope.$parent.$broadcast('triSwitchNotificationTab', tab);
        $scope.openSideNav('notifications');
      };

      $scope.profile = function() {
        $state.go('admin-panel.default.profile');
      };

      $scope.logout = function() {
        $meteor.logout();
        $state.go('authentication.login');
      };

      $scope.openUsers = function() {
        $state.go('admin-panel.default.settings-users');
      };

      $scope.isAdmin = function() {
        let user = Meteor.users.findOne(Meteor.userId());
        if (_.intersection(user.profile.roles, ['ADMIN']).length > 0) {
          return true;
        }
        return false;
      };

      $scope.$on('newMailNotification', function() {
        $scope.emailNew = true;
      });

      // until we can get languages from angular-translate use APP constant
      $scope.languages = APP.languages;
    }
  ]);
