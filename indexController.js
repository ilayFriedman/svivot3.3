
angular.module("myApp").controller("indexController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.connectionStatus = function() {
        if($window.loged){
            return true;
        }
        else{ return false;}
    };

    $scope.helloName = function() {
        if($scope.connectionStatus()){   // connected!!
            return $window.sessionStorage.full_name;
        }else{
            return "Guest";     // not connected!
        };
    };




}]);

