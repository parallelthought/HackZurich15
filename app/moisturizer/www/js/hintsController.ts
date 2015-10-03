/// <reference path="_all.ts" />

interface IHintsController {
}

class HintsController implements IHintsController {
    private state: any;

    constructor(private $scope: any) {
        this.$scope.items = [
            {
                title: "Sun",
                description: "Make sure your flower has enough sunlight!",
                img: 'img/sun.jpg'
            },
            {
                title: "Fertilize your plant",
                description: "Plants growing in containers need more fertilizing than those in the ground. The more you water, the more quickly you flush the nutrients out of the soil. If you want really healthy and happy plants, feed them a liquid or water-soluble fertilizer every couple of weeks according to package directions.",
                img: 'img/fertilizer.jpg'
            },
            {
                title: "Deadheading",
                description: "Pinching or cutting off faded blooms, known as deadheading, is essential. It encourages a plant to keep producing more flowers.",
                img: 'img/leaf.jpg'
            }
        ]
    }
}
