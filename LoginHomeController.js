angular.module("myApp").controller("LoginHomeController", ['$scope', '$http', '$window', '$sce', function ($scope, $http, $window, $sce) {

    if($window.loged){
        const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
        $http.post(`${localUrl}/private/mostUpdatedPois`, null, headers).then(successMost, errorMost);
        $http.post(`${localUrl}/private/lastSavedPois`, null, headers).then(successLast, errorLast);
    }



    function successMost (response) {
        if (response && response.data) {
            console.log(response.data)
            $scope.mostPOIs = response.data;

        } else {
            errorMost("");
        }
    }
    function errorMost (errorResponse) {
        if (errorResponse && (errorResponse.status == 401)) {
            $scope.errors = [{key: 'errorInMost', value: errorResponse.data}];
        } else
            $scope.errors = [{key: 'errorInMost', value: 'Oops we have a problem. Please try again later.'}];
    }

    function successLast (response) {
        if (response && response.data) {
            console.log(response.data)
            $scope.LastPOIs = response.data;
        } else {
            errorMost("");
        }
    }
    function errorLast(errorResponse) {
        if (errorResponse && (errorResponse.status == 401)) {
            $scope.errors = [{key: 'errorInLast', value: errorResponse.data}];
        } else
            $scope.errors = [{key: 'errorInLast', value: 'Oops we have a problem. Please try again later.'}];
    }


}]); // controller end