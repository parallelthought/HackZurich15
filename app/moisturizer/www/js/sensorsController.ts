/// <reference path="_all.ts" />

interface ISensorsController {
}

interface IStateResource extends ng.resource.IResourceService {
    getState();
}

class SensorsController implements ISensorsController {
    constructor(private $scope: any,
                private $ionicSlideBoxDelegate,
                private $interval,
                private $timeout,
                private Sensor: any) {
        this.$scope.garden = {};
        var initData = ()=> {
            var ids = {
                "1b0033000a47343138333038": "Jacaranda",
                "24002d000447343337373738": "Lilly",
                "430039000947343337373738": "Rosemary",
                "38003d000b47343138333038": "Yasmine"
            };

            var descriptions = {
                "1b0033000a47343138333038": "Violet tree",
                "24002d000447343337373738": "Redish flower",
                "430039000947343337373738": "Bush of roses",
                "38003d000b47343138333038": "Yasmine Tree"
            };
            this.$scope.garden.state = Sensor.get({}, () => {
                this.$scope.garden.sensors = [];
                angular.forEach(this.$scope.garden.state.sensors, (sensor) => {
                    sensor.id = ids[sensor.device_id];
                    sensor.description = descriptions[sensor.device_id];
                    sensor.image = sensor.id.toLowerCase() + ".jpg";
                    sensor.pascals = Math.round(sensor.pascals / 1000);
                    this.$scope.garden.sensors.push(sensor);
                });
                $timeout(() => {
                    $ionicSlideBoxDelegate.update();
                }, 10);
            });
        };
        initData();

        var updateData = ()=> {
            this.$scope.garden.state = Sensor.get({}, () => {
                angular.forEach(this.$scope.garden.state.sensors, (sensor) => {
                    angular.forEach(this.$scope.garden.sensors, (s) => {
                        if (sensor.device_id === s.device_id) {
                            s.pascals = Math.round(sensor.pascals / 1000);
                            s.humidity = sensor.humidity;
                            s.temperature = sensor.temperature;
                            s.soil_moisture = sensor.soil_moisture;
                        }
                    });
                });
            });
        };

        $interval(updateData, 1000);
    }
}