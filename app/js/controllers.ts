/// <reference path="_all.ts" />

interface IGardenScope {
    garden: any;
}

interface IGardenController {
}

export class GardenController implements IGardenController {

    constructor(private $scope: IGardenScope,
                private $http: ng.IHttpService) {
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

}