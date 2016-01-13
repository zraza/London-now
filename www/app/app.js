// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'app.configs',
    'ionic',
    'LocalStorageModule',
    'angular-ladda',
    'rx',
    'ngCordova',
    'ngLodash',
    'app.default'
])

.run(function($ionicPlatform, $state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.hide(); //.styleLightContent();
        }
        $state.go('home');

    });
    $ionicPlatform.on('resume', function() {
        $state.forceReload();
    });
})

.config(function($stateProvider, $urlRouterProvider, $provide) {

    $stateProvider

    // setup an abstract state for the tabs directive
        .state('home', {
        url: '/',
        controller: 'DefaultCtrl as vm',
        templateUrl: 'app/default/default.html',
        cache: false
    })

    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/');

    $provide.decorator('$state', function($delegate, $stateParams) {
        $delegate.forceReload = function() {
            return $delegate.go($delegate.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        return $delegate;
    });

    $provide.decorator('$q', function($delegate) {
        $delegate.any = function(arr) {
            var q = $delegate.defer();
              arr.forEach(function(obj){
                if(obj)
                  obj.then(q.resolve,q.reject);
              });
            return q.promise;
        };
        return $delegate;
    });


});
