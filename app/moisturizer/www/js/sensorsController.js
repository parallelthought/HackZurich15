/// <reference path="_all.ts" />
var SensorsController = (function () {
    function SensorsController($scope, $ionicSlideBoxDelegate, $timeout, Sensor) {
        this.$scope = $scope;
        this.$ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
        this.$timeout = $timeout;
        this.Sensor = Sensor;
        this.$scope.garden = {};
        this.$scope.garden.sensors = Sensor.query();
        this.$scope.$watch("garden.sensors", function () {
            $timeout(function () {
                $ionicSlideBoxDelegate.update();
            }, 10);
        });
    }
    return SensorsController;
})();
//# sourceMappingURL=sensorsController.js.map