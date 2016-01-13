(function() {
    'use strict';

    angular
        .module('app.default')
        .directive('help', help);

    /* @ngInject */
    function help($ionicModal) {
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
            var vm = scope.vm;
            element.bind('click', vm.show);
        }
    }

    /* @ngInject */
    function Controller($ionicModal, $q,$scope) {
        var vm = this;
        vm.show = showHelp;
        vm.hide = hideHelp;

        function getPopup() {
            if (vm.helpModal) return;
            return $ionicModal.fromTemplateUrl('app/default/help.directive.html', {
                animation: 'slide-in-up',
                scope:$scope
            }).then(function(modal) {
                vm.helpModal = modal;
            });

        }

        function showHelp() {
            $q.when(getPopup()).then(function() {
                vm.helpModal.show();
            })
        }

        function hideHelp() {
            vm.helpModal.hide();
        }
    }
})();
