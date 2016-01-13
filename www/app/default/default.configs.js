(function() {
    'use strict';

    angular
        .module('app.default')
        .config(GlobalSettings)
        .run(GlobalRun);


    /* @ngInject */
    function GlobalSettings($cordovaAppRateProvider, Globals) {

        if (window.cordova) {
            ionic.Platform.ready(function() {
                appRate();
            });
        }

        ////////////////

        function appRate() {
            var prefs = {
                usesUntilPrompt: 2,
                appName: Globals.app.name,
                iosURL: Globals.app.ios.id,
                androidURL: 'market://details?id=<package_name>'
            };

            $cordovaAppRateProvider.setPreferences(prefs)

        }

    }

    function GlobalRun($cordovaAppRate,AdsService) {
        if (window.cordova) {
            ionic.Platform.ready(function() {
                appRate();
                showAds();
            });
        }

        function appRate() {
            $cordovaAppRate.promptForRating().then(function(result) {
                console.log('result');
            }).catch(function(err) {
                console.log('err');
            });
        }

        function showAds (){
            AdsService.showBanner();
        }


    }


})();
