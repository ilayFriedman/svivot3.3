angular.module("myApp")
    .controller("LoginController", function ($scope) {
        $scope.submit = function(){X
            $scope.answer = "Submitted! you entered: " + $scope.uname
        };
    });