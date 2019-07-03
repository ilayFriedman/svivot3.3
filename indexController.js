angular.module("myApp").controller("indexController", ['$scope', '$http', '$window', '$sce', '$rootScope', function ($scope, $http, $window, $sce, $rootScope) {
    const localUrl = 'http://localhost:3000';
    // Login checker
    $scope.connectionStatus = function () {
        if ($rootScope.loged) {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.logOut = function () {
        $rootScope.loged =  false;
        $rootScope.welcomePath = '#!'
    }

    $scope.helloName = function () {
        if ($scope.connectionStatus()) {   // connected!!

            return $window.sessionStorage.full_name;
        } else {
            return "Guest";     // not connected!
        }
        ;
    };
    $scope.donePost = false;
    // random POI:
    $scope.clicked1 = false;
    $scope.clicked2 = false;
    $scope.clicked3 = false;
    $rootScope.categoryJSON = {
        1: "Architecture",
        2: "Museums",
        3: "Shopping",
        4: "Restaurants"
    }
    $scope.POIs;
    const url = `${localUrl}/getRandomPOI`;
    $http.get(url).then(successRandom, errorRandom);

    function successRandom(response) {
        $scope.POIs = response.data;
    }

    function errorRandom(response) {
        alert(response.data)
    }



    $rootScope.successReviews = function (response) {
        $rootScope.currReviews = response.data;
        var stringReviews = "";
        for(var i = 0 ; i <  $rootScope.currReviews .length; i++) {
            stringReviews +=  i+1 +': </br>&nbsp&nbsp Date: '
                + new Date($rootScope.currReviews[i].publishDate).toLocaleDateString()
                + "</br>&nbsp&nbsp By: " + $rootScope.currReviews[i].username
                + "</br>&nbsp&nbsp Details: " + $rootScope.currReviews[i].Details + '</br>&nbsp';
        }
        $rootScope.reviews = $sce.trustAsHtml(stringReviews);
        console.log($sce.reviews)
    }
    $rootScope.errorReviews = function (response) {
        alert("shit")
    }

    $scope.onclick = function (index) {
        var namePoi = {namePoi: $scope.POIs[index].NamePOI};
        $http.put(`${localUrl}/addOneView`,namePoi).then($scope.successAddView, $scope.errorSAddView);
        var data2 = {NamePOI: $scope.POIs[index].NamePOI};
        $http.post(`${localUrl}/getLastReviews`,data2).then($scope.successReviews, $scope.errorReviews);
        var modal = document.getElementById("myModal" + index);
        modal.style.display = "block";
    }

    $scope.successAddView = function (response) {

    }
    $scope.errorSAddView = function (response) {
        alert(response.data)
    }

    $scope.onXClick = function (index) {
        var modal = document.getElementById("myModal" + index);
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        for (var i = 0; i < $scope.POIs.length; i++) {
            var modal = document.getElementById("myModal" + i);
            if (event.target === modal) {
                try {
                    modal.style.display = "none";
                } catch (e) {

                }
            }
        }

    }
    window.addEventListener("keydown", function (event) {
        //if ($scope.POIs) {
        for (var i = 0; i < $scope.POIs.length; i++) {
            var modal = document.getElementById("myModal" + i);
            if (event.code == "Escape") {
                try {
                    modal.style.display = "none";
                } catch (e) {

                }

            }
        }
        // }
    });

    // window.onclick = function (event) {
    //             if (event.target == det) {
    //                 det.style.display = "none";
    //             }
    //         }
    //         window.addEventListener("keydown", function (event) {
    //             if (event.code == "Escape") {
    //                 det.style.display = "none";
    //             }
    //         });

}]); // controller end



