/**
* @ngdoc directive
* @name paletteBackground
* @restrict A
* @scope
*
* @description
*
* Adds a palette colour and contrast CSS to an element
*
* @usage
* ```html
* <div palette-background="green:500">Coloured content</div>
* ```
*/
angular.module('eigApp')
.directive('paletteBackground', ['kaiTheming', function (kaiTheming) {
    return {
        restrict: 'A',
        link: function ($scope, $element, attrs) {
            var splitColor = attrs.paletteBackground.split(':');
            var color = kaiTheming.getPaletteColor(splitColor[0], splitColor[1]);

            if(color !== undefined) {
                $element.css({
                    'background-color': kaiTheming.rgba(color.value),
                    'border-color': kaiTheming.rgba(color.value),
                    'color': kaiTheming.rgba(color.contrast)
                });
            }
        }
    };
}]);
