'use strict';
angular.module('main')
.service('Dialogs', function ($window) {
    function Dialogs() {
    }

    Dialogs.prototype.prompt = function (message, success, fail, title, successButtonTitle, defaultText) {
        if (navigator && navigator.notification) {
            navigator.notification.prompt(
                message,
                function (results) {
                    if (results.buttonIndex === 0 || results.buttonIndex === 1) {
                        fail();
                    } else {
                        success(results.input1);
                    }
                },
                title || undefined,
                ['Cancel', successButtonTitle || 'OK'],
                defaultText || undefined);
        } else {
            var result = $window.prompt(message, defaultText);
            if (!result) {
                fail();
            } else {
                success(result);
            }
        }
    };

    return new Dialogs();
});
