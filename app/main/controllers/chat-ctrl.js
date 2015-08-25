'use strict';
angular.module('main')
.controller('ChatCtrl', function (hashtag, $scope, MyHashtags, Session) {
    $scope.hashtag = hashtag;

    $scope.userID = Session.getUserID();

    /*MyHashtags.refresh(hashtag.name)
    .then(function (tweets) {
        $scope.tweets = tweets;
    });*/

    $scope.loadMore = function () {
        MyHashtags.loadMore(hashtag.name)
        .then(function (tweets) {
            $scope.tweets = tweets;
        })
        .finally(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
});
