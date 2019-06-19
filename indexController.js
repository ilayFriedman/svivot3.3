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



    $scope.successReviews = function (response) {
        $scope.currReviews = response.data;
        $scope.reviews = $sce.trustAsHtml('Reviews: </br>' +
            '1: ' + $scope.currReviews[0].Details +
            '</br>' +
            '2:' + $scope.currReviews[1].Details + '</br>')
        console.log($sce.reviews)
    }
    $scope.errorReviews = function (response) {
        alert("shit")
    }

    $scope.onclick = function (index) {
        var data2 = {NamePOI: $scope.POIs[index].NamePOI};
        $http.post(`${localUrl}/getLastReviews`,data2).then($scope.successReviews, $scope.errorReviews);
        var modal = document.getElementById("myModal" + index);
        modal.style.display = "block";
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



