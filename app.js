let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
    // homepage
        .when('/', {
            // this is a template
            template: '<h1>This is the home <page></page></h1>'
        })
        // logIn
        .when('/LogIn', {
            // this is a template url
            templateUrl: 'logIn.html'
            // controller : 'aboutController as abtCtrl'
        })

        // Register
        .when('/Register', {
            // this is a template url
            templateUrl: 'register.html',
            controller : 'registerController as regCtrl'
        })

        // POI
        .when('/randomPics', {
            // this is a template url
            templateUrl: 'randomPics.html',
            // controller : 'aboutController as abtCtrl'
        })
        // // poi
        // .when('/poi', {
        //     templateUrl: 'pages/poi/poi.html',
        //     controller : 'poiController as poiCtrl'
        // })
        // .when('/httpRequest', {
        //     templateUrl: 'pages/http/request.html',
        //     controller : 'httpController as httpCtrl'
        // })


        // other
        .otherwise({ redirectTo: '/' });
});