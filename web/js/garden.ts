/// <reference path="_all.ts" />

import controllers = require("controllers");

'use strict';

export class GardenApp {
    constructor() {
        angular
            .module('garden', ['uiGmapgoogle-maps', 'ngResource'])
            .controller('GardenController', ['$scope', '$http', '$resource', controllers.GardenController])
            .config(function (uiGmapGoogleMapApiProvider) {
                uiGmapGoogleMapApiProvider.configure({
                    //    key: 'your api key',
                    v: '3.20', //defaults to latest 3.X anyhow
                    libraries: 'weather,geometry,visualization'
                });
            });

        angular.element(document).ready(function () {
            angular.bootstrap(document.getElementById("garden-app"), ['garden']);
        });
    }
}