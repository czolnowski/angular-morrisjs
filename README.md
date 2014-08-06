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
```

## Development
* install node modules ```npm install```
* install gulp globally ```npm install -g gulp```
* run gulp ```gulp```
