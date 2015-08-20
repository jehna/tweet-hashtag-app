'use strict';
angular.module('main')
.controller('LoginCtrl', function (Session, $scope, $window) {
    $scope.login = function () {
        Session.login(function () {
            $window.location.hash = '/';
        });
    };
});
