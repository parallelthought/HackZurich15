/// <reference path="_all.ts" />
define(["require", "exports", "controllers"], function (require, exports, controllers) {
    'use strict';
    var GardenApp = (function () {
        function GardenApp() {
            angular.module('garden', ['uiGmapgoogle-maps']).controller('GardenController', ['$scope', '$http', controllers.GardenController]).config(function (uiGmapGoogleMapApiProvider) {
                uiGmapGoogleMapApiProvider.configure({
                    //    key: 'your api key',
                    v: '3.20',
                    libraries: 'weather,geometry,visualization'
                });
            });
            angular.element(document).ready(function () {
                angular.bootstrap(document.getElementById("garden-app"), ['garden']);
            });
        }
        return GardenApp;
    })();
    exports.GardenApp = GardenApp;
});
//# sourceMappingURL=garden.js.map