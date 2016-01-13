(function() {
    'use strict';

    angular
        .module('app.default')
        .directive('popUp', popUp);

    /* @ngInject */
    function popUp($ionicModal) {
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
            scope: {
                data:'=data'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            var vm = scope.vm;
            vm.template = attrs.popUp;
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
            return $ionicModal.fromTemplateUrl(vm.template, {
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
