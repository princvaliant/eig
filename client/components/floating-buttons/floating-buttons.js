  angular.module('eigApp').directive('mfbMenu', [function() {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        position: '@',
        effect: '@',
        label: '@',
        resting: '@restingIcon',
        active: '@activeIcon'
      },
      template: '<ul class="mfb-component--{{position}} mfb-{{effect}}">' +
        ' <li class="mfb-component__wrap">' +
        '  <a href="" data-mfb-label="{{label}}" class="mfb-component__button--main">' +
        '   <i class="mfb-component__main-icon--resting {{resting}}"></i>' +
        '   <i class="mfb-component__main-icon--active {{active}}"></i>' +
        '  </a>' +
        '  <ul class="mfb-component__list" ng-transclude>' +
        '  </ul>' +
        ' </li>' +
        '</ul>'
    };
  }]);


  angular.module('eigApp').directive('mfbButton', [function() {
    return {
      require: '^mfbMenu',
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        icon: '@',
        label: '@'
      },
      template: '<li>' +
        ' <a href="" data-mfb-label="{{label}}" class="mfb-component__button--child">' +
        '   <i class="mfb-component__child-icon {{icon}}"' +
        '   </i>' +
        ' </a>' +
        '</li>'
    };
  }]);
