'use strict';
angular.module('main')
.controller('ListHashtagsCtrl', function (Session, $window, MyHashtags, $scope, Dialogs, Twitter) {
    $scope.$on('$ionicView.enter', function () {
        
        if (!Session.isLoggedIn()) {
            $window.location.hash = '#/login';
            return;
        }
        
        Twitter.login();
        
        MyHashtags.refreshLists()
        .then(function (lists) {
            $scope.lists = lists;
        });
    });

    $scope.hashtags = MyHashtags.listHashtags();
    $scope.lists = MyHashtags.listLists();
    $scope.addNewHashtag = function () {
        Dialogs.prompt(
            'Enter a new hashtag to add',
            function (result) {
                result = /\w+/.exec(result)[0];
                MyHashtags.add(result);
                $scope.$apply();
            },
            function () {},
            'Add new Hashtag',
            'Add',
            '#hashtag'
        );
    };

    $scope.removeHashtag = function (hashtag) {
        MyHashtags.remove(hashtag);
        $scope.$apply();
    };
});
