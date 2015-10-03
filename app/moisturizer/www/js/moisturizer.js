/// <reference path="_all.ts" />
angular.module('moisturizer', ['ngResource']).factory('Sensor', ['$resource', function ($resource) {
    return $resource('/sensors');
}]).controller('SensorsController', ['$scope', '$ionicSlideBoxDelegate', '$timeout', 'Sensor', SensorsController]).controller('CalendarController', ['$scope', CalendarController]).controller('StatsController', ['$scope', StatsController]).controller('HintsController', ['$scope', HintsController]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "tabs.html"
    }).state('tab.sensors', {
        url: '/sensors',
        views: {
            'tab-sensors': {
                templateUrl: 'tab-sensors.html',
                controller: 'SensorsController'
            }
        }
    }).state('tab.calendar', {
        url: '/calendar',
        views: {
            'tab-calendar': {
                templateUrl: 'tab-calendar.html',
                controller: 'CalendarController'
            }
        }
    }).state('tab.stats', {
        url: '/stats',
        views: {
            'tab-stats': {
                templateUrl: 'tab-stats.html',
                controller: 'StatsController'
            }
        }
    }).state('tab.hints', {
        url: '/hints',
        views: {
            'tab-hints': {
                templateUrl: 'tab-hints.html',
                controller: 'HintsController'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/sensors');
});
//# sourceMappingURL=moisturizer.js.map