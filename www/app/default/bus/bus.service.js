(function() {
    'use strict';

    angular
        .module('app.default.bus')
        .service('BusService', BusService);

    /* @ngInject */
    function BusService($http, Favourite,ConfigService,lodash) {

        var resultList = 'StopPointName,StopCode1,Towards,StopPointIndicator,Latitude,Longitude,LineID,LineName,DestinationName,EstimatedTime';

        this.loadNearlist = _loadNearlist;
        this.loadByStops = _loadByStops;

        ////////////////


        function _loadNearlist(lat, log, radius) {
            return $http.get(ConfigService.getBusUrl()+'?Circle=' + lat + ',' + log + ',' + radius + '&ReturnList=' + resultList, {
                responseType: 'text',
                transformResponse: function(result) {
                    return _transformResponse(result, lat, log);
                }
            });
        }
        function _loadByStops(stops) {
            return $http.get(ConfigService.getBusUrl()+'?StopCode1=' + stops.join(',') + '&ReturnList=' + resultList, {
                responseType: 'text',
                transformResponse: function(result) {
                    return _transformResponse(result);
                }
            });
        }

        function _transformResponse(result, lat, log) {
            var groupedByStop = [];

            var returnData = resultList.split(',');

            var stopList = result.split('\n');

            stopList.shift(); // skip first row
            var stopCode = null;
            var stopIndex = -1;
            stopList.forEach(function(val) {
                var stopData = JSON.parse(val)

                var stopInfo = {};
                returnData.forEach(function(token, index) {
                    stopInfo[token] = stopData[index + 1];
                });

                // check if new stop in the list
                if (stopCode !== stopInfo.StopCode1) {
                    groupedByStop[++stopIndex] = lodash.clone(stopInfo);
                    groupedByStop[stopIndex].times = [];
                    groupedByStop[stopIndex].favourite = Favourite.exsit(stopInfo.StopCode1);
                    groupedByStop[stopIndex].distance = lat?_distance(lat, log, stopInfo.Latitude, stopInfo.Longitude):0;
                }
                stopCode = stopInfo.StopCode1;
                groupedByStop[stopIndex].times.push(stopInfo);

            })
            lodash.map(groupedByStop,function(stop){
                stop.lines = lodash.unique(lodash.pluck(stop.times,'LineID'))
            });
            return groupedByStop;
        }


        function _distance(lat1, lon1, lat2, lon2, unit) {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var radlon1 = Math.PI * lon1 / 180;
            var radlon2 = Math.PI * lon2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === 'K') {
                dist = dist * 1.609344;
            }
            if (unit === 'N') {
                dist = dist * 0.8684;
            }
            return dist;
        }


    }
})();
