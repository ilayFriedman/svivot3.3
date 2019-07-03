angular.module("myApp").controller("LoginHomeController", ['$scope', '$http', '$window', '$sce', '$rootScope', function ($scope, $http, $window, $sce, $rootScope) {

    if ($rootScope.loged) {
        const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
        $http.post(`${localUrl}/private/mostUpdatedPois`, null, headers).then(successMost, errorMost);
        $http.post(`${localUrl}/private/lastSavedPois`, null, headers).then(successLast, errorLast);
        $http.post(`${localUrl}/private/getAllFavorites`, null, headers).then(successFavorites, errorFavorites);

    }

    function successFavorites(response) {
        $rootScope.favorites = response.data;
        $rootScope.userFavorites = [];
        for (var i = 0; i < $rootScope.favorites.length; i++) {
            $rootScope.userFavorites.push({
                NamePOI: $rootScope.favorites[i].NamePOI,
                modDate: $rootScope.favorites[i].indexForUser
            })
        }
        $window.numOfFavorites = response.data.length;
    }



    $window.getNum = function (isUp) {
        if (isUP === 1) {
            $window.numOfFavorites++;
        } else if (isUp === 2) {
            $window.numOfFavorites--;
        }
        return $window.numOfFavorites;
    }

    function errorFavorites(response) {
        errorMost("");
    }

    function successMost(response) {
        if (response && response.data) {
            console.log(response.data)
            $scope.mostPOIs = response.data;

        } else {
            errorMost("");
        }
    }

    function errorMost(errorResponse) {
        if (errorResponse && (errorResponse.status == 401)) {
            $scope.errors = [{key: 'errorInMost', value: errorResponse.data}];
        } else
            $scope.errors = [{key: 'errorInMost', value: 'Oops we have a problem. Please try again later.'}];
    }

    function successLast(response) {
        if (response && response.data) {
            console.log(response.data)
            $scope.lastPOIs = response.data;
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

    //modal:
    $scope.onclickMost = function (index, poi) {
        var namePoi = {namePoi: poi.NamePOI};
        $http.put(`${localUrl}/addOneView`, namePoi).then($scope.successAddView, $scope.errorSAddView);
        var modal = document.getElementById("myModalM" + index);
        modal.style.display = "block";

    }

    $scope.successAddView = function (response) {
    }
    $scope.errorSAddView = function (response) {
        alert(response.data)
    }
    $scope.onclickLast = function (index, poi) {
        var namePoi = {namePoi: poi.NamePOI};
        $http.put(`${localUrl}/addOneView`, namePoi).then($scope.successAddView, $scope.errorSAddView);
        var modal = document.getElementById("myModalL" + index);
        modal.style.display = "block";

    }

    $scope.onXClickM = function (index) {
        var modal = document.getElementById("myModalM" + index);
        modal.style.display = "none";
    }
    $scope.onXClickL = function (index) {
        var modal = document.getElementById("myModalL" + index);
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if ($scope.mostPOIs && $scope.lastPOIs) {
            for (var i = 0; i < $scope.mostPOIs.length; i++) {
                var modal = document.getElementById("myModalM" + i);
                if (event.target === modal) {
                    try {
                        modal.style.display = "none";
                    } catch (e) {

                    }
                }
            }
            for (var i = 0; i < $scope.lastPOIs.length; i++) {
                var modal = document.getElementById("myModalL" + i);
                if (event.target === modal) {
                    try {
                        modal.style.display = "none";
                    } catch (e) {

                    }
                }
            }
        }
    }
    window.addEventListener("keydown", function (event) {
        if ($scope.mostPOIs && $scope.lastPOIs) {
            for (var i = 0; i < $scope.lastPOIs.length; i++) {
                var modal = document.getElementById("myModalL" + i);
                if (event.code == "Escape") {
                    try {
                        modal.style.display = "none";
                    } catch (e) {

                    }
                }
            }
            for (var i = 0; i < $scope.mostPOIs.length; i++) {
                var modal = document.getElementById("myModalM" + i);
                if (event.code == "Escape") {
                    try {
                        modal.style.display = "none";
                    } catch (e) {

                    }
                }
            }
        }
    });
}]); // controller end