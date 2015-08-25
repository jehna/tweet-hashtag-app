'use strict';
angular.module('main')
.service('Session', function ($window) {

    function Session() {
    }

    Session.prototype.isLoggedIn = function () {
        return !!$window.localStorage.userName;
    };

    Session.prototype.login = function (success, fail) {
        $window.TwitterConnect.login(
            function (result) {
                $window.localStorage.userName = result.userName;
                $window.localStorage.userId = result.userId;
                $window.localStorage.secret = result.secret;
                $window.localStorage.token = result.token;
                success();
            },
            function (error) {
                console.log(error);
                fail();
            }
        );
    };

    Session.prototype.logout = function () {
        TwitterConnect.logout();
        $window.localStorage.userName = null;
        $window.localStorage.userId = null;
        $window.localStorage.secret = null;
        $window.localStorage.token = null;
    };

    Session.prototype.getToken = function () {
        return $window.localStorage.token;
    };

    Session.prototype.getSecret = function () {
        return $window.localStorage.secret;
    };

    Session.prototype.getUserID = function () {
        return $window.localStorage.userId;
    };

    Session.prototype.getRawToken = function () {
        return {
            'userName': $window.localStorage.userName,
            'userId': $window.localStorage.userId,
            'secret': $window.localStorage.secret,
            'token': $window.localStorage.token
        };
    };

    return new Session();
});
