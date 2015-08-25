'use strict';
angular.module('main')
.service('Twitter', function (Session, $twitterApi, Secrets, $q) {
    var tempStorage = {};

    function Twitter() {
        var token = Session.getToken();
        var secret = Session.getSecret();
        if (token) {
            $twitterApi.configure(Secrets.TWITTER_API_KEY, Secrets.TWITTER_API_SECRET, { 'oauth_token': token, 'oauth_token_secret': secret });
        }
    }

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

    Twitter.prototype.loadMore = function (hashtag) {
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
            tempStorage[hashtag] = tempStorage[hashtag].concat(data.statuses);
            deferred.resolve(tempStorage[hashtag]);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    Twitter.prototype.loadMostRecent = function (hashtag) {
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

    return new Twitter();
});
