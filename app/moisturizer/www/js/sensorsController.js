/// <reference path="_all.ts" />
var SensorsController = (function () {
    function SensorsController($scope, $ionicSlideBoxDelegate, $timeout, Sensor) {
        var _this = this;
        this.$scope = $scope;
        this.$ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
        this.$timeout = $timeout;
        this.Sensor = Sensor;
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
        this.$scope.garden = {};
        this.$scope.garden.sensors = [];
        this.$scope.garden.state = Sensor.get({}, function () {
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
    }
    return SensorsController;
})();
//# sourceMappingURL=sensorsController.js.map