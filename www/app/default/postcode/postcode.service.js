(function() {
    'use strict';

    angular
        .module('app.default.postcode')
        .service('PostCodeService', PostCodeService);

    /* @ngInject */
    function PostCodeService($http) {
        this.get = get;

        ////////////////

        function get(code) {
        	return $http.get('https://api.postcodes.io/postcodes/'+code).then(function(res){
        		return res.data.result;
        	})
        }
    }
})();