'use strict';

angular.module('eigDashboard').
controller('FormController', ['$timeout', '$translate', '$rootScope', '$scope',
  '$meteor', '$mdToast', '$window', '$mdDialog', 'entity',
  function($timeout, $translate, $rootScope, $scope,
    $meteor, $mdToast, $window, $mdDialog, entity) {
    $scope.entity = _.clone(entity);

console.log(entity);
    $scope.submit = function() {
      $meteor.call('updateUser', $scope.entity, $scope.selected).then(
        function() {
          showError($translate.instant('SETTINGS.USER_UPDATED'));
          $mdDialog.cancel();
        },
        function(err) {
          showError(err);
        });
    };

    $scope.closeClick = function() {
      $mdDialog.cancel();
    };

    function showError(err) {
      $mdToast.show(
        $mdToast.simple()
        .content(err)
        .position('bottom right')
        .hideDelay(3000));
    }
  }
]);
