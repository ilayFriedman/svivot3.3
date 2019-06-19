
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
        // .when('/', {
        //     // this is a template
        //     templateUrl: 'LoginHome.html',
        //     controller : 'indexController as indexCtrl'
        // })

        // logIn
        .when('/LogIn', {
            // this is a template url
            templateUrl: 'logIn.html',
            controller : 'LoginController as loginCtrl'
        })
        .when('/LogInHome', {
        // this is a template url
        templateUrl: 'loginHome.html',
        controller : 'LoginHomeController as loginHomeCtrl'
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

app.filter('searchPOI', function() {

    // All filters must return a function. The first parameter
    // is the data that is to be filtered, and the second is an
    // argument that may be passed with a colon (searchFor:searchString)

    return function (arr, searchName) {

        if (!searchName) {
            return arr;
        }
        var result = [];
        searchName = searchName.toLowerCase();
        // Using the forEach helper method to loop through the array
        angular.forEach(arr, function (item) {

            if (item.NamePOI.toLowerCase().indexOf(searchName) !== -1) {
                result.push(item);
            }

        });

        return result;
    };
});