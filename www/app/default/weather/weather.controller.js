(function() {
    'use strict';

    angular
        .module('app.default')
        .directive('loader', loader);


    /* @ngInject */
    function loader() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            transclude: true,
            templateUrl: 'app/default/loader.directive.html',
            scope: {
                status: '=loader'
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    /* @ngInject */
    function Controller() {

    }
})();
