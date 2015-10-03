/// <reference path="_all.ts" />
var SensorsController = (function () {
    function SensorsController($scope, $ionicSlideBoxDelegate, $interval, $timeout, Sensor) {
        var _this = this;
        this.$scope = $scope;
        this.$ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.Sensor = Sensor;
        this.$scope.garden = {};
        var initData = function () {
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
            _this.$scope.garden.state = Sensor.get({}, function () {
                _this.$scope.garden.sensors = [];
                angular.forEach(_this.$scope.garden.state.sensors, function (sensor) {
                    sensor.id = ids[sensor.device_id];
                    sensor.description = descriptions[sensor.device_id];
                    sensor.image = sensor.id.toLowerCase() + ".jpg";
                    sensor.pascals = Math.round(sensor.pascals / 1000);
                    _this.$scope.garden.sensors.push(sensor);
                });
                $timeout(function () {
                    $ionicSlideBoxDelegate.update();
                }, 10);
            });
        };
        initData();
        var updateData = function () {
            _this.$scope.garden.state = Sensor.get({}, function () {
                angular.forEach(_this.$scope.garden.state.sensors, function (sensor) {
                    angular.forEach(_this.$scope.garden.sensors, function (s) {
                        if (sensor.device_id === s.device_id) {
                            s.pascals = Math.round(sensor.pascals / 1000);
                            s.humidity = sensor.humidity;
                            s.temperature = sensor.temperature;
                            s.soil_moisture = sensor.soil_moisture;
                        }
                    });
                });
                //$timeout(() => {
                //    $ionicSlideBoxDelegate.update();
                //}, 10);
            });
        };
        $interval(updateData, 1000);
    }
    return SensorsController;
})();
//# sourceMappingURL=sensorsController.js.map