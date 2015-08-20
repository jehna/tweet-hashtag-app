'use strict';
angular.module('main')
.service('Session', function ($window) {
    $window.TwitterConnect = $window.TwitterConnect || {
        'login': function (success) {
            success({
                userName: 'luotojesse',
                userId: 237606499,
                secret: 'tHXYi75v90WVfyUKij1JLpgsaUfHYFnSc4BNLyId12iXf',
                token: '237606499-QqYXaj7FBxzBzUVlhOV0AgSfsRtWdBwt4FQzvCC2'
            });
        },
        'logout': function (success) {
            success();
        }
    };

    function Session() {
    }

    Session.prototype.isLoggedIn = function () {
        return !!$window.localStorage.userName;
    };

    Session.prototype.login = function (success, fail) {
        TwitterConnect.login(
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

    return new Session();
});
