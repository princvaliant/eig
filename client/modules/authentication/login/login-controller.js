/**
 * @ngdoc function
 * @name LoginCtrl
 * @module triAngularAuthentication
 * @kind function
 *
 * @description
 *
 * Handles login form submission and response
 */
angular.module('eigAuthentication')
  .controller('LoginController', ['$rootScope', '$scope', '$state', '$meteor', '$mdToast',
    function($rootScope, $scope, $state, $meteor, $mdToast) {
      // create blank user variable for login form
      $scope.user = {
        email: '',
        password: ''
      };
      // controller to handle login check
      $scope.loginClick = function() {
        $meteor.loginWithPassword($scope.user.email, $scope.user.password).then(function() {
          $rootScope.$broadcast('event:loginConfirmed');
          $state.go('admin-panel.default.dashboard');
        }, function(err) {
          $mdToast.show(
            $mdToast.simple()
            .content('Login - ' + err)
            .position('bottom right')
            .hideDelay(3000)
          );
        });
      };
    }
  ]);
