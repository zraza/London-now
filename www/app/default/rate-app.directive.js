(function() {
    'use strict';

    angular
        .module('app.default')
        .directive('rateApp', rateApp);

    /* @ngInject */
    function rateApp($cordovaAppRate) {
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
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	element.bind('click',function(){
        		$cordovaAppRate.navigateToAppStore().then(function (result) {
        			// success
    			});
        	})
        }
    }

    /* @ngInject */
    function Controller() {

    }
})();	