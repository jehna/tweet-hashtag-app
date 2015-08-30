'use strict';
angular.module('main')
.service('MyHashtags', function ($window, Twitter, $q) {
    function MyHashtags() {
        this.hashtags = $window.JSON.parse($window.localStorage.myHashtags || '""');
        this.lists = $window.JSON.parse($window.localStorage.myLists || '""');
        if (!Array.isArray(this.hashtags)) {
            this.hashtags = [];
        }
        if (!Array.isArray(this.lists)) {
            this.lists = [];
        }
        this.save();
    }

    MyHashtags.prototype.save = function () {
        $window.localStorage.myHashtags = $window.JSON.stringify(angular.copy(this.hashtags));
        $window.localStorage.myLists = $window.JSON.stringify(angular.copy(this.lists));
    };

    MyHashtags.prototype.listHashtags = function () {
        return this.hashtags;
    };
    
    MyHashtags.prototype.listLists = function () {
        return this.lists;
    };

    MyHashtags.prototype.add = function (hashtag) {
        hashtag = /\w+/.exec(hashtag)[0];

        var alreadyExists = false;
        for (var i = 0; i < this.hashtags.length; i++) {
            if (this.hashtags[i].name === hashtag) {
                alreadyExists = true;
                break;
            }
        }

        if (!alreadyExists) {
            this.hashtags.push({
                'name': hashtag
            });
            this.save();
        }
    };

    MyHashtags.prototype.remove = function (hashtag) {
        for (var i = 0; i < this.hashtags.length; i++) {
            if (this.hashtags[i].name === hashtag) {
                this.hashtags.splice(i, 1);
                break;
            }
        }
        this.save();
    };

    MyHashtags.prototype.getHashtag = function (hashtag) {
        for (var i = 0; i < this.hashtags.length; i++) {
            if (this.hashtags[i].name === hashtag) {
                return this.hashtags[i];
            }
        }
        return null;
    };

    MyHashtags.prototype.refresh = function (hashtag) {
        return Twitter.getHashtag(hashtag);
    };

    MyHashtags.prototype.loadMoreHashtag = function (hashtag) {
        return Twitter.loadMoreHashtag(hashtag);
    };

    MyHashtags.prototype.loadMoreList = function (listID) {
        return Twitter.loadMoreList(listID);
    };

    MyHashtags.prototype.loadMostRecent = function (hashtag) {
        return Twitter.loadMostRecent(hashtag);
    };

    MyHashtags.prototype.refreshLists = function () {
        var deferred = $q.defer();
        var self = this;
        Twitter.loadLists()
        .then(function (data) {
            self.lists = data;
            self.save();
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    
    MyHashtags.prototype.getList = function (listID) {
        var idStr = 'id_str';
        for (var i = 0; i < this.lists.length; i++) {
            if (this.lists[i][idStr] === listID.toString()) {
                return this.lists[i];
            }
        }
    };

    return new MyHashtags();
});
