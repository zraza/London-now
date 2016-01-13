(function() {
    'use strict';

    angular
        .module('app.default.bus')
        .controller('BusCtrl', BusCtrl);

    BusCtrl.$inject = ['BusService'];

    /* @ngInject */
    function BusCtrl(BusService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
        }
    }
})();