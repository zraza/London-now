(function() {
    'use strict';

    angular
        .module('app.default')
        .service('Favourite', Favourite);

    /* @ngInject */
    function Favourite(localStorageService, $q,lodash) {

        var _favourites = [];
        var _loaded = false;

        this.toggle = _toggle;
        this.exsit = _exsit;
        this.getAll = _getAll;


        ////////////////


        function _load() {
            _favourites = localStorageService.get('favourites') || [];
        }

        function _save() {
            localStorageService.set('favourites', _favourites);
        }

        function _remove(stopCode) {
            var index = _favourites.indexOf(stopCode);
            if (index >= 0) {
                _favourites.splice(index, 1);
                _save();
            }
        }

        function _add(stopCode) {
            if (!_exsit(stopCode)) {
                _favourites.push(stopCode);
                _save();
            }
        }

        function _toggle(stopCode) {

            if (_exsit(stopCode)) {
                _remove(stopCode);
                return false;
            } else {
                _add(stopCode);
                return true;
            }
        }

        function _exsit(stopCode) {
            if (_loaded === false) {
                _load();
                _loaded = true;
            }
            return _favourites.indexOf(stopCode) >= 0;
        }

        function _getAll() {
            if (_loaded === false) {
                _load();
                _loaded = true;
            }
            return $q.when(_favourites);
        }


    }

    angular
        .module('app.default')
        .service('LocationService', LocationService);

    /* @ngInject */
    function LocationService(localStorageService, $q,lodash) {

        var _favourites = [];
        var _loaded = false;

        this.toggle = _toggle;
        this.exsit = _exsit;
        this.getAll = _getAll;
        this.add = _add;
        this.remove=_remove;


        _load();

        ////////////////


        function _load() {
            _favourites = localStorageService.get('locations') || [];
        }

        function _save() {
            localStorageService.set('locations', _favourites);
        }

        function _remove(stopCode) {
            var index = _favourites.indexOf(stopCode);
            if (index >= 0) {
                _favourites.splice(index, 1);
                _save();
            }
        }

        function _add(stopCode) {
            if (!_exsit(stopCode)) {
                _favourites.push(stopCode);
                _save();
            }
        }

        function _toggle(stopCode) {

            if (_exsit(stopCode)) {
                _remove(stopCode);
                return false;
            } else {
                _add(stopCode);
                return true;
            }
        }

        function _exsit(stopCode) {
            if (_loaded === false) {
                _load();
                _loaded = true;
            }
            return lodash.findWhere(_favourites,{postcode:stopCode.postcode});
        }

        function _getAll() {
            if (_loaded === false) {
                _load();
                _loaded = true;
            }
            return _favourites;
        }


    }


})();
