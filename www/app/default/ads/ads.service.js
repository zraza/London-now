(function() {
    'use strict';

    angular
        .module('app.default.ads')
        .service('AdsService', AdsService);

    /* @ngInject */
    function AdsService($cordovaAdMob, $window, Globals) {

        var options = {
            publisherID: Globals.ads.ios.id,
            bannerAtTop: false, // Set to true, to put banner at top
            overlap: false, // True to allow banner overlap webview
            offsetTopBar: true, // True to avoid ios7 status bar overlap
            isTesting: Globals.ads.isTesting, // receiving test to
            Autoshow: true // auto show interstitial When loaded to
        }

        var initDone = false;

        this.showBanner = showBanner;


        ////////////////

        function init() {
            if (initDone) return;
            $cordovaAdMob.createBannerView(options,
                function() {
                    console.log('success');
                },
                function() {
                    console.log('error');
                }
            );
            initDone = true;
        }

        function showBanner() {
            init();
            $cordovaAdMob.showAd(true,
                function() {
                    console.log('success');
                },
                function() {
                    console.log('error');
                }
            );
        }
    }
})();
