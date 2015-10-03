/// <reference path="_all.ts" />

interface ISensorsController {
}

interface IStateResource extends ng.resource.IResourceService {
    getState();
}

class SensorsController implements ISensorsController {
    private state: any;

    constructor(private $scope: any,
                private $ionicSlideBoxDelegate,
                private $timeout,
                private Sensor: any) {
        this.$scope.garden = {};
        this.$scope.garden.sensors = Sensor.query();

        this.$scope.$watch("garden.sensors", () => {
            $timeout(() => {
                $ionicSlideBoxDelegate.update();
            }, 10);
        });
    }

}
