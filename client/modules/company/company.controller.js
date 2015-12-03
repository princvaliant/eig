'use strict';
/**
 * @ngdoc function
 * @name IntroductionController
 * @module triAngularDashboards
 * @kind function
 *
 *
 */
angular.module('eigCompany').
controller('CompanyController', ['$scope', '$meteor', '$translate', '$mdToast', '$timeout', 'DDD',
  function($scope, $meteor, $translate, $mdToast, $timeout, DDD) {
    let columnDefs = [{
      field: 'id',
      enableFiltering: false,
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
      enableSorting: true,
      noUnselect: true,
      multiSelect: false,
      enableFiltering: true,
      minRowsToShow: 15,
      enableRowSelection: false,
      columnDefs: columnDefs,
      data: DDD,
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        //  $scope.gridApi.selection.on.rowSelectionChanged($scope, selectionChanged);
      }
    };
  }
]).filter('rolesFilter', function() {
  return function(value) {
    return value.join(', ');
  };
});
