## angular-morrisjs
Simple directives wrapping morrisjs visualizations.

## Usage
Install with bower:
```
bower install angular-morrisjs
```

Then add to your angular app:
```
angular.module('application', ['angular-morrisjs']);
```

And add directive with visualization:
```
<bar-chart data="data"
           xkey="label"
           ykeys="ykeys"
           labels="labels"></bar-chart>

<line-chart data="data"
            xkey="label"
            ykeys="ykeys"
            labels="labels"></line-chart>

<area-chart data="data"
            xkey="label"
            ykeys="ykeys"
            labels="labels"></area-chart>

<donut-chart data="data"></donut-chart>
```

## Changelog

__v.1.1.3__
- add extendDeep to propagate embedded options

__v.1.1.2__
- fix literal in setGraph feature

__v.1.1.1__
- add missing dist

__v.1.1.0__
- remove unused parseValues function
- add callback to set graph into your scope

__v.1.0.0__
- integration for all morris visualization and compatibility with morrisjs *0.5.1*

## Development
* install node modules ```npm install```
* install gulp globally ```npm install -g gulp```
* run gulp ```gulp```
