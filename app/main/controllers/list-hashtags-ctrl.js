'use strict';
angular.module('main')
.controller('ListHashtagsCtrl', function (Session, $window) {
    if (!Session.isLoggedIn()) {
        $window.location.hash = '#/login';
    }
});
