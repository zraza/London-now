(function() {
    'use strict';

    angular
        .module('app.default', [
            'app.default.bus',
            'app.default.train',
            'app.default.weather',
            'app.default.favourite',
            'app.default.geo-location',
            'app.default.ads',
            'app.default.postcode'
        ]);
})();