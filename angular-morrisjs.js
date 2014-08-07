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
                    b: Morris.Bar,
                    l: Morris.Line
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
                        var additional = {
                                gridTextColor: attribiutes.gridTextColor,
                                gridTextSize: attribiutes.gridTextSize,
                                gridTextFamily: attribiutes.gridTextFamily,
                                gridTextWeight: attribiutes.gridTextWeight,
                                resize: parseValues(attribiutes.resize)
                            },
                            asFunctions = {
                                hoverCallback: $parse(attribiutes.hoverCallback)($scope)
                            },
                            params = {
                                element: element,
                                data: $parse(attribiutes.data)($scope),
                                xkey: attribiutes.xkey,
                                ykeys: $parse(attribiutes.ykeys)($scope),
                                labels: $parse(attribiutes.labels)($scope),
                                barColors: $parse(attribiutes.barColors)($scope),
                                stacked: parseValues(attribiutes.stacked),
                                hideHover: parseValues(attribiutes.hideHover, ['always', 'auto']),
                                axes: parseValues(attribiutes.axes),
                                grid: parseValues(attribiutes.grid)
                            };

                        ng.forEach(asFunctions, function (value, key) {
                            if (ng.isFunction(value)) {
                                params[key] = value;
                            }
                        });

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

    app.directive(
        'lineChart',
        [
            "$parse", "Morris",
            function ($parse, M)
            {
                return {
                    restrict: 'AE',
                    template: '<div></div>',
                    replace: true,
                    link: function($scope, element, attribiutes) {
                        var additional = {
                                lineWidth: attribiutes.lineWidth,

                                gridTextColor: attribiutes.gridTextColor,
                                gridTextSize: attribiutes.gridtextsize,
                                gridTextFamily: attribiutes.gridTextFamily,
                                gridTextWeight: attribiutes.gridTextWeight,
                                fillOpacity: attribiutes.fillOpacity,
                                resize: parseValues(attribiutes.resize),

                                goalStrokeWidth: attribiutes.goalStrokeWidth,
                                goalLineColors: attribiutes.goalLineColors,

                                eventStrokeWidth: attribiutes.eventStrokeWidth,
                                eventLineColors: attribiutes.eventLineColors,

                                continuousLine: parseValues(attribiutes.continuousLine)
                            },
                            asFunctions = {
                                hoverCallback: $parse(attribiutes.hoverCallback)($scope),
                                dateFormat: $parse(attribiutes.dateFormat)($scope),
                                xLabelFormat: $parse(attribiutes.xLabelFormat)($scope)
                            },
                            params = {
                                element: element,
                                data: $parse(attribiutes.data)($scope),
                                xkey: attribiutes.xkey,
                                ykeys: $parse(attribiutes.ykeys)($scope),
                                labels: $parse(attribiutes.labels)($scope),

                                lineColors: $parse(attribiutes.lineColors)($scope),
                                lineWidth: attribiutes.lineWidth,
                                pointSize: attribiutes.pointSize,
                                pointFillColors: $parse(attribiutes.pointFillColors)($scope),
                                pointStrokeColors: attribiutes.pointStrokeColors,
                                ymax: attribiutes.ymax,
                                ymin: attribiutes.ymin,
                                smooth: parseValues(attribiutes.smooth),
                                hideHover: parseValues(attribiutes.hidehover, ['always', 'auto']),
                                parseTime: parseValues(attribiutes.parseTime),
                                postUnits: attribiutes.postUnits,
                                preUnits: attribiutes.preUnits,
                                xLabels: attribiutes.xLabels,
                                xLabelAngle: attribiutes.xLabelAngle,

                                goals: $parse(attribiutes.goals)($scope),
                                events: $parse(attribiutes.events)($scope),

                                axes: parseValues(attribiutes.axes),
                                grid: parseValues(attribiutes.grid)
                            };

                        ng.forEach(asFunctions, function (value, key) {
                            if (ng.isFunction(value)) {
                                params[key] = value;
                            }
                        });

                        ng.forEach(additional, function (value, key) {
                            if (ng.isDefined(value)) {
                                params[key] = value;
                            }
                        });

                        M.l(params);
                    }

                };
            }
        ]
    );
})(window.angular, window.Morris);
