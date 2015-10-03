/// <reference path="_all.ts" />

interface IGardenScope {
    garden: any;
    isLoading: boolean;
}

interface IGardenController {
}

interface IStateResource extends ng.resource.IResourceService {
    getState();
}

export class GardenController implements IGardenController {
    private state: any;

    constructor(private $scope: IGardenScope,
                private $http: ng.IHttpService,
                private $resource: IStateResource) {

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

        this.state = this.$resource(
            "/stupidapi.json",
            {
                callback: "JSON_CALLBACK"
            },
            {
                getState: {
                    method: "JSONP",
                    isArray: true
                }
            }
        );
        this.readState();
        this.$scope.garden.selectSensor = (sensor) => this.selectSensor(sensor);
    }

    public selectSensor(sensor) {
        return (circle) => {
            console.log(sensor);
        }
    }

    private readState() {
        this.$scope.isLoading = true;
        this.state.get().$promise.then(
            (state) => {
                this.$scope.isLoading = false;
                angular.forEach(state.sensors, sensor => {
                    sensor.fill = this.getColor(sensor.state, 0.3);
                    sensor.stroke = this.getColor(sensor.state, 1);
                });
                this.$scope.garden.sensors = state.sensors;
            },
            (error) => {
                // If something goes wrong with a JSONP request in AngularJS,
                // the status code is always reported as a "0". As such, it's
                // a bit of black-box, programmatically speaking.
                alert("Something went wrong!");
            }
        );
    }

    private getColor(state, opacity) {
        return state === "DRY" ? {color: "#eddd30", opacity: opacity} : {color: "#305ded", opacity: opacity};
    }

}