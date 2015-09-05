'use strict';
angular.module('main')
.controller('ChatCtrl', function (hashtag, listid, $scope, MyHashtags, Session, $timeout, $window) {
    
    $scope.$on('$ionicView.enter', function () {
        $window.analytics.trackView('List');
    });
    
    var twitterScheme = 'twitter://';
    if ($window.ionic.Platform.isAndroid()) {
        twitterScheme = 'com.twitter.android';
    }
    
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
        $window.analytics.trackEvent('Chat', 'Open User', screenName);
        
        $window.appAvailability.check(twitterScheme,
            function () {
                $window.open('twitter://user?screen_name=' + screenName, '_system', 'location=no');
            },
            function () {
                $window.open('https://twitter.com/' + screenName, '_blank', 'location=yes');
            }
        );
    };

    $scope.openTweet = function (tweetID, screenName) {
        $window.analytics.trackEvent('Chat', 'Open Tweet', tweetID);
        
        $window.appAvailability.check(twitterScheme,
            function () {
                $window.open('twitter://status?status_id=' + tweetID, '_system', 'location=no');
            },
            function () {
                $window.open('https://twitter.com/' + screenName + '/status/' + tweetID, '_blank', 'location=yes');
            }
        );
    };

    $scope.loadMore = function () {
        var loader;
        if (hashtag) {
            loader = MyHashtags.loadMoreHashtag(hashtag.name);
        } else {
            loader = MyHashtags.loadMoreList(listid);
        }
        loader.then(function (tweets) {
            $window.analytics.trackEvent('Chat', 'Loaded (more) tweets');
            
            $scope.tweets = tweets;
        })
        .finally(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.newTweet = function (hashtag) {
        $window.analytics.trackEvent('Chat', 'Posted new Tweet');
        
        $window.appAvailability.check(twitterScheme,
            function () {
                if (hashtag) {
                    hashtag = '%23' + hashtag;
                }
                $window.open('twitter://post?message=' + hashtag, '_system', 'location=no');
            },
            function () {
                $window.open('https://twitter.com/intent/tweet?hashtags=' + hashtag, '_blank', 'location=yes');
            }
        );
    };

    var to;
    var shutdown;
    function loadMostRecent() {
        to = $timeout(function () {
            var loader;
            if (hashtag) {
                loader = MyHashtags.loadMostRecentHashtag(hashtag.name);
            } else {
                loader = MyHashtags.loadMostRecentList(listid);
            }
            
            loader.then(function (tweets) {
                $scope.tweets = tweets;
            })
            .finally(function () {
                if (!shutdown) {
                    loadMostRecent();
                }
            });
        }, 1000 * 10);
    }
    function resumeRefreshing() {
        shutdown = false;
        loadMostRecent();
    }
    function stopRefreshing() {
        if (to) {
            shutdown = true;
            $timeout.cancel(to);
        }
    }
    resumeRefreshing();
    
    $window.document.addEventListener('resume', resumeRefreshing);
    $window.document.addEventListener('pause', stopRefreshing);
    $scope.$on('$destroy', function () {
        stopRefreshing();
        $window.document.removeEventListener('resume', resumeRefreshing);
        $window.document.removeEventListener('pause', stopRefreshing);
    });
    
    $scope.getTitle = function () {
        if (hashtag) {
            return '#' + hashtag.name;
        } else {
            return $scope.list.name;
        }
    };
    
    $scope.getMediaSize = function (media) {
        var bestMedia = '';
        var targetSize = 400;
        var closest = Infinity;
        for (var m in media.sizes) {
            var size = media.sizes[m];
            var diff = Math.abs(size.w - targetSize);
            if (diff < closest) {
                bestMedia = ':' + m;
                closest = diff;
            }
        }
        return bestMedia;
    };
    
    $scope.getBiggerProfileImage = function (url) {
        return url.replace('normal', 'bigger');
    };
});
