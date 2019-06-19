angular.module("myApp")
    .controller("POISController",
        ['$scope', '$http', '$window', '$rootScope', '$location',
            function ($scope, $http, $window, $rootScope, $location) {
                $scope.searchName;
                $http.get(`${localUrl}/orderByRank`).then(successAllPOI, errorAllPOI);

                function successAllPOI(response) {
                    $scope.allPOIs = response.data;
                }

                function errorAllPOI(response) {
                    alert(response.data)
                }

                $scope.onclick = function (poi) {
                    var data2 = {NamePOI: poi.NamePOI};
                    $http.post(`${localUrl}/getLastReviews`,data2).then($scope.successReviews, $scope.errorReviews);
                    var modal = document.getElementById("myModalSearch" + poi.NamePOI);
                    modal.style.display = "block";
                }

                $scope.onXClick = function (poi) {
                    var modal = document.getElementById("myModalSearch" + poi.NamePOI);
                    modal.style.display = "none";
                }

                window.onclick = function (event) {
                    for (var i = 0; i < $scope.allPOIs.length; i++) {
                        var modal = document.getElementById("myModalSearch" + $scope.allPOIs[i].NamePOI);
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
                    for (var i = 0; i < $scope.allPOIs.length; i++) {
                        var modal = document.getElementById("myModalSearch" + $scope.allPOIs[i].NamePOI);
                        if (event.code == "Escape") {
                            try {
                                modal.style.display = "none";
                            } catch (e) {

                            }

                        }
                    }
                    // }
                });

            }]);
