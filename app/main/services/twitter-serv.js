'use strict';
angular.module('main')
.service('Twitter', function (Session, $twitterApi, Secrets, $q) {
    var tempStorage = {};

    function Twitter() {
        this.loggedin = false;
    }
    
    Twitter.prototype.login = function () {
        var token = Session.getToken();
        var secret = Session.getSecret();
        if (token) {
            $twitterApi.configure(Secrets.TWITTER_API_KEY, Secrets.TWITTER_API_SECRET, { 'oauth_token': token, 'oauth_token_secret': secret });
            this.loggedin = true;
        }
    };

    Twitter.prototype.getHashtag = function (hashtag) {
        var options = {
            'result_type': 'recent',
            'count': 5
        };
        var deferred = $q.defer();
        $twitterApi.searchTweets('#' + hashtag, options)
        .then(function (data) {
            tempStorage[hashtag] = data.statuses;
            deferred.resolve(tempStorage[hashtag]);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    Twitter.prototype.loadMoreHashtag = function (hashtag) {
        var tweets = tempStorage[hashtag];
        var deferred = $q.defer();

        var options = {
            'result_type': 'recent',
            'count': 10
        };
        if (tweets) {
            var maxId = 'max_id';
            options[maxId] = tweets[tweets.length - 1].id;
        }
        $twitterApi.searchTweets('#' + hashtag, options)
        .then(function (data) {
            tempStorage[hashtag] = tempStorage[hashtag] || [];
            if (tempStorage[listID].length > 0) {
                var last = tempStorage[listID][tempStorage[listID].length - 1];
                var first = data.statuses[0];
                if (last.id === first.id) {
                    // This happens only sometimes
                    data.statuses.shift();
                }
            }
            tempStorage[hashtag] = tempStorage[hashtag].concat(data.statuses);
            deferred.resolve(tempStorage[hashtag]);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    Twitter.prototype.loadMoreList = function (listID) {
        listID = listID.toString();
        var tweets = tempStorage[listID];
        var deferred = $q.defer();

        var options = {
            'list_id': listID,
            'count': 10
        };
        if (tweets) {
            var maxId = 'max_id';
            options[maxId] = tweets[tweets.length - 1].id;
        }
        $twitterApi.getRequest('https://api.twitter.com/1.1/lists/statuses.json', options)
        .then(function (data) {
            tempStorage[listID] = tempStorage[listID] || [];
            if (tempStorage[listID].length > 0) {
                var last = tempStorage[listID][tempStorage[listID].length - 1];
                var first = data[0];
                if (last.id === first.id) {
                    // This happens only sometimes
                    data.shift();
                }
            }
            tempStorage[listID] = tempStorage[listID].concat(data);
            deferred.resolve(tempStorage[listID]);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    Twitter.prototype.loadMostRecentHashtag = function (hashtag) {
        var tweets = tempStorage[hashtag];
        var deferred = $q.defer();

        if (tweets) {
            var options = {
                'result_type': 'recent',
                'count': 10
            };
            var sinceId = 'since_id';
            options[sinceId] = tweets[0].id;

            $twitterApi.searchTweets('#' + hashtag, options)
            .then(function (data) {
                data.statuses.pop();
                tempStorage[hashtag] = tempStorage[hashtag] || [];
                tempStorage[hashtag] = data.statuses.concat(tempStorage[hashtag]);
                deferred.resolve(tempStorage[hashtag]);
            }, function (error) {
                deferred.reject(error);
            });
        } else {
            deferred.reject('No tweets yet');
        }

        return deferred.promise;
    };

    Twitter.prototype.loadMostRecentList = function (listID) {
        listID = listID.toString();
        var tweets = tempStorage[listID];
        var deferred = $q.defer();
        
        if (tweets) {
            var options = {
                'list_id': listID,
                'count': 10
            };
            var sinceId = 'since_id';
            options[sinceId] = tweets[0].id;

            $twitterApi.getRequest('https://api.twitter.com/1.1/lists/statuses.json', options)
            .then(function (data) {
                data.pop();
                tempStorage[listID] = tempStorage[listID] || [];
                tempStorage[listID] = data.concat(tempStorage[listID]);
                deferred.resolve(tempStorage[listID]);
            }, function (error) {
                deferred.reject(error);
            });
        } else {
            deferred.reject('No tweets yet');
        }

        return deferred.promise;
    };

    Twitter.prototype.loadLists = function () {
        var deferred = $q.defer();

        var options = {};

        $twitterApi.getRequest('https://api.twitter.com/1.1/lists/list.json', options)
        .then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    };

    return new Twitter();
});
