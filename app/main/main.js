'use strict';
angular.module('main', [
    'ionic',
    'ngCordova',
    'ui.router',
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
    .state('chat', {
        url: '/chat/:hashtag',
        templateUrl: 'main/templates/chat.html',
        controller: 'ChatCtrl',
        resolve: {
            hashtag: function ($stateParams, MyHashtags) {
                return MyHashtags.getHashtag($stateParams.hashtag);
            }
        }
    })
    .state('login', {
        url: '/login',
        templateUrl: 'main/templates/login.html',
        controller: 'LoginCtrl'
    });
});
