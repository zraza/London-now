(function() {
    'use strict';

    angular
        .module('app.default.train')
        .directive('trainStatusDeatil', trainStatusDeatil);


    /* @ngInject */
    function trainStatusDeatil() {
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
            	trains:'=trains'
            }
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
        vm.show = show;
        vm.hide = hide;

        function getPopup() {
            if (vm.helpModal) return;
            return $ionicModal.fromTemplateUrl('app/default/train/train-status-detail.directive.html', {
                animation: 'slide-in-up',
                scope:$scope
            }).then(function(modal) {
                vm.helpModal = modal;
            });

        }

        function show() {
        	console.log(vm.trains);
            $q.when(getPopup()).then(function() {
                vm.helpModal.show();
            })
        }

        function hide() {
            vm.helpModal.hide();
        }
    }
})();