(function() {
    'use strict';

    angular
        .module('app.default.geo-location')
        .service('GeoLocationService', GeoLocationService);

    /* @ngInject */
    function GeoLocationService($cordovaGeolocation, $timeout, $q) {
        this.getCurrentLocation = getLocation;
        this.defaultOptions = {
            maxWait: 10000,
            desiredAccuracy: 100,
            timeout: 10000,
            maximumAge: 0,
            enableHighAccuracy: true,
            frequency: 1000,
        };

        ////////////////

        function getLocation(options) {
            var q = $q.defer();
            var lastCheckedPosition = null;

            options = angular.extend(this.defaultOptions, options);

            var done = function() {
                if(lastCheckedPosition){
                    q.resolve(lastCheckedPosition);
                }else{
                    q.reject('Request Time out');    
                }
                
                watch.clearWatch();
            }

            var watch = $cordovaGeolocation.watchPosition(options);
            watch.then(null, function(error) {
                    q.reject(error);
                },
                function(position) {
                    lastCheckedPosition = position;
                    if (options.desiredAccuracy >= position.coords.accuracy) {
                        done();
                    }
                });

            $timeout(done, options.maxWait);

            return q.promise;
        }

    }
})();
