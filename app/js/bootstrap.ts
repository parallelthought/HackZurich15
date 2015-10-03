/// <reference path="_all.ts" />

require(
    [
        'garden'
    ],
    (garden) => {
        'use strict';

        angular.element(document).ready(function () {
            new garden.GardenApp;
        });
    }
);