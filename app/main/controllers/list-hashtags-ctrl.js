'use strict';
angular.module('main')
.controller('ListHashtagsCtrl', function (Session, $window, MyHashtags, $scope, Dialogs) {
    if (!Session.isLoggedIn()) {
        $window.location.hash = '#/login';
    }

    $scope.hashtags = MyHashtags.getList();
    $scope.addNewHashtag = function () {
        Dialogs.prompt(
            'Enter a new hashtag to add',
            function (result) {
                result = /\w+/.exec(result)[0];
                MyHashtags.add(result);
            },
            function () {},
            'Add new Hashtag',
            'Add',
            '#hashtag'
        );
    };
});
