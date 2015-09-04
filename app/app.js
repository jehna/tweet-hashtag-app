'use strict';
angular.module('Hashtags', [
    // load your modules here
    'main', // starting with the main module
])
.run(function ($window, $ionicPlatform) {
    $ionicPlatform.ready(function () {
        $window.analytics.startTrackerWithId('UA-67235800-1');
    });
});
