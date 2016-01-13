(function() {
    'use strict';

    angular
        .module('app.default')
        .directive('searchPostCode', searchPostCode);


    /* @ngInject */
    function searchPostCode($timeout) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            templateUrl: 'app/default/search-post-code.directive.html',
            scope: {
                data: '=searchPostCode',
                afterSearch: '&afterSearch'
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    /* @ngInject */
    function Controller(LocationService) {
        var vm = this;

        vm.locations = LocationService.getAll();

        vm.remove = remove;

        //////////
        function remove(location) {
            LocationService.remove(location);
        }
    }
})();
