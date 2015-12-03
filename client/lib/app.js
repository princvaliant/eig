'use strict';
/**
 *  App Module
 *  @type {angular.module}
 */
angular.module('eigApp', [
  /* Angular packages */
  'ngAnimate',
  'ngSanitize',
  'ngTouch',
  'ngCookies',
  'ngAria',
  'ngMessages',
  'ngMaterial',
  'ngMdIcons',
  'AngularPrint',
  /* third party */
  'angular-meteor',
  'angularMoment',

  'ui.grid',
  'ui.grid.edit',
  'ui.grid.autoResize',
  'ui.grid.saveState',
  'ui.grid.resizeColumns',
  'ui.grid.moveColumns',
  'ui.grid.selection',

  'ui.router',
  'angularFileUpload',
  'pascalprecht.translate',
  'infinite-scroll',
  'LocalStorageModule',
  /* kaiam modules */
  'eigAuthentication',
  'eigDashboard',
  'eigCompany'
]).constant('APP', {
  name: '8x8 App',
  logo: '/assets/images/logo.png',
  version: '1.4.0',
  languages: [{
    name: 'LANGUAGES.ENGLISH',
    key: 'en'
  }, {
    name: 'LANGUAGES.FRENCH',
    key: 'fr'
  }],
  defaultSkin: 'red-dwarf'
});

/**
 * Bootstrap App (ng-app)
 */
function bootstrap() {
  angular.bootstrap(document, ['eigApp']);
}

/**
 * Deliver Mobile Version
 */
if (Meteor.isCordova) {
  angular.element(document).on('deviceReady', bootstrap);
} else {
  angular.element(document).ready(bootstrap);
}
