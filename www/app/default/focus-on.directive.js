(function() {
    'use strict';

    angular
        .module('app.default')
        .directive('focusOn', focusOn);

    /* @ngInject */
    function focusOn($timeout) {
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
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch(attrs.focusOn, function(val) {
                if (val) {
                    $timeout(function() {
                        element[0].focus();
                    }, 150);
                }
            });
        }
    }

    /* @ngInject */
    function Controller() {

    }
})();
