let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
    // homepage
        .when('/', {
            // this is a template
            templateUrl: 'openPage.html',
            controller : 'indexController as indexCtrl'
        })

        // logIn
        .when('/LogIn', {
            // this is a template url
            templateUrl: 'logIn.html',
            controller : 'LoginController as loginCtrl'
        })

        // Register
        .when('/Register', {
            // this is a template url
            templateUrl: 'register.html',
            controller : 'registerController as regCtrl'
        })

        // poi
        .when('/POIS', {
            templateUrl: 'POIS.html',
            controller : 'POISController as POISCtrl'
        })
        .when('/Favorites', {
            templateUrl: 'Favorites.html',
            controller : 'FavoritesController as FavoritesCtrl'
        })


        // other
        .otherwise({ redirectTo: '/' });
});