'use strict';
angular.module('main', [
    'ionic',
    'ngCordova',
    'ui.router',
    'ngTwitter',
    // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/main');

    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
        url: '/main',
        //template: '<ion-view view-title="Hashtags"></ion-view>',
        templateUrl: 'main/templates/list-hashtags.html',
        controller: 'ListHashtagsCtrl'
    })
    .state('hashtag', {
        url: '/hashtag/:hashtag',
        templateUrl: 'main/templates/chat.html',
        controller: 'ChatCtrl',
        resolve: {
            hashtag: function ($stateParams, MyHashtags) {
                return MyHashtags.getHashtag($stateParams.hashtag);
            },
            listid: function () {
                return null;
            }
        }
    })
    .state('list', {
        url: '/list/:listid',
        templateUrl: 'main/templates/chat.html',
        controller: 'ChatCtrl',
        resolve: {
            hashtag: function () {
                return null;
            },
            listid: function ($stateParams, $q) {
                var deferred = $q.defer();
                deferred.resolve($stateParams.listid);
                return deferred.promise;
            }
        }
    })
    .state('login', {
        url: '/login',
        templateUrl: 'main/templates/login.html',
        controller: 'LoginCtrl'
    });
});
