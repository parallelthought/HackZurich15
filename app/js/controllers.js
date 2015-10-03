/// <reference path="_all.ts" />
define(["require", "exports"], function (require, exports) {
    var GardenController = (function () {
        function GardenController($scope, $http, $resource) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$resource = $resource;
            $scope.garden = {
                isLoading: false,
                map: {
                    center: {
                        latitude: 47.4108324,
                        longitude: 8.3811095
                    },
                    zoom: 17,
                    options: {
                        mapTypeId: google.maps.MapTypeId.SATELLITE
                    }
                }
            };
            this.state = this.$resource("/stupidapi.json", {
                callback: "JSON_CALLBACK"
            }, {
                getState: {
                    method: "JSONP",
                    isArray: true
                }
            });
            this.readState();
            this.$scope.garden.selectSensor = function (sensor) { return _this.selectSensor(sensor); };
        }
        GardenController.prototype.selectSensor = function (sensor) {
            return function (circle) {
                console.log(sensor);
            };
        };
        GardenController.prototype.readState = function () {
            var _this = this;
            this.$scope.isLoading = true;
            this.state.get().$promise.then(function (state) {
                _this.$scope.isLoading = false;
                angular.forEach(state.sensors, function (sensor) {
                    sensor.fill = _this.getColor(sensor.state, 0.3);
                    sensor.stroke = _this.getColor(sensor.state, 1);
                });
                _this.$scope.garden.sensors = state.sensors;
            }, function (error) {
                // If something goes wrong with a JSONP request in AngularJS,
                // the status code is always reported as a "0". As such, it's
                // a bit of black-box, programmatically speaking.
                alert("Something went wrong!");
            });
        };
        GardenController.prototype.getColor = function (state, opacity) {
            return state === "DRY" ? { color: "#eddd30", opacity: opacity } : { color: "#305ded", opacity: opacity };
        };
        return GardenController;
    })();
    exports.GardenController = GardenController;
});
//# sourceMappingURL=controllers.js.map