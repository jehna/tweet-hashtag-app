'use strict';
angular.module('main')
.controller('ChatCtrl', function (hashtag, $scope, MyHashtags, Session) {
    $scope.hashtag = hashtag;

    $scope.userID = Session.getUserID();

    MyHashtags.refresh(hashtag.name)
    .then(function (tweets) {
        $scope.tweets = tweets;
    });
});
