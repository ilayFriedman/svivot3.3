
angular.module("myApp").controller("indexController", function ($scope) {
    $scope.connetionStatus = function() {
        return true;
    };


    $scope.helloName = function() {
        if($scope.connetionStatus()){   // connected!!
            return "DEAR OREN!";
        }else{
            return "Guest";     // not connected!
        };
    };




});

