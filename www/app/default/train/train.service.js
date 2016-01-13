(function() {
    'use strict';

    angular
        .module('app.default.train')
        .service('TrainService', TrainService);

    /* @ngInject */
    function TrainService($http,ConfigService) {

        var _colors = {
            '1': '#AE6118', //bakerloo
            '2': '#E41F1F', //central
            '3': '#F8D42D', //circle
            '9': '#007229', //district
            '8': '#E899A8', //hammersmith-city
            '4': '#686E72', //jubilee
            '11': '#893267', //metropolitan
            '5': '#000000', //northern
            '6': '#0450A1', //piccadilly #0019a8
            '7': '#009FE0', //victoria
            '12': '#70C3CE', //waterloo-city
            '82': '#F86C00', //london-overground
            '81': '#00BBB4', //dlr
            '83': '#0019a8' //TFL
        };

        this.getUpdate = _getUpdate;

        ////////////////

        function _getUpdate() {
            //http://cloud.tfl.gov.uk/TrackerNet
            //return $http.get('http://cloud.tfl.gov.uk/TrackerNet/LineStatus', {
            return $http.get(ConfigService.getTrainUrl(), {
                responseType: 'text',
                transformResponse: function(result) {

                    var update = [];
                    var myOptions = {
                        mergeCDATA: true,
                        xmlns: false,
                        //attrsAsObject: false,
                        childrenAsArray: false,
                        attrsAsObject: true, // if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
                        stripAttrPrefix: true, // remove namespace prefixes from attributes
                        stripElemPrefix: true, // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property

                    }
                    result = xmlToJSON.parseString(result, myOptions);

                    result.ArrayOfLineStatus.LineStatus.forEach(function(val) {

                        var tube = {
                            id: val.Line._attr.ID._value,
                            name: val.Line._attr.Name._value,
                            color: _colors[val.Line._attr.ID._value],
                            status: val.Status._attr.Description._value,
                            disruption: 'Good Service' !== val.Status._attr.Description._value
                        };

                        if (val._attr.StatusDetails) {
                            tube.deatil = val._attr.StatusDetails._value;
                        }
                        //console.log(tube);

                        update.push(tube);
                    });
                    return update;
                }
            });
        }
    }
})();
