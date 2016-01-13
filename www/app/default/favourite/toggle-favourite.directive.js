(function() {
    'use strict';

    angular
        .module('app.default.favourite')
        .directive('toggleFavourite', toggleFavourite);

    toggleFavourite.$inject = ['Favourite'];

    /* @ngInject */
    function toggleFavourite(Favourite) {
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
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
            var vm = scope.vm;

            var stopCode = attrs.toggleFavourite;

            element.bind('click', function() {
                vm.toggleFavourite(stopCode);
            });
        }
    }

    /* @ngInject */
    function Controller(Favourite,SweetAlert) {
        var vm = this;

        vm.toggleFavourite = toggleFavourite;
        vm.isFavourite = isFavourite;


        function toggleFavourite(stopCode) {

            if (Favourite.exsit(stopCode)) {

                SweetAlert.swal({
                    title: 'Are you sure?',
                    text: 'That will remove the item from your favourites list.',
                    type: 'warning',
                    showCancelButton: true,
                    html: true,
                    confirmButtonColor: '#ef473a',
                    confirmButtonText: 'Yes, remove it!',
                    closeOnConfirm: true
                }, function(isConfirm) {
                    if (isConfirm) {
                        Favourite.toggle(stopCode);
                    }
                });

            } else {
                Favourite.toggle(stopCode);
            }
        };

        function isFavourite(stopCode) {
            return Favourite.exsit(stopCode);
        };
    }
})();
