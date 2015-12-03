/**
 * @ngdoc function
 * @name SidebarLeftController
 * @module triAngular
 * @kind function
 *
 * @description
 *
 * Handles the left sidebar
 */
angular.module('eigApp').
controller('SidebarLeftController', ['$scope', '$timeout', '$mdSidenav', 'APP',
  function ($scope, $timeout, $mdSidenav, APP) {
    $scope.sidebarInfo = {
      appName: APP.name,
      appLogo: APP.logo
    };
    // add a watch for when the url location changes
    $scope.$on('$locationChangeSuccess', function () {
      // location has changed so close menu
      $timeout(function () {
        $mdSidenav('left').close();
      });
    });
  }
]);
