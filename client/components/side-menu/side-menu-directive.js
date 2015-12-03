/**
 * @ngdoc directive
 * @name sideMenu
 * @restrict E
 * @scope
 *
 * @description
 *
 * Handles the main admin sidemenu
 *
 * @usage
 * ```html
 * <side-menu></side-menu>
 * ```
 */
angular.module('eigApp')
  .directive('sideMenu', ['$location', '$mdTheming', 'kaiTheming', 'SideMenu',
    function ($location, $mdTheming, kaiTheming, SideMenu) {
      return {
        restrict: 'E',
        template: '<md-content layout="column" flex><side-menu-item ng-repeat="item in menu | orderBy:\'priority\'" item="item"></side-menu-item></md-content>',
        scope: {},
        controller: ['$scope', function($scope) {
          // get the menu structure from the menu service
          $scope.menu = SideMenu.getMenu();
        }],
        link: function ($scope, $element, attrs) {
          $mdTheming($element);
          var $mdTheme = $element.controller('mdTheme');
          if (undefined !== $mdTheme) {
            attrs.$observe('mdTheme', function () {
              var menuColor = kaiTheming.getThemeHue($mdTheme.$mdTheme, 'primary', 'default');
              if (menuColor) {
                var menuColorRGBA = kaiTheming.rgba(menuColor.value);
                $element.css({
                  'background-color': menuColorRGBA
                });
                $element.children('md-content').css({
                  'background-color': menuColorRGBA
                });
              }
            });
          }
        }
      };
    }
  ]);
