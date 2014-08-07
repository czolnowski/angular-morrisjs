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
                    l: Morris.Line,
                    a: Morris.Area,
                    d: Morris.Donut
                };
            }
        ]
    );

    app.service(
        'MorrisOptionsParser',
        [
            "$parse",
            function ($parse)
            {
                this.parseValues = function (value, possibleValues, skipBoolTransform)
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

                this.getBasicOptions = function (element, attribiutes, $scope)
                {
                    return {
                        element: element,
                        data: $parse(attribiutes.data)($scope),
                        additional: {
                            resize: this.parseValues(attribiutes.resize)
                        }
                    };
                };

                this.getValuesOptions = function (attribiutes, $scope)
                {
                    return {
                        xkey: attribiutes.xkey,
                        ykeys: $parse(attribiutes.ykeys)($scope),
                        labels: $parse(attribiutes.labels)($scope),
                        hideHover: this.parseValues(attribiutes.hideHover, ['always', 'auto']),
                        asFunctions: {
                            hoverCallback: $parse(attribiutes.hoverCallback)($scope)
                        }
                    }
                };

                this.getGridOptions = function (attribiutes)
                {
                    return {
                        axes: this.parseValues(attribiutes.axes),
                        grid: this.parseValues(attribiutes.grid),
                        additional: {
                            gridTextColor: attribiutes.gridTextColor,
                            gridTextSize: attribiutes.gridTextSize,
                            gridTextFamily: attribiutes.gridTextFamily,
                            gridTextWeight: attribiutes.gridTextWeight
                        }
                    };
                };

                this.getLinesOptions = function (attribiutes, $scope)
                {
                    return {
                        lineColors: $parse(attribiutes.lineColors)($scope),
                        lineWidth: attribiutes.lineWidth,
                        pointSize: attribiutes.pointSize,
                        pointFillColors: $parse(attribiutes.pointFillColors)($scope),
                        pointStrokeColors: attribiutes.pointStrokeColors,
                        ymax: attribiutes.ymax,
                        ymin: attribiutes.ymin,
                        smooth: parseValues(attribiutes.smooth),
                        parseTime: parseValues(attribiutes.parseTime),
                        postUnits: attribiutes.postUnits,
                        preUnits: attribiutes.preUnits,
                        xLabels: attribiutes.xLabels,
                        xLabelAngle: attribiutes.xLabelAngle,

                        goals: $parse(attribiutes.goals)($scope),
                        events: $parse(attribiutes.events)($scope),

                        additional: {
                            fillOpacity: attribiutes.fillOpacity,

                            goalStrokeWidth: attribiutes.goalStrokeWidth,
                            goalLineColors: attribiutes.goalLineColors,

                            eventStrokeWidth: attribiutes.eventStrokeWidth,
                            eventLineColors: attribiutes.eventLineColors,

                            continuousLine: parseValues(attribiutes.continuousLine)
                        },
                        asFunctions: {
                            dateFormat: $parse(attribiutes.dateFormat)($scope),
                            xLabelFormat: $parse(attribiutes.xLabelFormat)($scope)
                        }
                    };
                };

                this.parse = function (params)
                {
                    ng.forEach(params.asFunctions, function (value, key) {
                        if (ng.isFunction(value)) {
                            params[key] = value;
                        }
                    });

                    ng.forEach(params.additional, function (value, key) {
                        if (ng.isDefined(value)) {
                            params[key] = value;
                        }
                    });

                    return params;
                };
            }
        ]
    );

    app.directive(
        'barChart',
        [
            "$parse", "Morris", "MorrisOptionsParser",
            function ($parse, M, MorrisOptionsParser)
            {
                return {
                    restrict: 'AE',
                    template: '<div></div>',
                    replace: true,
                    link: function($scope, element, attribiutes) {
                        var params = {
                            barColors: $parse(attribiutes.barColors)($scope),
                            stacked: MorrisOptionsParser.parseValues(attribiutes.stacked)
                        };

                        ng.extend(
                            params,
                            MorrisOptionsParser.getBasicOptions(element, attribiutes, $scope),
                            MorrisOptionsParser.getValuesOptions(attribiutes, $scope),
                            MorrisOptionsParser.getGridOptions(attribiutes)
                        );

                        M.b(MorrisOptionsParser.parse(params));
                    }
                };
            }
        ]
    );

    app.directive(
        'lineChart',
        [
            "Morris", "MorrisOptionsParser",
            function (M, MorrisOptionsParser)
            {
                return {
                    restrict: 'AE',
                    template: '<div></div>',
                    replace: true,
                    link: function($scope, element, attribiutes) {
                        var params = {};

                        ng.extend(
                            params,
                            MorrisOptionsParser.getBasicOptions(element, attribiutes, $scope),
                            MorrisOptionsParser.getValuesOptions(attribiutes, $scope),
                            MorrisOptionsParser.getGridOptions(attribiutes),
                            MorrisOptionsParser.getLinesOptions(attribiutes, $scope)
                        );

                        M.l(MorrisOptionsParser.parse(params));
                    }

                };
            }
        ]
    );

    app.directive(
        'areaChart',
        [
            "Morris", "MorrisOptionsParser",
            function (M, MorrisOptionsParser)
            {
                return {
                    restrict: 'AE',
                    template: '<div></div>',
                    replace: true,
                    link: function($scope, element, attribiutes) {
                        var params = {
                            behaveLikeLine: parseValues(attribiutes.behaveLikeLine)
                        };

                        ng.extend(
                            params,
                            MorrisOptionsParser.getBasicOptions(element, attribiutes, $scope),
                            MorrisOptionsParser.getValuesOptions(attribiutes, $scope),
                            MorrisOptionsParser.getGridOptions(attribiutes),
                            MorrisOptionsParser.getLinesOptions(attribiutes, $scope)
                        );

                        M.a(MorrisOptionsParser.parse(params));
                    }

                };
            }
        ]
    );

    app.directive(
        'donutChart',
        [
            "$parse", "Morris", "MorrisOptionsParser",
            function ($parse, M, MorrisOptionsParser)
            {
                return {
                    restrict: 'AE',
                    template: '<div></div>',
                    replace: true,
                    link: function($scope, element, attribiutes) {
                        var params = {
                            colors: $parse(attribiutes.colors)($scope),
                            asFunctions: {
                                formatter: $parse(attribiutes.formatter)($scope)
                            }
                        };

                        ng.extend(
                            params,
                            MorrisOptionsParser.getBasicOptions(element, attribiutes, $scope)
                        );

                        M.d(MorrisOptionsParser.parse(params));
                    }

                };
            }
        ]
    );
})(window.angular, window.Morris);
