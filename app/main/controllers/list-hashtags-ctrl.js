'use strict';
angular.module('main')
.controller('ListHashtagsCtrl', function (Session, $window, MyHashtags, $scope, Dialogs, Twitter, $location) {
    
    $scope.$on('$ionicView.enter', function () {
        $window.analytics.trackView('Hashtags');
        
        if (!Session.isLoggedIn()) {
            $location.path('/login');
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
                
                $window.analytics.trackEvent('Hashtags', 'Added new hashtag', result);
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
        
        $window.analytics.trackEvent('Hashtags', 'Removed hashtag', hashtag);
    };
});
