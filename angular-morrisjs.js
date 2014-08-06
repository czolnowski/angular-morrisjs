(function (ng, Morris, undefined) {
    'use strict';

    var app = ng.module('angular-morrisjs', []),
        parseValues = function (value, possibleValues, skipBoolTransform)
        {
            if (!ng.isDefined(possibleValues)) {
                possibleValues = [];
            }

            if (!ng.isDefined(value)) {
                return undefined;
            }

            if (possibleValues.indexOf(value) !== -1) {
                return value;
            }

            if (skipBoolTransform !== true) {
                if (value === "true") {
                    return true;
                } else if (value === "false") {
                    return false;
                }
            }

            return undefined;
        };

    app.factory(
       'Morris',
        [
            function ()
            {
                return {
                    b: Morris.Bar
                };
            }
        ]
    );

    app.directive(
        'barChart',
        [
            "$parse", "Morris",
            function ($parse, M)
            {
                return {
                    restrict: 'AE',
                    template: '<div></div>',
                    replace: true,
                    link: function($scope, element, attribiutes) {
                        var hoverCallback = $parse(attribiutes.hovercallback)($scope),
                            additional = {
                                gridTextColor: attribiutes.gridTextColor,
                                gridTextSize: attribiutes.gridTextSize,
                                gridTextFamily: attribiutes.gridTextFamily,
                                gridTextWeight: attribiutes.gridTextWeight,
                                resize: parseValues(attribiutes.resize)
                            },
                            params = {
                                element: element,
                                data: $parse(attribiutes.data)($scope),
                                xkey: attribiutes.xkey,
                                ykeys: $parse(attribiutes.ykeys)($scope),
                                labels: $parse(attribiutes.labels)($scope),
                                barColors: $parse(attribiutes.barColors)($scope),
                                stacked: parseValues(attribiutes.stacked),
                                hideHover: parseValues(attribiutes.hidehover, ['always', 'auto']),
                                axes: parseValues(attribiutes.axes),
                                grid: parseValues(attribiutes.grid)
                            };

                        if (ng.isFunction(hoverCallback)) {
                            params['hoverCallback'] = hoverCallback;
                        }

                        ng.forEach(additional, function (value, key) {
                            if (ng.isDefined(value)) {
                                params[key] = value;
                            }
                        });

                        M.b(params);
                    }

                };
            }
        ]
    );
})(window.angular, window.Morris);
