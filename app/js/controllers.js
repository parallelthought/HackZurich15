/// <reference path="_all.ts" />
define(["require", "exports"], function (require, exports) {
    var GardenController = (function () {
        function GardenController($scope, $http) {
            this.$scope = $scope;
            this.$http = $http;
            console.log($scope);
            $scope.garden = {
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
        }
        return GardenController;
    })();
    exports.GardenController = GardenController;
});
//# sourceMappingURL=controllers.js.map