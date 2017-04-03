/**
 * Created by Vivek Kumar on 11/11/15.
 */

var dependencies = ['ui.router','naif.base64','base64', 'ngImageCompress'];

var NEC = angular.module("NEC", dependencies);

NEC.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('admin', {
        url: "/admin",
        templateUrl: 'templates/credentials/admin.html',
        controller: 'loginCtrl'
    })
        .state('admin.signIn', {
            url: "/signIn",
            templateUrl: 'templates/credentials/signIn.html'
        })
        .state('admin.signUp', {
            url: "/signUp",
            templateUrl: 'templates/credentials/signUp.html'
        })
        .state('app', {
            url: "/app",
            templateUrl: 'templates/app.html',
            controller: 'appCtrl'
        })
        .state('app.gallery', {
            url: "/gallery",
            templateUrl: 'templates/workspace/gallery.html',
            controller: 'galleryCtrl'
        })
        .state('app.projects', {
            url: "/projects",
            templateUrl: 'templates/workspace/projects.html',
            controller: 'projectsCtrl'
        })
        .state('app.workspace', {
            url: "/workspace",
            templateUrl: 'templates/workspace.html'
        })
        .state('app.dashboard', {
            url: "/dashboard",
            templateUrl: 'templates/workspace/dashboard.html',
            controller: 'dashboardCtrl'
        })
        .state('app.user', {
            url: "/user",
            templateUrl: 'templates/workspace/users.html',
            controller: 'userCtrl'
        })
        .state('app.transaction', {
            url: "/transaction",
            templateUrl: 'templates/workspace/transactions.html',
            controller: 'transactionsCtrl'
        })
        .state('app.newTransaction', {
            url: "/transaction/newTransaction",
            templateUrl: 'templates/workspace/newTransaction.html',
            controller: 'newTransactionCtrl'
        })
        .state('app.settings', {
            url: "/settings",
            templateUrl: 'templates/workspace/settings.html',
            controller: 'settingsCtrl'
        })

        .state('app.setting', {
            url: "/setting",
            templateUrl: 'templates/setting.html'
        })
        .state('app.setting.userType', {
            url: "/setting/userType",
            templateUrl: 'templates/settings/userType.html'
        });

    $urlRouterProvider.otherwise("/admin/signIn");
});


NEC.directive('repeatDone', function () {
    return function (scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
})


.directive('bDatepicker', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attr) {
            el.datepicker({dateFormat: 'yy-mm-dd'});
            var component = el.siblings('[data-toggle="datepicker"]');
            if (component.length) {
                component.on('click', function () {
                    el.trigger('focus');
                });
            }
        }
    };
});