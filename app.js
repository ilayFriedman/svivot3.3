let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
    // homepage
        .when('/', {
            // this is a template
            template: '<h1>This is the default route</h1>'
        })
        // about
        .when('/LogIn', {
            // this is a template url
            templateUrl: 'logIn.html',
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