(function (ng, Morris, undefined) {
    'use strict';

    var app = ng.module('angular-morrisjs', []),
        extendDeep = function (dst) {
            angular.forEach(arguments, function(obj) {
                if (obj !== dst) {
                    angular.forEach(obj, function(value, key) {
                        if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
                            extendDeep(dst[key], value);
                        } else {
                            dst[key] = value;
                        }
                    });
                }
            });
            return dst;
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
                        smooth: this.parseValues(attribiutes.smooth),
                        parseTime: this.parseValues(attribiutes.parseTime),
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

                            continuousLine: this.parseValues(attribiutes.continuousLine)
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

                this.addCallbackForGraph = function (attribiutes, $scope, graph)
                {
                    if (ng.isDefined(attribiutes.setGraph)) {
                        var setGraphCallback = $parse(attribiutes.setGraph)($scope);

                        if (ng.isFunction(setGraphCallback)) {
                            setGraphCallback(graph);
                        }
                    }
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
                        },
                            graph;

                        extendDeep(
                            params,
                            MorrisOptionsParser.getBasicOptions(element, attribiutes, $scope),
                            MorrisOptionsParser.getValuesOptions(attribiutes, $scope),
                            MorrisOptionsParser.getGridOptions(attribiutes)
                        );

                        graph = M.b(MorrisOptionsParser.parse(params));
                        MorrisOptionsParser.addCallbackForGraph(attribiutes, $scope, graph);
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
                        var params = {},
                            graph;

                        extendDeep(
                            params,
                            MorrisOptionsParser.getBasicOptions(element, attribiutes, $scope),
                            MorrisOptionsParser.getValuesOptions(attribiutes, $scope),
                            MorrisOptionsParser.getGridOptions(attribiutes),
                            MorrisOptionsParser.getLinesOptions(attribiutes, $scope)
                        );

                        graph = M.l(MorrisOptionsParser.parse(params));
                        MorrisOptionsParser.addCallbackForGraph(attribiutes, $scope, graph);
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
                            behaveLikeLine: MorrisOptionsParser.parseValues(attribiutes.behaveLikeLine)
                        },
                            graph;

                        extendDeep(
                            params,
                            MorrisOptionsParser.getBasicOptions(element, attribiutes, $scope),
                            MorrisOptionsParser.getValuesOptions(attribiutes, $scope),
                            MorrisOptionsParser.getGridOptions(attribiutes),
                            MorrisOptionsParser.getLinesOptions(attribiutes, $scope)
                        );

                        graph = M.a(MorrisOptionsParser.parse(params));
                        MorrisOptionsParser.addCallbackForGraph(attribiutes, $scope, graph);
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
                        },
                            graph;

                        extendDeep(
                            params,
                            MorrisOptionsParser.getBasicOptions(element, attribiutes, $scope)
                        );

                        graph = M.d(MorrisOptionsParser.parse(params));
                        MorrisOptionsParser.addCallbackForGraph(attribiutes, $scope, graph);
                    }

                };
            }
        ]
    );
})(window.angular, window.Morris);
