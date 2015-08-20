'use strict';
angular.module('main')
.controller('ChatCtrl', function (hashtag, $scope) {
    $scope.hashtag = hashtag;
});
