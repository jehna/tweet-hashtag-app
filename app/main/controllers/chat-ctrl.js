'use strict';
angular.module('main')
.controller('ChatCtrl', function (hashtag, $scope, MyHashtags, Session, $timeout, $window) {
    $scope.hashtag = hashtag;

    $scope.userID = Session.getUserID();

    /*MyHashtags.refresh(hashtag.name)
    .then(function (tweets) {
        $scope.tweets = tweets;
    });*/

    $scope.openUser = function (screenName) {
        console.log(screenName);
        $window.open('twitter://user?screen_name=' + screenName, '_system', 'location=no');
    };

    $scope.openTweet = function (tweetID) {
        console.log(tweetID);
        $window.open('twitter://status?status_id=' + tweetID, '_system', 'location=no');
    };

    $scope.loadMore = function () {
        MyHashtags.loadMore(hashtag.name)
        .then(function (tweets) {
            $scope.tweets = tweets;
        })
        .finally(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    var to;
    var shutdown = false;
    function loadMostRecent() {
        to = $timeout(function () {
            MyHashtags.loadMostRecent(hashtag.name)
            .then(function (tweets) {
                $scope.tweets = tweets;
            })
            .finally(function () {
                if (!shutdown) {
                    loadMostRecent();
                }
            });
        }, 1000 * 10);
    }
    loadMostRecent();
    $scope.$on('$destroy', function () {
        if (to) {
            shutdown = true;
            $timeout.cancel(to);
        }
    });
});
