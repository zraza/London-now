(function() {
    'use strict';

    angular
        .module('app.configs')
        .constant('Globals', {
            app: {
                name:'London Now',
                ios:{
                    id:'849922796',
                },
                android:{
                  id:'id'  
                }
                        
            },
            ads:{
                isTesting:true,
                ios:{
                    id:'ca-app-pub-1635511884296372/8781599867'
                }
            }
        })
        .service('ConfigService', ConfigService);

    /* @ngInject */
    function ConfigService() {
        this.getTrainUrl = getTrainUrl;
        this.getWeatherUrl = getWeatherUrl;
        this.getBusUrl = getBusUrl;

        ////////////////

        function getTrainUrl() {
            return 'http://cloud.tfl.gov.uk/TrackerNet/LineStatus';
        }

        function getWeatherUrl() {
            return 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.placefinder%20where%20text%3D%2251.517098999999995%2C-0.146084%22%20and%20gflags%3D%22R%22)%20and%20u%3D%22c%22&format=json&diagnostics=true&callback=';
        }

        function getBusUrl() {
            return 'http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1';
        }
    }
})();
