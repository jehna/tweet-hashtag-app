'use strict';
angular.module('main')
.service('MyHashtags', function ($window, Twitter) {
    function MyHashtags() {
        this.list = $window.JSON.parse($window.localStorage.myHashtags || '""');
        if (!Array.isArray(this.list)) {
            this.list = [];
            this.save();
        }
    }

    MyHashtags.prototype.save = function () {
        $window.localStorage.myHashtags = $window.JSON.stringify(angular.copy(this.list));
    };

    MyHashtags.prototype.getList = function () {
        return this.list;
    };

    MyHashtags.prototype.add = function (hashtag) {
        hashtag = /\w+/.exec(hashtag)[0];

        var alreadyExists = false;
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].name === hashtag) {
                alreadyExists = true;
                break;
            }
        }

        if (!alreadyExists) {
            this.list.push({
                'name': hashtag
            });
            this.save();
        }
    };

    MyHashtags.prototype.getHashtag = function (hashtag) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].name === hashtag) {
                return this.list[i];
            }
        }
        return null;
    };

    MyHashtags.prototype.refresh = function (hashtag) {
        return Twitter.getHashtag(hashtag);
    };

    return new MyHashtags();
});
