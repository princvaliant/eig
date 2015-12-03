'use strict';
/**
 * @ngdoc function
 * @name IntroductionController
 * @module triAngularDashboards
 * @kind function
 *
 *
 */
angular.module('eigDashboard').
controller('DashboardController', ['$scope', '$meteor', '$translate', '$mdToast', '$timeout', '$mdDialog', 'DDD',
  function($scope, $meteor, $translate, $mdToast, $timeout, $mdDialog, DDD) {

    $scope.footer = 'Last submitted to 8x8 12 days ago';

    let columnDefs = [{
      field: 'id',
      enableFiltering: false,
      cellTemplate: 'client/modules/dashboard/edit-button.ng.html',
      width: 34
    }, {
      headerName: 'First name',
      field: 'first_name',
      width: 150
    }, {
      headerName: 'last name',
      field: 'last_name',
      width: 150
    }, {
      headerName: 'email',
      field: 'email',
      width: 150
    }, {
      headerName: 'country',
      field: 'country',
      width: 150
    }, {
      headerName: 'IP address',
      field: 'ip_address',
      width: 150
    }, {
      headerName: 'last name',
      field: 'last_name',
      width: 150
    }];
    $scope.gridOptions = {
      showGridFooter: true,
      enableSorting: true,
      noUnselect: true,
      multiSelect: false,
      enableFiltering: true,
      minRowsToShow: 15,
      enableRowSelection: false,
      columnDefs: columnDefs,
      gridFooterTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.footer}}</div>',
      data: DDD,
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        //   $scope.gridApi.selection.on.rowSelectionChanged($scope, selectionChanged);
      }
    };

    $scope.fabClicked = function(btn) {
      console.log(btn);
    }

    $scope.editRow = function(grid, row) {
      $scope.footer = 'lslslslsl';
      $mdDialog.show({
        controller: 'FormController',
        templateUrl: 'client/modules/dashboard/form.tmpl.ng.html',
        clickOutsideToClose: true,
        locals: {
          entity: row.entity
        }
      });
    };

    $scope.positions = ['br'];
    $scope.buttons = [{
      label: 'Add new record',
      icon: 'zmdi zmdi-plus-square',
      click: 'add'
    }, {
      label: 'Company site settings',
      icon: 'zmdi zmdi-settings',
      click: 'setting'
    }, {
      label: 'Submit changes to 8x8',
      icon: 'zmdi zmdi-mail-send',
      click: 'submit'
    }];

    $scope.chosenEffect = 'slidein'; //'zoomin'
  }
]).filter('rolesFilter', function() {
  return function(value) {
    return value.join(', ');
  };
});
