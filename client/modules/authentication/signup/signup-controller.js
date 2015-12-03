/**
 * @ngdoc function
 * @name SignupController
 * @module kaiamAuthentication
 * @kind function
 *
 * @description
 *
 * Handles sending of signup info to api and response
 */
angular.module('eigAuthentication')
  .controller('SignupController', ['$scope', '$meteor', '$translate', '$state', '$mdToast', '$filter', '$http',
    function($scope, $meteor, $translate, $state, $mdToast, $filter, $http, API_CONFIG) {
      $scope.user = {
        name: '',
        email: '',
        password: '',
        confirm: ''
      };
      $scope.signupClick = function() {
        $meteor.createUser({
          username: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          profile: {
            roles: []
          }
        }).then(function() {
          $mdToast.show(
            $mdToast.simple()
            .content($translate.instant('SIGNUP.MESSAGES.CONFIRM_SENT') + ' ' + $scope.user.email)
            .position('top center')
            .hideDelay(5000)
          );
          $scope.user = {};
        }, function(err) {
          if (err.message.indexOf('100002') > 0) {
            $mdToast.show(
              $mdToast.simple()
              .content($translate.instant('SIGNUP.MESSAGES.CONFIRM_SENT') + ' ' + $scope.user.email)
              .position('fit')
              .hideDelay(5000)
            );
            $scope.user = {};
          } else {
            $mdToast.show(
              $mdToast.simple()
              .content('Sign up error - ' + err)
              .position('bottom right')
              .hideDelay(3000)
            );
          }
        });
      };
    }
  ]);
