/// <reference path="_all.ts" />

interface IHintsController {
}

class HintsController implements IHintsController {
    private state: any;

    constructor(private $scope: any) {
        this.$scope.items = [
            {
                description: "Watering your plants in the evening helps them overcome heat throughout the day",
                img: 'img/water.png'
            },
            {
                description: "Cacti need an average temperature of 27 C, otherwise they will not grow",
                img: 'img/temperature.png'
            },
            {
                description: "The right amount of sun is crucial for your plants - but please not too much.",
                img: 'img/sun.png'
            },
            {
                description: "Are you ready for the summer? Rewe is offering you free plant seeds if you use this code: HappyPlants.",
                img: 'img/statistics.png'
            }
        ]
    }
}
