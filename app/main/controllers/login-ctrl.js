'use strict';
angular.module('main')
.controller('LoginCtrl', function (Session, $scope, $window) {
    
    $scope.$on('$ionicView.enter', function () {
        $window.analytics.trackView('Login');
    });
    
    $scope.login = function () {
        Session.login(function () {
            $window.analytics.trackEvent('Login', 'Logged in');
            $window.location.hash = '#/';
        });
    };
});
