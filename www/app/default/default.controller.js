(function() {
    'use strict';

    angular
        .module('app.default')
        .controller('DefaultCtrl', DefaultCtrl);

    /* @ngInject */
    function DefaultCtrl(lodash, LocationService, BusService, WeatherService, TrainService, GeoLocationService, PostCodeService, Favourite, $ionicSlideBoxDelegate, $q, $scope) {
        var vm = this;

        vm.lastElement = lastElement;
        vm.doRefresh = doRefresh;

        vm.busListMessage = 'Please wait ...';
        vm.settings = {
            postCode: '',
            busSearchType: 'CURRENT_LOCATION',
            loadBusses: loadBusses
        };

        activate();

        ////////////////

        function activate() {
            console.log('Loadinggg');
            loadBusses();
            loadWeather();
            loadTrains();
        }

        function doRefresh() {

            $q.any([loadBusses(), loadWeather(), loadTrains()]).then(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });

        }

        function loadTrains() {
            vm.trains = getStatus('Loading trains');
            return TrainService.getUpdate().then(function(data) {
                vm.trains = data.data;
            }).catch(function(res) {
                vm.trains = getStatus('Error loading tube/train status, Pull Down to refresh', 'ERROR');
            });
        }

        function loadBusses() {
            switch (vm.settings.busSearchType) {
                case 'CURRENT_LOCATION':
                    loadByCurrentLocation();
                    break;
                case 'FAVOURITE_STOPS':
                    loadFavouriteBusses();
                    break;
                case 'POST_CODE':
                    getByPostCode(vm.settings.postCode);
                    break;
            }
        }

        function loadByCurrentLocation() {
            vm.stops = getStatus('Detecting your current location');
            vm.busListMessage = 'Stops near me';
            return GeoLocationService.getCurrentLocation().then(function(position) {
                loadByLocation(position.coords.latitude, position.coords.longitude);
            }).catch(function(res) {
                vm.stops = getStatus('Unable to detect your location, please check, if you have allowed App to use your location.', 'ERROR');
            });
        }

        function loadByLocation(latitude, longitude) {
            if (latitude && longitude) {
                vm.stops = getStatus('Loading buses near you');
                return BusService.loadNearlist(latitude, longitude, 500).then(function(data) {
                    vm.stops = data.data;
                }).catch(function(res) {
                    if (res.status === 416) {
                        vm.stops = getStatus('No bus information found near current location range, you can search by London Post Code', 'ERROR');
                        vm.stops.status.code = res.status;
                    } else {
                        vm.stops = getStatus('Error loading bus countdown, Pull Down to refresh', 'ERROR');
                    }
                });
            }
        }

        function loadWeather() {
            vm.weather = getStatus('Loading weather');
            return WeatherService.get().then(function(data) {
                vm.weather = data.data;
            }).catch(function(res) {
                vm.weather = getStatus('Error loading weather, Pull Down to refresh', 'ERROR');
            });
        }

        function lastElement() {
            $ionicSlideBoxDelegate.update();
        }

        function getByPostCode(postCode) {
            PostCodeService.get(postCode).then(function(position) {
                vm.busListMessage = 'Buses around ' + position.postcode;
                LocationService.add(position);
                loadByLocation(position.latitude, position.longitude);
            }).catch(function(res) {
                vm.stops = getStatus('No bus found for this post code, please try different post code or "Stops near me" option.', 'ERROR');
            });
        }

        function loadFavouriteBusses() {
            Favourite.getAll().then(function(res) {
                if (res.length > 0) {
                    vm.busListMessage = 'My favourite stops';
                    vm.stops = getStatus('Loading buses on your favourite stops');
                    return BusService.loadByStops(res).then(function(data) {
                        vm.stops = data.data;
                    }).catch(function(res) {
                        vm.stops = getStatus('Error loading bus countdown, Pull Down to refresh', 'ERROR');
                    });
                }else{
                    vm.stops = getStatus('No favourite stops found, please choose "Stops near me" or "Search by Postcode" and add stops in your favourite list.', 'WARNING');
                }
            });
        }


        function getStatus(message, type) {
            type = type || 'LOADING';
            message = message || 'Please wait loading';
            return {
                status: {
                    type: type,
                    message: message
                }
            };
        }

    }
})();
