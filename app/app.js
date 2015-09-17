'use strict';
angular.module('Hashtags', [
    // load your modules here
    'main', // starting with the main module
])
.run(function ($window, $ionicPlatform, $location, Session, $timeout, $cordovaSplashscreen) {
    $ionicPlatform.ready(function () {
        $window.analytics.startTrackerWithId('UA-67235800-1');
        $cordovaSplashscreen.hide();
    });
    
    if (!Session.isLoggedIn()) {
        $location.path('/login');
    }
    
    $timeout(function () {
        $cordovaSplashscreen.hide();
    }, 1000);
});
