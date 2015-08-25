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

    return new Twitter();
});
