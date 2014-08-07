(function (ng) {
    var app = ng.module('exampleApp', ['angular-morrisjs']),
        MainCtrl = function ()
        {};

    MainCtrl.prototype.bar = function ()
    {
        return {
            data: [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            donutData: [
                { label: '2006', value: 100, b: 90 },
                { label: '2007', value: 75,  b: 65 },
                { label: '2008', value: 50,  b: 40 },
                { label: '2009', value: 75,  b: 65 },
                { label: '2010', value: 50,  b: 40 },
                { label: '2011', value: 75,  b: 65 },
                { label: '2012', value: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            hoverCallback: function (index, options, content, row) {
                return "<div>" + JSON.stringify(row) + "</div>";
            },
            colors: ['#00ff00', '#ff0000'],
            pointFillColors: ['#ff0000', '#00ff00'],
            goals: [10, 52],
            events: ['2011', '2009', '2007']
        };
    };

    app.controller(
        "MainCtrl",
        [
            MainCtrl
        ]
    );
})(window.angular);
