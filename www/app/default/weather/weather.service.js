(function() {
    'use strict';

    angular
        .module('app.default.weather')
        .service('WeatherService', WeatherService);

    /* @ngInject */
    function WeatherService($http,ConfigService) {
        this.get = get;

        ////////////////

        function get() {
            return $http.get(ConfigService.getWeatherUrl(), {
                responseType: 'text',
                transformResponse: function(result) {
                    var items = JSON.parse(result).query.results.channel.item;
                    var now = {
                        temp: items.condition.temp,
                        code: items.condition.code,
                        text: items.condition.text,
                        high: items.forecast[0].high,
                        low: items.forecast[0].low,

                    };
                    return {
                        now: now,
                        forecast: items.forecast
                    };

                }
            });
        }
    }
})();
