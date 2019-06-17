angular.module("myApp")
    .controller("MainController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
        $window.categoryJSON = {
            1: "Architecture",
            2: "Museums",
            3: "Shopping",
            4: "Restaurants"
        }


    }]);