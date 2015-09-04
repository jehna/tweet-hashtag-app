'use strict';
angular.module('main')
.controller('ChatCtrl', function (hashtag, listid, $scope, MyHashtags, Session, $timeout, $window) {
    if (hashtag) {
        $scope.hashtag = hashtag;
    } else if (listid) {
        $scope.list = MyHashtags.getList(listid);
    }

    $scope.userID = Session.getUserID();

    /*MyHashtags.refresh(hashtag.name)
    .then(function (tweets) {
        $scope.tweets = tweets;
    });*/

    $scope.openUser = function (screenName) {
        if ($window.ionic.Platform.isAndroid()) {
            $window.open('twitter://user?screen_name=' + screenName, '_system', 'location=no');
        } else {
            $window.open('https://twitter.com/' + screenName, '_blank', 'location=yes');
        }
    };

    $scope.openTweet = function (tweetID, screenName) {
        if ($window.ionic.Platform.isAndroid()) {
            $window.open('twitter://status?status_id=' + tweetID, '_system', 'location=no');
        } else {
            $window.open('https://twitter.com/' + screenName + '/status/' + tweetID, '_blank', 'location=yes');
        }
    };

    $scope.loadMore = function () {
        var loader;
        if (hashtag) {
            loader = MyHashtags.loadMoreHashtag(hashtag.name);
        } else {
            loader = MyHashtags.loadMoreList(listid);
        }
        loader.then(function (tweets) {
            $scope.tweets = tweets;
        })
        .finally(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.newTweet = function (hashtag) {
        if ($window.ionic.Platform.isAndroid()) {
            if (hashtag) {
                hashtag = '%23' + hashtag;
            }
            $window.open('twitter://post?message=' + hashtag, '_system', 'location=no');
        } else {
            $window.open('https://twitter.com/intent/tweet?hashtags=' + hashtag, '_blank', 'location=yes');
        }
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
    
    $scope.getTitle = function () {
        if (hashtag) {
            return '#' + hashtag.name;
        } else {
            return $scope.list.name;
        }
    };
});
